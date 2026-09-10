import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-e11bef9e/health", (c) => {
  return c.json({ status: "ok" });
});

// ── Stripe helper: Basic auth header from secret key ─────────────────────────

function stripeAuth(): string {
  const key = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
  return "Basic " + btoa(key + ":");
}


// ── Stripe webhook verification ───────────────────────────────────────────────

function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifyStripeSignature(rawBody: string, signatureHeader: string, secret: string): Promise<boolean> {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return signatures.some((signature) => safeEqualHex(expected, signature));
}

// ── Save registration record ─────────────────────────────────────────────────

app.post("/make-server-e11bef9e/register", async (c) => {
  try {
    const body = await c.req.json();

    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const registrationId = `NS-${datePart}-${randPart}`;

    const record = {
      registrationId,
      submittedAt: now.toISOString(),
      parentFirstName: body.parentFirstName,
      parentLastName: body.parentLastName,
      phone: body.phone,
      email: body.email,
      childFirstName: body.childFirstName,
      childLastName: body.childLastName,
      childAge: body.childAge,
      childGrade: body.childGrade,
      childGender: body.childGender,
      ec1Name: body.ec1Name,
      ec1Relation: body.ec1Relation,
      ec1Phone: body.ec1Phone,
      ec2Name: body.ec2Name,
      ec2Relation: body.ec2Relation,
      ec2Phone: body.ec2Phone,
      medicalNotes: body.medicalNotes ?? "",
      waiverSignature: body.waiverSignature,
      waiverSigned: body.waiverSigned,
      jerseySize: body.jerseySize ?? "",
      jerseyPrintName: body.jerseyPrintName ?? "",
      jerseyNumber1: body.jerseyNumber1 ?? "",
      jerseyNumber2: body.jerseyNumber2 ?? "",
      paymentStatus: "pending",
    };

    await kv.set(`registration:${registrationId}`, record);

    return c.json({ success: true, registrationId });
  } catch (err) {
    console.error("Registration error:", err);
    return c.json({ success: false, error: (err as Error).message }, 500);
  }
});


// ── Associate a saved registration with its PaymentIntent ────────────────────

app.post("/make-server-e11bef9e/associate-payment", async (c) => {
  try {
    const { registrationId, paymentIntentId } = await c.req.json();
    if (!registrationId || !paymentIntentId?.startsWith("pi_")) {
      return c.json({ success: false, error: "Invalid registration or PaymentIntent ID." }, 400);
    }

    const key = `registration:${registrationId}`;
    const record = await kv.get(key);
    if (!record) return c.json({ success: false, error: "Registration not found." }, 404);

    const piRes = await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
      method: "POST",
      headers: { Authorization: stripeAuth(), "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "metadata[registrationId]": registrationId }).toString(),
    });
    const pi = await piRes.json();
    if (!piRes.ok || pi.error) throw new Error(pi.error?.message ?? "Could not associate payment.");

    await kv.set(key, { ...record, stripePaymentIntentId: pi.id });
    await kv.set(`payment-intent:${pi.id}`, registrationId);
    return c.json({ success: true });
  } catch (err) {
    console.error("Payment association error:", err);
    return c.json({ success: false, error: (err as Error).message }, 500);
  }
});

// ── Create Stripe PaymentIntent (no npm module — plain fetch to Stripe API) ──

app.post("/make-server-e11bef9e/create-payment-intent", async (c) => {
  try {
    const auth = stripeAuth();

    // Look up the amount from the Price so it stays in sync with Stripe dashboard
    const priceRes = await fetch(
      "https://api.stripe.com/v1/prices/price_1UE37gJEH6HJ9NgaTvDGMkiZ",
      { headers: { Authorization: auth } },
    );
    const price = await priceRes.json();
    if (price.error) throw new Error(price.error.message);

    if (!priceRes.ok || !price.active || price.unit_amount !== 38500 || price.currency !== "usd" || price.type !== "one_time") {
      throw new Error("Payment blocked: the configured Stripe price must be active, one-time, and exactly $385.00 USD.");
    }

    const amount = 38500;
    const currency = "usd";

    // Create the PaymentIntent
    const piRes = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        amount: String(amount),
        currency,
        "automatic_payment_methods[enabled]": "true",
      }).toString(),
    });
    const pi = await piRes.json();
    if (pi.error) throw new Error(pi.error.message);

    return c.json({ success: true, clientSecret: pi.client_secret, paymentIntentId: pi.id });
  } catch (err) {
    console.error("Stripe PaymentIntent error:", err);
    return c.json({ success: false, error: (err as Error).message }, 500);
  }
});

// ── Verified Stripe webhook: authoritative payment status ────────────────────

app.post("/make-server-e11bef9e/stripe-webhook", async (c) => {
  const rawBody = await c.req.raw.text();
  const signature = c.req.header("Stripe-Signature") ?? "";
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";

  if (!secret || !(await verifyStripeSignature(rawBody, signature, secret))) {
    return c.text("Invalid Stripe signature", 400);
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return c.text("Invalid JSON", 400);
  }

  if (!event?.id || !event?.type) return c.text("Invalid event", 400);
  if (await kv.get(`stripe-event:${event.id}`)) return c.json({ received: true, duplicate: true });

  const handledTypes = ["payment_intent.succeeded", "payment_intent.payment_failed", "payment_intent.canceled"];
  if (handledTypes.includes(event.type)) {
    const pi = event.data?.object;
    const registrationId = pi?.metadata?.registrationId || await kv.get(`payment-intent:${pi?.id}`);
    if (!registrationId) return c.text("PaymentIntent is not associated with a registration", 409);

    const registrationKey = `registration:${registrationId}`;
    const record = await kv.get(registrationKey);
    if (!record) return c.text("Registration not found", 404);

    const status = event.type === "payment_intent.succeeded" ? "paid"
      : event.type === "payment_intent.payment_failed" ? "failed" : "canceled";
    const updated: Record<string, unknown> = {
      ...record,
      paymentStatus: status,
      stripePaymentIntentId: pi.id,
    };
    if (status === "paid") {
      updated.amountPaid = pi.amount_received;
      updated.paidAt = new Date(event.created * 1000).toISOString();
    }
    await kv.set(registrationKey, updated);
  }

  await kv.set(`stripe-event:${event.id}`, { type: event.type, processedAt: new Date().toISOString() });
  return c.json({ received: true });
});

Deno.serve(app.fetch);
