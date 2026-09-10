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

const STANDARD_PROGRAM_AMOUNT = 39700;
const PAYMENT_DISCOUNT = 1200;
const PROGRAM_CODE = "fall-2026-soccer-camp";

function paymentQuote(paymentMethodType: string, cardFunding?: string) {
  const isBank = paymentMethodType === "us_bank_account";
  const isDebit = paymentMethodType === "card" && cardFunding === "debit";
  const discount = isBank || isDebit ? PAYMENT_DISCOUNT : 0;
  return {
    paymentMethodType,
    cardFunding: cardFunding ?? null,
    programAmount: STANDARD_PROGRAM_AMOUNT,
    discount,
    discountLabel: isBank ? "Bank Payment Discount" : isDebit ? "Debit Payment Discount" : null,
    total: STANDARD_PROGRAM_AMOUNT - discount,
  };
}


// A unique KV key binds concurrent confirmation requests to one token.
// Keep it on ambiguous network errors so retries cannot switch payment methods.
async function claimConfirmation(paymentIntentId: string, tokenId: string) {
  const key = `payment-confirmation:${paymentIntentId}`;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const res = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/kv_store_e11bef9e`, {
    method: "POST",
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ key, value: { tokenId } }),
  });
  if (res.ok) return true;
  if (res.status !== 409) throw new Error("Could not reserve payment confirmation. Please retry.");
  return (await kv.get(key))?.tokenId === tokenId;
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
    const quote = paymentQuote("card", "unknown");

    const piRes = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        amount: String(STANDARD_PROGRAM_AMOUNT),
        currency: "usd",
        confirmation_method: "automatic",
        "payment_method_types[0]": "card",
        "payment_method_types[1]": "us_bank_account",
        "metadata[programCode]": PROGRAM_CODE,
        "metadata[standardProgramAmount]": String(STANDARD_PROGRAM_AMOUNT),
        "metadata[paymentDiscount]": "0",
      }).toString(),
    });
    const pi = await piRes.json();
    if (pi.error) throw new Error(pi.error.message);

    return c.json({ success: true, clientSecret: pi.client_secret, paymentIntentId: pi.id, quote });
  } catch (err) {
    console.error("Stripe PaymentIntent error:", err);
    return c.json({ success: false, error: (err as Error).message }, 500);
  }
});

// Inspect Stripe's tokenized payment details, apply any eligible discount, and
// confirm the Intent. The browser never decides the final amount.
app.post("/make-server-e11bef9e/confirm-payment", async (c) => {
  try {
    const auth = stripeAuth();
    const body = await c.req.json();
    const paymentIntentId = typeof body.paymentIntentId === "string" ? body.paymentIntentId : "";
    const confirmationTokenId = typeof body.confirmationTokenId === "string" ? body.confirmationTokenId : "";
    if (!paymentIntentId.startsWith("pi_") || !confirmationTokenId.startsWith("ctoken_")) {
      return c.json({ success: false, error: "Invalid payment confirmation." }, 400);
    }

    const stripeHeaders = { Authorization: auth, "Stripe-Version": "2025-10-29.clover" };
    const [currentRes, tokenRes] = await Promise.all([
      fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`, { headers: stripeHeaders }),
      fetch(`https://api.stripe.com/v1/confirmation_tokens/${encodeURIComponent(confirmationTokenId)}`, { headers: stripeHeaders }),
    ]);
    const current = await currentRes.json();
    const token = await tokenRes.json();
    if (!currentRes.ok || current.error) throw new Error(current.error?.message ?? "Could not load payment.");
    if (!tokenRes.ok || token.error) throw new Error(token.error?.message ?? "Could not verify payment details.");
    if (current.metadata?.programCode !== PROGRAM_CODE || current.currency !== "usd") {
      return c.json({ success: false, error: "Payment does not belong to this program." }, 403);
    }
    const reviewKey = `payment-review:${paymentIntentId}:${confirmationTokenId}`;
    const review = await kv.get(reviewKey);
    if (body.finalize === true && (!review || body.expectedTotal !== review.quote.total)) {
      return c.json({ success: false, error: "Review your payment total before confirming." }, 409);
    }
    if (current.confirmation_method !== "automatic") {
      return c.json({ success: false, error: "Please reload checkout to use the updated pricing." }, 409);
    }
    if (body.finalize === true && ["succeeded", "processing", "requires_action"].includes(current.status)) {
      if (current.metadata?.confirmationTokenId !== confirmationTokenId) {
        return c.json({ success: false, error: "Payment is already being confirmed with another method." }, 409);
      }
      return c.json({ success: true, quote: review.quote, status: current.status, clientSecret: current.client_secret });
    }
    const afterAuthentication = current.status === "requires_confirmation" && current.metadata?.confirmationTokenId === confirmationTokenId;
    if (current.status !== "requires_payment_method" && !afterAuthentication) {
      return c.json({ success: false, error: "This payment can no longer be updated." }, 409);
    }
    if (!current.metadata?.registrationId) {
      return c.json({ success: false, error: "Save registration before reviewing payment." }, 409);
    }
    if (!afterAuthentication && (token.expires_at * 1000 <= Date.now() || token.payment_intent)) {
      return c.json({ success: false, error: "Payment details expired or were already used. Choose Change payment method and review again." }, 409);
    }

    const preview = token.payment_method_preview;
    const paymentMethodType = preview?.type ?? "unknown";
    if (!["card", "us_bank_account"].includes(paymentMethodType)) {
      return c.json({ success: false, error: "This payment method is not available." }, 400);
    }
    const cardFunding = paymentMethodType === "card" ? preview?.card?.funding ?? "unknown" : undefined;
    const quote = paymentQuote(paymentMethodType, cardFunding);
    if (body.finalize !== true) {
      await kv.set(reviewKey, { quote, registrationId: current.metadata.registrationId });
      return c.json({ success: true, quote, status: "prepared" });
    }
    if (quote.total !== review.quote.total || review.registrationId !== current.metadata.registrationId) {
      return c.json({ success: false, error: "Payment details changed. Review your total again." }, 409);
    }
    if (!(await claimConfirmation(paymentIntentId, confirmationTokenId))) {
      return c.json({ success: false, error: "Another payment confirmation is in progress. Retry the original payment or contact Noor Sports." }, 409);
    }
    if (!afterAuthentication) {
    const updateRes = await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
      method: "POST",
      headers: { ...stripeHeaders, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        amount: String(quote.total),
        "metadata[confirmationTokenId]": confirmationTokenId,
        "metadata[paymentMethodType]": paymentMethodType,
        "metadata[cardFunding]": cardFunding ?? "",
        "metadata[paymentDiscount]": String(quote.discount),
        "metadata[discountLabel]": quote.discountLabel ?? "",
        receipt_email: preview?.billing_details?.email ?? "",
      }).toString(),
    });
    const updated = await updateRes.json();
    if (!updateRes.ok || updated.error) throw new Error(updated.error?.message ?? "Could not apply payment total.");
    }

    const confirmRes = await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}/confirm`, {
      method: "POST",
      headers: { ...stripeHeaders, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": `noor-confirm-${paymentIntentId}-${confirmationTokenId}-${afterAuthentication ? "authenticated" : "initial"}` },
      body: new URLSearchParams(afterAuthentication ? {} : { confirmation_token: confirmationTokenId }).toString(),
    });
    const confirmed = await confirmRes.json();
    if (!confirmRes.ok || confirmed.error) {
      if (confirmed.error?.payment_intent?.status === "requires_payment_method") {
        await kv.del(`payment-confirmation:${paymentIntentId}`);
      }
      throw new Error(confirmed.error?.message ?? "Could not confirm payment.");
    }
    return c.json({ success: true, quote, status: confirmed.status, clientSecret: confirmed.client_secret });
  } catch (err) {
    console.error("Stripe confirmation error:", err);
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
      updated.standardProgramAmount = Number(pi.metadata?.standardProgramAmount ?? STANDARD_PROGRAM_AMOUNT);
      updated.paymentDiscount = Number(pi.metadata?.paymentDiscount ?? 0);
      updated.discountLabel = pi.metadata?.discountLabel || null;
      updated.paymentMethodType = pi.metadata?.paymentMethodType || null;
      updated.cardFunding = pi.metadata?.cardFunding || null;
    }
    await kv.set(registrationKey, updated);
  }

  await kv.set(`stripe-event:${event.id}`, { type: event.type, processedAt: new Date().toISOString() });
  return c.json({ received: true });
});

Deno.serve(app.fetch);
