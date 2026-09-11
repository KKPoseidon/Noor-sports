import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  CreditCard,
  Shield,
  FileText,
  DollarSign,
  Shirt,
  Phone,
  Hash,
} from 'lucide-react';

// ─── Supabase / server config ────────────────────────────────────────────────

const projectId = 'cvfodnudqlhicilcfmpz';
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Zm9kbnVkcWxoaWNpbGNmbXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MzAwMjUsImV4cCI6MjEwNDMwNjAyNX0.ONpw16xMLRVO1B3GAfBbSVVLN0y4-hKPz2nXOAZ1phU';
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e11bef9e`;

// ─── Stripe ───────────────────────────────────────────────────────────────────

const stripePromise = loadStripe('pk_live_51UCpqyJEH6HJ9NgaR3dnzbFgbS50jOS9Lhj2MKjcLsgFm6Grpfm3rPWTJYrvQS54j1wv9v8OI9X5Hk8UWAbu8Yld00aL5Cos2v');

const stripeAppearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0066CC',
    colorBackground: '#ffffff',
    colorText: '#004C97',
    colorTextSecondary: 'rgba(0,76,151,0.6)',
    colorDanger: '#ef4444',
    borderRadius: '0px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSizeBase: '16px',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(0,102,204,0.2)',
      boxShadow: 'none',
      padding: '12px 16px',
    },
    '.Input:focus': {
      border: '1px solid #0066CC',
      boxShadow: 'none',
      outline: '0',
    },
    '.Label': {
      color: 'rgba(0,76,151,0.7)',
      fontWeight: '500',
      fontSize: '14px',
      marginBottom: '8px',
    },
    '.Tab': {
      border: '1px solid rgba(0,102,204,0.2)',
      boxShadow: 'none',
    },
    '.Tab--selected': {
      border: '2px solid #0066CC',
      boxShadow: 'none',
      color: '#0066CC',
    },
    '.Tab:hover': { border: '1px solid rgba(0,102,204,0.5)' },
    '.Block': { border: '1px solid rgba(0,102,204,0.15)' },
    '.Error': { fontSize: '12px' },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type View = 'listing' | 'form' | 'success';
type Step = 1 | 2 | 3 | 4;

interface FormData {
  parentFirstName: string;
  parentLastName: string;
  phone: string;
  email: string;
  childFirstName: string;
  childLastName: string;
  childAge: string;
  childGrade: string;
  childGender: string;
  ec1Name: string;
  ec1Relation: string;
  ec1Phone: string;
  ec2Name: string;
  ec2Relation: string;
  ec2Phone: string;
  medicalNotes: string;
  waiverSignature: string;
  waiverSigned: boolean;
  jerseySize: string;
  jerseyPrintName: string;
  jerseyNumber1: string;
  jerseyNumber2: string;
}

const EMPTY_FORM: FormData = {
  parentFirstName: '', parentLastName: '', phone: '', email: '',
  childFirstName: '', childLastName: '', childAge: '', childGrade: '', childGender: '',
  ec1Name: '', ec1Relation: '', ec1Phone: '',
  ec2Name: '', ec2Relation: '', ec2Phone: '',
  medicalNotes: '', waiverSignature: '', waiverSigned: false,
  jerseySize: '', jerseyPrintName: '', jerseyNumber1: '', jerseyNumber2: '',
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] placeholder-[#004C97]/30 focus:outline-none focus:border-[#0066CC] transition-colors text-base';
const selectClass =
  'w-full px-4 py-3 bg-white border border-[#0066CC]/20 text-[#004C97] focus:outline-none focus:border-[#0066CC] transition-colors text-base appearance-none cursor-pointer';
const labelClass = 'block text-sm text-[#004C97]/70 mb-2 font-medium';

// ─── Progress bar ─────────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: 'Participant Info' },
  { n: 2, label: 'Safety & Waiver' },
  { n: 3, label: 'Uniform Info' },
  { n: 4, label: 'Payment' },
];

function ProgressBar({ step }: { step: Step }) {
  const pct = step === 1 ? '0%' : step === 2 ? '33%' : step === 3 ? '66%' : '100%';
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-[2px] bg-[#0066CC]/10 z-0" />
        <motion.div
          className="absolute left-0 top-4 h-[2px] bg-[#0066CC] z-0"
          initial={{ width: '0%' }}
          animate={{ width: pct }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
        {STEPS.map(({ n, label }) => {
          const done = step > n;
          const active = step === n;
          return (
            <div key={n} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                done ? 'bg-[#0066CC] text-white'
                  : active ? 'bg-[#0066CC] text-white ring-4 ring-[#0066CC]/20'
                  : 'bg-white border-2 border-[#0066CC]/20 text-[#004C97]/40'
              }`}>
                {done ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <span className={`text-xs tracking-wide uppercase text-center leading-tight max-w-[70px] ${
                active ? 'text-[#0066CC] font-semibold' : done ? 'text-[#0066CC]/60' : 'text-[#004C97]/30'
              }`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHead({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#0066CC]/60 mb-5">
      {icon}{children}
    </div>
  );
}

// ─── Inline error ─────────────────────────────────────────────────────────────

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

// ─── Contact help notice (appears on all pages) ───────────────────────────────

function ContactNotice() {
  return (
    <div className="bg-[#F0F7FF] border-b border-[#0066CC]/12 py-3 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 flex-wrap text-center">
        <Phone className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
        <p className="text-sm text-[#004C97]/75">
          Having registration difficulties?{' '}
          <a href="tel:6195004370" className="font-semibold text-[#0066CC] hover:underline">
            (619) 500-4370
          </a>
          {' '}— we are here to help.
        </p>
      </div>
    </div>
  );
}

// ─── Jersey Sizing Chart Placeholder ─────────────────────────────────────────

function SizingChart() {
  const headers = ['Size', 'Jersey Length', 'Chest', 'Shorts Length', 'Rec. Height', 'Rec. Weight'];
  const rows = [
    { size: 'Size 16', jerseyLen: '47 cm', chest: '33.5 cm', shortsLen: '26 cm', height: '100–110 cm', weight: 'Under 12.5 kg' },
    { size: 'Size 18', jerseyLen: '50 cm', chest: '35.5 cm', shortsLen: '28 cm', height: '110–120 cm', weight: '12.5–20 kg'   },
    { size: 'Size 20', jerseyLen: '53 cm', chest: '37.5 cm', shortsLen: '30 cm', height: '120–130 cm', weight: '20–27.5 kg'   },
    { size: 'Size 22', jerseyLen: '56 cm', chest: '39.5 cm', shortsLen: '32 cm', height: '130–140 cm', weight: '27.5–35 kg'   },
    { size: 'Size 24', jerseyLen: '59 cm', chest: '41.5 cm', shortsLen: '34 cm', height: '140–150 cm', weight: '35–42.5 kg'   },
    { size: 'Size 26', jerseyLen: '62 cm', chest: '43.5 cm', shortsLen: '36 cm', height: '150–155 cm', weight: '42.5–47.5 kg' },
    { size: 'Size 28', jerseyLen: '65 cm', chest: '45.5 cm', shortsLen: '38 cm', height: '155–160 cm', weight: '47.5–55 kg'   },
  ];
  return (
    <div className="border border-[#0066CC]/15 overflow-hidden">
      <div className="bg-[#0066CC] px-5 py-3 flex items-center gap-2">
        <Shirt className="w-4 h-4 text-white/70" />
        <span className="text-xs tracking-[0.15em] uppercase text-white font-medium">Uniform Sizing Chart</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F0F7FF]">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-[#004C97]/70 tracking-wide uppercase border-b border-[#0066CC]/10 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ size, jerseyLen, chest, shortsLen, height, weight }, i) => (
              <tr key={size} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FBFF]'}>
                <td className="px-4 py-2.5 font-bold text-[#0066CC] border-b border-[#0066CC]/8 whitespace-nowrap">{size}</td>
                <td className="px-4 py-2.5 text-[#004C97]/70 border-b border-[#0066CC]/8 whitespace-nowrap">{jerseyLen}</td>
                <td className="px-4 py-2.5 text-[#004C97]/70 border-b border-[#0066CC]/8 whitespace-nowrap">{chest}</td>
                <td className="px-4 py-2.5 text-[#004C97]/70 border-b border-[#0066CC]/8 whitespace-nowrap">{shortsLen}</td>
                <td className="px-4 py-2.5 text-[#004C97]/70 border-b border-[#0066CC]/8 whitespace-nowrap">{height}</td>
                <td className="px-4 py-2.5 text-[#004C97]/70 border-b border-[#0066CC]/8 whitespace-nowrap">{weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-[#0066CC]/10">
        <p className="text-xs text-[#004C97]/50 leading-relaxed">
          Measurements are taken manually and may vary by approximately 1–2 cm due to measuring methods and fabric elasticity. Please use this chart as a sizing reference.
        </p>
      </div>
    </div>
  );
}

// ─── Stripe checkout form (must live inside <Elements>) ───────────────────────

interface CheckoutFormProps {
  form: FormData;
  paymentIntentId: string;
  initialQuote: PaymentQuote;
  onSuccess: (registrationId: string, status: string, hostedVerificationUrl?: string) => void;
  onBack: () => void;
}

interface PaymentQuote {
  paymentMethodType: string;
  cardFunding: string | null;
  programAmount: number;
  discount: number;
  discountLabel: string | null;
  total: number;
}

const formatUsd = (amount: number) => `$${(amount / 100).toFixed(2)}`;

function CheckoutForm({ form, paymentIntentId, initialQuote, onSuccess, onBack }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quote, setQuote] = useState(initialQuote);
  const savedRegistration = useRef<string | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const [paymentLoadError, setPaymentLoadError] = useState<string | null>(null);
  const [paymentElementKey, setPaymentElementKey] = useState(0);
  useEffect(() => {
    if (paymentReady) return;
    const timer = window.setTimeout(() => setPaymentLoadError('Secure payment fields could not load. Retry below, or allow Stripe if a browser extension is blocking it.'), 20000);
    return () => window.clearTimeout(timer);
  }, [paymentReady, paymentElementKey]);
  const [pendingConfirmation, setPendingConfirmation] = useState<{ tokenId: string; registrationId: string } | null>(null);

  const finishServerConfirmation = async (tokenId: string, rid: string) => {
    sessionStorage.setItem('noor-payment-review', JSON.stringify({ paymentIntentId, confirmationTokenId: tokenId, expectedTotal: quote.total, registrationId: rid }));
    const confirmRes = await fetch(`${SERVER_URL}/confirm-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({ paymentIntentId, confirmationTokenId: tokenId, finalize: true, expectedTotal: quote.total }),
    });
    const confirmData = await confirmRes.json();
    if (!confirmRes.ok || !confirmData.success) throw new Error(confirmData.error ?? 'Payment could not be completed.');
    setQuote(confirmData.quote);

    if (confirmData.status === 'requires_action') {
      const { error: actionError, paymentIntent } = await stripe!.handleNextAction({ clientSecret: confirmData.clientSecret });
      if (actionError) throw new Error(actionError.message ?? 'Payment authentication failed.');
      if (paymentIntent?.status === 'requires_confirmation') await finishServerConfirmation(tokenId, rid);
      else if (paymentIntent && ['succeeded', 'processing'].includes(paymentIntent.status)) onSuccess(rid, paymentIntent.status);
      else if (paymentIntent?.status === 'requires_action' && paymentIntent.next_action?.type === 'verify_with_microdeposits') {
        sessionStorage.removeItem('noor-payment-review');
        onSuccess(rid, 'requires_action', paymentIntent.next_action.verify_with_microdeposits.hosted_verification_url);
      }
      else throw new Error('Payment was not completed. Please try again.');
    } else if (['succeeded', 'processing'].includes(confirmData.status)) {
      onSuccess(rid, confirmData.status);
    } else {
      throw new Error('Payment was not completed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (pendingConfirmation) {
        await finishServerConfirmation(pendingConfirmation.tokenId, pendingConfirmation.registrationId);
        return;
      }

      const { error: elementError } = await elements.submit();
      if (elementError) throw new Error(elementError.message ?? 'Please check your payment details.');

      // Reuse the pending registration when payment details need correction.
      let rid = savedRegistration.current;
      if (!rid) {
      // 1. Save registration record with pending payment status
      const regRes = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify({
          parentFirstName: form.parentFirstName,
          parentLastName: form.parentLastName,
          phone: form.phone,
          email: form.email,
          childFirstName: form.childFirstName,
          childLastName: form.childLastName,
          childAge: form.childAge,
          childGrade: form.childGrade,
          childGender: form.childGender,
          ec1Name: form.ec1Name,
          ec1Relation: form.ec1Relation,
          ec1Phone: form.ec1Phone,
          ec2Name: form.ec2Name,
          ec2Relation: form.ec2Relation,
          ec2Phone: form.ec2Phone,
          medicalNotes: form.medicalNotes,
          waiverSignature: form.waiverSignature,
          waiverSigned: form.waiverSigned,
          jerseySize: form.jerseySize,
          jerseyPrintName: form.jerseyPrintName,
          jerseyNumber1: form.jerseyNumber1,
          jerseyNumber2: form.jerseyNumber2,
        }),
      });

      const regData = await regRes.json();
      if (!regRes.ok || !regData.success) {
        throw new Error(regData.error ?? 'Registration save failed. Please try again.');
      }

      rid = regData.registrationId;
      savedRegistration.current = rid;
      }

      // 2. Associate the saved registration with this PaymentIntent before confirmation.
      //    The verified Stripe webhook uses this metadata to update the correct record.
      const associationRes = await fetch(`${SERVER_URL}/associate-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify({ registrationId: rid, paymentIntentId }),
      });
      const associationData = await associationRes.json();
      if (!associationRes.ok || !associationData.success) {
        throw new Error(associationData.error ?? 'Could not connect registration to payment. Please try again.');
      }

      // 3. Validate the Element, then tokenize its payment details for the
      //    server to inspect and confirm. Stripe exposes card.funding there.
      const returnUrl = `${window.location.origin}/register?paid=1&rid=${rid}`;
      const { error: tokenError, confirmationToken } = await stripe.createConfirmationToken({
        elements,
        params: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: {
              name: `${form.parentFirstName} ${form.parentLastName}`.trim(),
              email: form.email,
              phone: form.phone,
            },
          },
        },
      });
      if (tokenError || !confirmationToken) throw new Error(tokenError?.message ?? 'Could not secure payment details.');

      // 4. The server reads the ConfirmationToken from Stripe, checks
      //    payment_method_preview.card.funding, returns a verified total without charging.
      const quoteRes = await fetch(`${SERVER_URL}/confirm-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify({ paymentIntentId, confirmationTokenId: confirmationToken.id, finalize: false }),
      });
      const quoteData = await quoteRes.json();
      if (!quoteRes.ok || !quoteData.success) throw new Error(quoteData.error ?? 'Could not verify payment details.');
      setQuote(quoteData.quote);
      setPendingConfirmation({ tokenId: confirmationToken.id, registrationId: rid! });
      submittingRef.current = false;
      setIsSubmitting(false);
    } catch (err) {
      setSubmitError((err as Error).message);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">

      {/* Stripe Payment Element */}
      <div hidden={!!pendingConfirmation} style={{ pointerEvents: isSubmitting ? 'none' : undefined }}>
        <SectionHead icon={<CreditCard className="w-4 h-4 text-[#0066CC]" />}>
          Payment Details
        </SectionHead>
        {!paymentReady && !paymentLoadError && <p role="status" className="mb-4 text-sm text-[#004C97]">Loading secure payment fields…</p>}
        {paymentLoadError && <div role="alert" className="mb-4 p-4 bg-red-50 text-red-700 text-sm">
          <p>{paymentLoadError}</p>
          <button type="button" className="mt-2 underline" onClick={() => {
            setPaymentReady(false); setPaymentLoadError(null); setPaymentElementKey((key) => key + 1);
          }}>Retry payment fields</button>
        </div>}
        <PaymentElement
          key={paymentElementKey}
          onReady={() => { setPaymentReady(true); setPaymentLoadError(null); }}
          onLoadError={({ error }) => setPaymentLoadError(error.message ?? 'Secure payment fields could not load. Please retry.')}
          options={{
            layout: 'tabs',
            wallets: { applePay: 'auto', googlePay: 'auto' },
          }}
        />
      </div>

      {pendingConfirmation && <div className="space-y-3" aria-live="polite">
        <p className="font-semibold text-[#004C97]">Payment method verified. Review your total below.</p>
        <button type="button" disabled={isSubmitting} className="text-[#0066CC] underline disabled:opacity-40" onClick={() => {
          setPendingConfirmation(null); setQuote(initialQuote); setSubmitError(null);
        }}>Change payment method</button>
      </div>}

      {/* Fee disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 leading-relaxed">
        <p className="font-semibold mb-1">Program Tuition</p>
        <p className="text-red-700">
          Standard tuition is $397 for all card payments, including credit and debit. Pay $385 with a verified US bank account. Review Total checks your bank discount before you confirm payment.
        </p>
        <div className="mt-3 pt-3 border-t border-amber-200 space-y-2 text-base">
          <div className="flex justify-between"><span>Program Registration</span><span>{formatUsd(quote.programAmount)}</span></div>
          {quote.discount > 0 && <div className="flex justify-between"><span>{quote.discountLabel}</span><span>-{formatUsd(quote.discount)}</span></div>}
          <div className="flex justify-between font-bold"><span>{pendingConfirmation ? 'Verified total' : 'Total before verification'}</span><span>{formatUsd(quote.total)}</span></div>
        </div>
      </div>

      {/* Submit error */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700 leading-relaxed">
          <strong>Payment needs attention:</strong> {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="pt-4 border-t border-[#0066CC]/10 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-4 border border-[#0066CC]/30 text-[#0066CC] text-sm hover:border-[#0066CC] hover:bg-[#F8FBFF] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          type="submit"
          disabled={isSubmitting || !stripe || !elements || !paymentReady}
          className="flex-1 inline-flex items-center justify-center gap-3 bg-[#0066CC] text-white px-8 py-4 text-base tracking-tight relative overflow-hidden group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={isSubmitting ? {} : { scale: 1.01 }}
          whileTap={isSubmitting ? {} : { scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {!isSubmitting && (
            <motion.div
              className="absolute inset-0 bg-[#004C97]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {isSubmitting ? (
            <span className="relative z-10 font-medium flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing…
            </span>
          ) : (
            <>
              <span className="relative z-10 font-medium">{pendingConfirmation ? `Confirm Payment — ${formatUsd(quote.total)}` : 'Review Total'}</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </>
          )}
        </motion.button>
      </div>

      <p className="text-xs text-[#004C97]/40 text-center leading-relaxed">
        By submitting, you confirm all information is accurate and agree to the Noor Sports Liability Waiver signed in the previous step. Registration is confirmed upon successful payment.
      </p>
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Register() {
  const [view, setView] = useState<View>('listing');
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState('succeeded');
  const [hostedVerificationUrl, setHostedVerificationUrl] = useState<string | null>(null);
  const [returnError, setReturnError] = useState<string | null>(null);

  // PaymentIntent client secret — fetched when user reaches step 4
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [initialQuote, setInitialQuote] = useState<PaymentQuote | null>(null);
  const [piLoading, setPiLoading] = useState(false);
  const [piError, setPiError] = useState<string | null>(null);

  // Detect return from Stripe 3DS redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secret = params.get('payment_intent_client_secret');
    if (params.get('paid') === '1' && secret) {
      void stripePromise.then(async (stripe) => {
        if (!stripe) return;
        let { paymentIntent } = await stripe.retrievePaymentIntent(secret);
        if (paymentIntent?.status === 'requires_confirmation') {
          const saved = JSON.parse(sessionStorage.getItem('noor-payment-review') ?? 'null');
          if (!saved || saved.paymentIntentId !== paymentIntent.id) throw new Error('Please contact Noor Sports to finish payment confirmation.');
          const res = await fetch(`${SERVER_URL}/confirm-payment`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${publicAnonKey}` },
            body: JSON.stringify({ ...saved, finalize: true }),
          });
          const data = await res.json();
          if (!res.ok || !data.success) throw new Error(data.error ?? 'Could not finish payment.');
          ({ paymentIntent } = await stripe.retrievePaymentIntent(secret));
        }
        if (paymentIntent && ['succeeded', 'processing'].includes(paymentIntent.status)) {
          setRegistrationId(params.get('rid')); setPaymentStatus(paymentIntent.status); setView('success');
          sessionStorage.removeItem('noor-payment-review');
        }
        else throw new Error('Payment is not complete. Please contact Noor Sports before trying again.');
        window.history.replaceState({}, '', window.location.pathname);
      }).catch((err) => setReturnError(err.message));
    }
  }, []);

  // Fetch PaymentIntent when step 4 is reached
  useEffect(() => {
    if (step !== 4 || clientSecret || piLoading) return;
    setPiLoading(true);
    setPiError(null);
    fetch(`${SERVER_URL}/create-payment-intent`, {
      signal: AbortSignal.timeout(15000),
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then(async (data) => {
        if (!data.success) throw new Error(data.error ?? 'Failed to initialize payment.');
        if (!data.clientSecret || !data.paymentIntentId || data.quote?.total !== 39700 || data.quote?.programAmount !== 39700) {
          throw new Error('The server returned an invalid camp total. Please reload and try again.');
        }
        setPaymentIntentId(data.paymentIntentId);
        setInitialQuote(data.quote);
        setClientSecret(data.clientSecret);
      })
      .catch((err) => setPiError((err as Error).message))
      .finally(() => setPiLoading(false));
  }, [step]);

  const set = (name: keyof FormData, value: string | boolean) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const val: string | boolean = type === 'checkbox' ? (checked as boolean) : value;
    set(name as keyof FormData, val);
  };

  // ── Step validators ──────────────────────────────────────────────────────────

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.parentFirstName.trim()) e.parentFirstName = 'Required';
    if (!form.parentLastName.trim()) e.parentLastName = 'Required';
    const digits = form.phone.replace(/\D/g, '');
    if (!digits) e.phone = 'Required';
    else if (digits.length !== 10) e.phone = 'Phone number must be exactly 10 digits';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.email.trim()) e.email = 'Required';
    else if (!emailRegex.test(form.email.trim())) e.email = 'Enter a valid email address (e.g. name@example.com)';
    if (!form.childFirstName.trim()) e.childFirstName = 'Required';
    if (!form.childLastName.trim()) e.childLastName = 'Required';
    if (!form.childAge.trim()) e.childAge = 'Required';
    if (!form.childGrade) e.childGrade = 'Required';
    if (!form.childGender) e.childGender = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.ec1Name.trim()) e.ec1Name = 'Required';
    if (!form.ec1Relation.trim()) e.ec1Relation = 'Required';
    if (!form.ec1Phone.trim()) e.ec1Phone = 'Required';
    if (!form.ec2Name.trim()) e.ec2Name = 'Required';
    if (!form.ec2Relation.trim()) e.ec2Relation = 'Required';
    if (!form.ec2Phone.trim()) e.ec2Phone = 'Required';
    if (!form.waiverSignature.trim()) e.waiverSignature = 'Please type your full legal name';
    if (!form.waiverSigned) e.waiverSigned = 'You must agree to the waiver';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: typeof errors = {};
    if (!form.jerseySize) e.jerseySize = 'Please select a jersey size';
    if (!form.jerseyPrintName.trim()) e.jerseyPrintName = 'Required — this name will appear on the back of your jersey';
    const numRegex = /^\d{1,2}$/;
    if (!form.jerseyNumber1.trim()) e.jerseyNumber1 = 'Required';
    else if (!numRegex.test(form.jerseyNumber1.trim())) e.jerseyNumber1 = 'Enter a 1 or 2 digit number (0–99)';
    if (!form.jerseyNumber2.trim()) e.jerseyNumber2 = 'Required';
    else if (!numRegex.test(form.jerseyNumber2.trim())) e.jerseyNumber2 = 'Enter a 1 or 2 digit number (0–99)';
    else if (form.jerseyNumber2.trim() === form.jerseyNumber1.trim()) e.jerseyNumber2 = 'Second choice must be a different number than your first choice';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else if (step === 2 && validateStep2()) { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else if (step === 3 && validateStep3()) { setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) {
      setStep(3);
      setClientSecret(null);
      setPaymentIntentId(null);
      setPiError(null);
    }
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setView('listing');
    setStep(1);
    setForm(EMPTY_FORM);
    setErrors({});
    setRegistrationId(null);
    setClientSecret(null);
    setPaymentIntentId(null);
    setPiError(null);
  };

  // ── Gender toggle ─────────────────────────────────────────────────────────

  const GenderToggle = () => (
    <div>
      <label className={labelClass}>Gender *</label>
      <div className="flex gap-0">
        {['Male', 'Female'].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => set('childGender', g)}
            className={`flex-1 py-3 text-sm font-medium border transition-colors cursor-pointer ${
              form.childGender === g
                ? 'bg-[#0066CC] text-white border-[#0066CC]'
                : 'bg-white text-[#004C97]/60 border-[#0066CC]/20 hover:border-[#0066CC]/50'
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <Err msg={errors.childGender} />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="relative">

      {/* ── Hero ── */}
      <section className="py-24 lg:py-32 bg-[#0066CC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">Registration</div>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-8 text-white">
              {view === 'form' ? 'Complete Your Registration' : 'Join Noor Sports'}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {view === 'form'
                ? "Secure your child's spot in the Fall 2026 Soccer Camp."
                : 'Register your child for the Fall 2026 Soccer Camp and build their skills through focused training and competitive play.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Help Notice (all views) ── */}
      <ContactNotice />
      {returnError && <p role="alert" className="p-6 text-red-700 bg-red-50">{returnError}</p>}

      {/* ── Success ── */}
      {view === 'success' && (
        <section className="py-24 bg-white">
          <div className="max-w-[680px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Icon + header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-20 h-20 bg-[#0066CC] flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-11 h-11 text-white" />
                </motion.div>

                <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-4">
                  {paymentStatus === 'requires_action' ? 'Bank Verification Needed' : paymentStatus === 'processing' ? 'Payment Processing' : 'Registration Confirmed'}
                </div>
                <h2 className="text-4xl lg:text-5xl tracking-tight text-[#004C97] mb-6 leading-tight">
                  Thank You,{' '}{form.parentFirstName}!
                </h2>
                <p className="text-xl text-[#004C97]/70 leading-relaxed mb-3">
                  We are so excited to have <strong className="text-[#004C97]">{form.childFirstName}</strong> join us this fall.
                </p>
                <p className="text-base text-[#004C97]/55 leading-relaxed">
                  {paymentStatus === 'requires_action'
                    ? 'Stripe needs to verify your bank account with a small microdeposit before payment can begin. Verification instructions will be sent to'
                    : paymentStatus === 'processing'
                      ? 'Your bank payment is processing. Registration is confirmed once payment succeeds. Updates will be sent to'
                      : 'Your payment confirmation will be sent to'}{' '}
                  <span className="font-semibold text-[#004C97]/70">{form.email}</span>.
                  {paymentStatus !== 'requires_action' && <> Our team will reach out within <strong className="text-[#004C97]/70">1–2 business days</strong> to confirm your registration and go over your uniform details.</>}
                </p>
                {paymentStatus === 'requires_action' && hostedVerificationUrl && (
                  <a href={hostedVerificationUrl} className="inline-flex mt-6 bg-[#0066CC] text-white px-7 py-4 font-medium hover:bg-[#004C97] transition-colors">
                    Verify Bank Account with Stripe
                  </a>
                )}
              </div>

              {/* Details card */}
              <div className="border border-[#0066CC]/12 mb-10">
                <div className="bg-[#0066CC] px-6 py-4">
                  <h3 className="text-sm tracking-[0.15em] uppercase text-white font-medium">Your Registration Summary</h3>
                </div>
                <div className="divide-y divide-[#0066CC]/8">
                  <div className="grid sm:grid-cols-2 gap-0">
                    <div className="px-6 py-4 sm:border-r border-[#0066CC]/8">
                      <div className="text-xs tracking-[0.12em] uppercase text-[#0066CC]/40 mb-1">Athlete</div>
                      <p className="font-semibold text-[#004C97]">{form.childFirstName} {form.childLastName}</p>
                      <p className="text-sm text-[#004C97]/55">{form.childGrade} &nbsp;·&nbsp; {form.childGender}</p>
                    </div>
                    <div className="px-6 py-4">
                      <div className="text-xs tracking-[0.12em] uppercase text-[#0066CC]/40 mb-1">Camp</div>
                      <p className="font-semibold text-[#004C97]">Fall 2026 Soccer Camp</p>
                      <p className="text-sm text-[#004C97]/55">Tue &amp; Thu · 4:15 – 5:30 PM</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-0">
                    <div className="px-6 py-4 sm:border-r border-[#0066CC]/8">
                      <div className="text-xs tracking-[0.12em] uppercase text-[#0066CC]/40 mb-1">Season Dates</div>
                      <p className="font-semibold text-[#004C97]">Oct 5 – Dec 17, 2026</p>
                      <p className="text-sm text-[#004C97]/55">10-week session</p>
                    </div>
                    {form.jerseySize && (
                      <div className="px-6 py-4">
                        <div className="text-xs tracking-[0.12em] uppercase text-[#0066CC]/40 mb-1">Uniform</div>
                        <p className="font-semibold text-[#004C97]">Size {form.jerseySize} &nbsp;·&nbsp; #{form.jerseyNumber1}</p>
                        <p className="text-sm text-[#004C97]/55">Name: {form.jerseyPrintName}</p>
                      </div>
                    )}
                  </div>
                  {registrationId && (
                    <div className="px-6 py-4 bg-[#F8FBFF]">
                      <div className="text-xs tracking-[0.12em] uppercase text-[#0066CC]/40 mb-1">Registration ID</div>
                      <p className="font-mono font-semibold text-[#004C97] tracking-wider text-lg">{registrationId}</p>
                      <p className="text-xs text-[#004C97]/40 mt-0.5">Keep this for your records</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next steps */}
              <div className="bg-[#F0F7FF] border-l-4 border-[#00BFFF] px-6 py-5 mb-10">
                <p className="text-sm font-semibold text-[#004C97] mb-2">What happens next?</p>
                <ul className="space-y-1.5 text-sm text-[#004C97]/65 leading-relaxed">
                  <li>✓ &nbsp;Check your email for a payment receipt from Stripe</li>
                  <li>✓ &nbsp;We will contact you within 1–2 business days to finalize your registration</li>
                  <li>✓ &nbsp;We will confirm your uniform size and jersey number at that time</li>
                  <li>✓ &nbsp;Questions before then? Call us at <a href="tel:6195004370" className="font-semibold text-[#0066CC] hover:underline">(619) 500-4370</a></li>
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-3 bg-[#0066CC] text-white px-10 py-4 text-sm tracking-tight hover:bg-[#004C97] transition-colors cursor-pointer"
                >
                  Back to Registration
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Listing ── */}
      {view === 'listing' && (
        <section className="py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="text-xs tracking-[0.2em] uppercase text-[#0066CC]/50 mb-8">Current Camps</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-[#004C97] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BFFF]" />
              <div className="absolute top-6 right-6 bg-[#00BFFF] text-white text-xs tracking-[0.15em] uppercase px-4 py-2 font-medium">
                Registration Open
              </div>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16">
                  <h2 className="text-4xl lg:text-5xl tracking-tight text-white mb-8">Fall 2026 Soccer Camp</h2>
                  <div className="space-y-5 mb-10">
                    {[
                      { icon: <Calendar className="w-5 h-5 text-[#00BFFF]" />, label: 'Season', main: 'October 5 – December 17, 2026', sub: '10-week session' },
                      { icon: <Clock className="w-5 h-5 text-[#00BFFF]" />, label: 'Schedule', main: 'Tuesdays & Thursdays', sub: '4:15 PM – 5:30 PM' },
                      { icon: <Users className="w-5 h-5 text-[#00BFFF]" />, label: 'Ages', main: 'TK – 5th Grade', sub: '' },
                      { icon: <DollarSign className="w-5 h-5 text-[#00BFFF]" />, label: 'Tuition', main: '$385', sub: '$397 for card payments · $385 with verified US bank payment' },
                    ].map(({ icon, label, main, sub }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-white/10 flex items-center justify-center mt-0.5">{icon}</div>
                        <div>
                          <div className="text-xs tracking-[0.15em] uppercase text-white/40 mb-1">{label}</div>
                          <p className="text-white text-lg">{main}</p>
                          {sub && <p className="text-white/60 text-sm mt-1">{sub}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      onClick={() => setView('form')}
                      className="inline-flex items-center gap-3 bg-[#00BFFF] text-white px-14 py-6 text-base tracking-tight relative overflow-hidden group cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <motion.div className="absolute inset-0 bg-[#00A8E6]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                      <span className="relative z-10 font-medium">Register Now</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.button>
                  </div>
                </div>
                <div className="bg-[#003F7F] p-12 lg:p-16">
                  <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-8">What's Included</div>
                  <ul className="space-y-4">
                    {[
                      'Two training sessions per week',
                      'Professional soccer coaching',
                      'Age-appropriate skill development',
                      'Women coaches available for girls',
                      'Fully custom jersey with their name and selected number on the back',
                      'Scrimmages against real local teams',
                      'Positive, encouraging environment',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/75">
                        <CheckCircle className="w-5 h-5 text-[#00BFFF] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Multi-step Form ── */}
      {view === 'form' && (
        <section className="py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-12">
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

              {step === 1 && (
                <button onClick={reset} className="text-sm text-[#0066CC] mb-10 hover:text-[#004C97] transition-colors flex items-center gap-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Programs
                </button>
              )}

              <ProgressBar step={step} />

              {/* ════ STEP 1 — Participant Info ════ */}
              {step === 1 && (
                <div className="space-y-12">
                  <div>
                    <SectionHead>Parent / Guardian Information</SectionHead>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input className={inputClass} type="text" name="parentFirstName" value={form.parentFirstName} onChange={handleChange} placeholder="Jane" />
                        <Err msg={errors.parentFirstName} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input className={inputClass} type="text" name="parentLastName" value={form.parentLastName} onChange={handleChange} placeholder="Doe" />
                        <Err msg={errors.parentLastName} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input className={inputClass} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(619) 555-0100" />
                        <Err msg={errors.phone} />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                        <Err msg={errors.email} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionHead>Child Information</SectionHead>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input className={inputClass} type="text" name="childFirstName" value={form.childFirstName} onChange={handleChange} placeholder="Alex" />
                        <Err msg={errors.childFirstName} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input className={inputClass} type="text" name="childLastName" value={form.childLastName} onChange={handleChange} placeholder="Doe" />
                        <Err msg={errors.childLastName} />
                      </div>
                      <div>
                        <label className={labelClass}>Age *</label>
                        <input className={inputClass} type="number" name="childAge" value={form.childAge} onChange={handleChange} placeholder="e.g. 7" min="4" max="12" />
                        <Err msg={errors.childAge} />
                      </div>
                      <div>
                        <label className={labelClass}>Grade Level *</label>
                        <div className="relative">
                          <select className={selectClass} name="childGrade" value={form.childGrade} onChange={handleChange}>
                            <option value="">Select grade</option>
                            {['TK', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'].map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0066CC]/40">▾</div>
                        </div>
                        <Err msg={errors.childGrade} />
                      </div>
                      <div className="sm:col-span-2">
                        <GenderToggle />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0066CC]/10">
                    <motion.button
                      type="button"
                      onClick={goNext}
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#0066CC] text-white px-8 py-5 text-base tracking-tight relative overflow-hidden group cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <motion.div className="absolute inset-0 bg-[#004C97]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                      <span className="relative z-10 font-medium">Continue to Safety &amp; Waiver</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ════ STEP 2 — Safety & Waiver ════ */}
              {step === 2 && (
                <div className="space-y-12">

                  <div>
                    <SectionHead icon={<Shield className="w-4 h-4 text-[#0066CC]" />}>Emergency Contact 1</SectionHead>
                    <div className="bg-[#F8FBFF] border-l-4 border-[#00BFFF] p-5 mb-6 text-sm text-[#004C97]/70 leading-relaxed">
                      Please provide two contacts reachable by phone during all training sessions.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input className={inputClass} type="text" name="ec1Name" value={form.ec1Name} onChange={handleChange} placeholder="Full name" />
                        <Err msg={errors.ec1Name} />
                      </div>
                      <div>
                        <label className={labelClass}>Relationship to Child *</label>
                        <input className={inputClass} type="text" name="ec1Relation" value={form.ec1Relation} onChange={handleChange} placeholder="e.g. Grandparent" />
                        <Err msg={errors.ec1Relation} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Phone Number *</label>
                        <input className={inputClass} type="tel" name="ec1Phone" value={form.ec1Phone} onChange={handleChange} placeholder="(619) 555-0200" />
                        <Err msg={errors.ec1Phone} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionHead icon={<Shield className="w-4 h-4 text-[#0066CC]" />}>Emergency Contact 2</SectionHead>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input className={inputClass} type="text" name="ec2Name" value={form.ec2Name} onChange={handleChange} placeholder="Full name" />
                        <Err msg={errors.ec2Name} />
                      </div>
                      <div>
                        <label className={labelClass}>Relationship to Child *</label>
                        <input className={inputClass} type="text" name="ec2Relation" value={form.ec2Relation} onChange={handleChange} placeholder="e.g. Aunt/Uncle" />
                        <Err msg={errors.ec2Relation} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Phone Number *</label>
                        <input className={inputClass} type="tel" name="ec2Phone" value={form.ec2Phone} onChange={handleChange} placeholder="(619) 555-0300" />
                        <Err msg={errors.ec2Phone} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Medical Notes / Allergies <span className="text-[#004C97]/40 font-normal">(optional)</span>
                    </label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      name="medicalNotes"
                      value={form.medicalNotes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any medical conditions, allergies, or considerations the coach should know about..."
                    />
                  </div>

                  <div>
                    <SectionHead icon={<FileText className="w-4 h-4 text-[#0066CC]" />}>Liability Waiver</SectionHead>
                    <div className="bg-[#F8FBFF] border border-[#0066CC]/15 p-6 mb-6 max-h-60 overflow-y-auto text-sm text-[#004C97]/70 leading-relaxed space-y-4">
                      <p><strong className="text-[#004C97]">RELEASE AND WAIVER OF LIABILITY — NOOR SPORTS</strong></p>
                      <p>In consideration of my child being permitted to participate in Noor Sports youth soccer programming ("Program"), I, the undersigned parent or legal guardian, hereby agree to the following:</p>
                      <p><strong className="text-[#004C97]">1. Acknowledgment of Risk.</strong> I acknowledge that participation in soccer and related athletic activities involves inherent risks of injury, including but not limited to sprains, fractures, and other physical injuries. I voluntarily accept these risks on behalf of my child.</p>
                      <p><strong className="text-[#004C97]">2. Release of Liability.</strong> I hereby release, waive, discharge, and covenant not to sue Noor Sports, its coaches, volunteers, staff, and affiliates from any and all liability, claims, demands, actions, or causes of action arising out of or related to any loss, damage, or injury that may be sustained by my child while participating in the Program.</p>
                      <p><strong className="text-[#004C97]">3. Medical Authorization.</strong> In the event of an emergency, I authorize Noor Sports staff to seek and authorize medical treatment for my child if I cannot be reached. I accept all financial responsibility for any medical care provided.</p>
                      <p><strong className="text-[#004C97]">4. Photo / Media Release.</strong> I grant Noor Sports permission to photograph and/or video record my child during Program activities for use in promotional and educational materials, including social media and the Noor Sports website.</p>
                      <p><strong className="text-[#004C97]">5. Code of Conduct.</strong> I agree to ensure that my child adheres to Noor Sports' Code of Conduct, including respectful behavior toward coaches, teammates, and opponents. Noor Sports reserves the right to dismiss any participant for conduct that is unsafe or disruptive.</p>
                      <p><strong className="text-[#004C97]">6. Refund Policy.</strong> Tuition is non-refundable after the first week of the session. Requests for refunds or credits due to injury or extenuating circumstances will be reviewed on a case-by-case basis.</p>
                    </div>

                    <div className="bg-white border border-[#0066CC]/20 p-6 space-y-5">
                      <p className="text-sm font-semibold text-[#004C97]">Parent / Legal Guardian Electronic Signature</p>
                      <p className="text-sm text-[#004C97]/70 leading-relaxed">
                        By typing my full legal name below and checking the box, I acknowledge that I have read and understood the Noor Sports Liability Waiver and voluntarily agree to its terms on behalf of myself and the child being registered.
                      </p>
                      <div>
                        <label className={labelClass}>Full Legal Name *</label>
                        <input
                          className={inputClass}
                          type="text"
                          name="waiverSignature"
                          value={form.waiverSignature}
                          onChange={handleChange}
                          placeholder="Type your full legal name here"
                        />
                        <Err msg={errors.waiverSignature} />
                      </div>
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input type="checkbox" name="waiverSigned" checked={form.waiverSigned} onChange={handleChange} className="sr-only" />
                          <div className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${
                            form.waiverSigned ? 'bg-[#0066CC] border-[#0066CC]' : 'bg-white border-[#0066CC]/30 group-hover:border-[#0066CC]'
                          }`}>
                            {form.waiverSigned && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        <span className="text-sm text-[#004C97]/80 leading-relaxed">
                          I agree to the Noor Sports Liability Waiver and confirm I am the parent or legal guardian of the child being registered. *
                        </span>
                      </label>
                      <Err msg={errors.waiverSigned} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0066CC]/10 flex gap-4">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 px-6 py-4 border border-[#0066CC]/30 text-[#0066CC] text-sm hover:border-[#0066CC] hover:bg-[#F8FBFF] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={goNext}
                      className="flex-1 inline-flex items-center justify-center gap-3 bg-[#0066CC] text-white px-8 py-4 text-base tracking-tight relative overflow-hidden group cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <motion.div className="absolute inset-0 bg-[#004C97]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                      <span className="relative z-10 font-medium">Continue to Jersey Order</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ════ STEP 3 — Jersey Order ════ */}
              {step === 3 && (
                <div className="space-y-10">

                  <div>
                    <SectionHead icon={<Shirt className="w-4 h-4 text-[#0066CC]" />}>
                      Jersey &amp; Uniform Selection
                    </SectionHead>

                    {/* Sizing chart alert */}
                    <div className="bg-[#0066CC] text-white px-5 py-4 mb-6 flex items-start gap-3">
                      <Shirt className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#00BFFF]" />
                      <p className="text-sm leading-relaxed">
                        <strong>Please refer to the sizing chart below</strong> before selecting your jersey size. Choosing the correct size ensures your child's jersey fits comfortably for the full season.
                      </p>
                    </div>

                    {/* Sizing chart */}
                    <SizingChart />
                  </div>

                  {/* Jersey size dropdown */}
                  <div>
                    <label className={labelClass}>Jersey Size *</label>
                    <div className="relative">
                      <select
                        className={selectClass}
                        name="jerseySize"
                        value={form.jerseySize}
                        onChange={handleChange}
                      >
                        <option value="">Select a size — refer to chart above</option>
                        <option value="Size 16">Size 16</option>
                        <option value="Size 18">Size 18</option>
                        <option value="Size 20">Size 20</option>
                        <option value="Size 22">Size 22</option>
                        <option value="Size 24">Size 24</option>
                        <option value="Size 26">Size 26</option>
                        <option value="Size 28">Size 28</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0066CC]/40">▾</div>
                    </div>
                    <Err msg={errors.jerseySize} />
                    <div className="mt-2 flex items-start gap-2 bg-[#F0F7FF] border border-[#0066CC]/15 px-4 py-3">
                      <Shirt className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#004C97]/70 leading-relaxed">
                        <strong className="text-[#004C97]">Jersey and shorts are provided as a matching set.</strong> The size you select applies to both pieces — individual sizing for each item is not available.
                      </p>
                    </div>
                  </div>

                  {/* Print name */}
                  <div>
                    <label className={labelClass}>Print Name *</label>
                    <input
                      className={inputClass}
                      type="text"
                      name="jerseyPrintName"
                      value={form.jerseyPrintName}
                      onChange={handleChange}
                      placeholder="e.g. ALEX"
                      maxLength={20}
                    />
                    <Err msg={errors.jerseyPrintName} />
                    <div className="mt-2 flex items-start gap-2 bg-[#F0F7FF] border border-[#0066CC]/15 px-4 py-3">
                      <Shirt className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#004C97]/70 leading-relaxed">
                        <strong className="text-[#004C97]">This is the name that will be printed on the back of your jersey.</strong> Please double-check the spelling — corrections cannot be made after the order is placed.
                      </p>
                    </div>
                  </div>

                  {/* Jersey number */}
                  <div>
                    <SectionHead icon={<Hash className="w-4 h-4 text-[#0066CC]" />}>
                      Jersey Number Selection
                    </SectionHead>

                    <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6 text-sm text-amber-800 leading-relaxed">
                      <strong>Numbers are assigned on a first come, first served basis.</strong> If your first choice number is not available, we will contact you to select an alternate. Please provide a second choice to help us process your order without delay.
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Choice Number *</label>
                        <input
                          className={inputClass}
                          type="text"
                          name="jerseyNumber1"
                          value={form.jerseyNumber1}
                          onChange={handleChange}
                          placeholder="e.g. 10"
                          maxLength={2}
                          inputMode="numeric"
                        />
                        <Err msg={errors.jerseyNumber1} />
                        <p className="text-xs text-[#004C97]/40 mt-1">1–2 digits (0–99)</p>
                      </div>
                      <div>
                        <label className={labelClass}>Second Choice Number *</label>
                        <input
                          className={inputClass}
                          type="text"
                          name="jerseyNumber2"
                          value={form.jerseyNumber2}
                          onChange={handleChange}
                          placeholder="e.g. 7"
                          maxLength={2}
                          inputMode="numeric"
                        />
                        <Err msg={errors.jerseyNumber2} />
                        <p className="text-xs text-[#004C97]/40 mt-1">Must differ from your first choice</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-[#F8FBFF] border-l-4 border-[#0066CC]/40 px-5 py-4 text-xs text-[#004C97]/60 leading-relaxed">
                      If your first choice number is unavailable, we will reach out to the phone number or email provided in Step 1 to confirm your alternate selection before finalizing your jersey order.
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0066CC]/10 flex gap-4">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 px-6 py-4 border border-[#0066CC]/30 text-[#0066CC] text-sm hover:border-[#0066CC] hover:bg-[#F8FBFF] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={goNext}
                      className="flex-1 inline-flex items-center justify-center gap-3 bg-[#0066CC] text-white px-8 py-4 text-base tracking-tight relative overflow-hidden group cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <motion.div className="absolute inset-0 bg-[#004C97]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                      <span className="relative z-10 font-medium">Continue to Payment</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ════ STEP 4 — Payment ════ */}
              {step === 4 && (
                <div className="space-y-10">

                  {/* Amount summary */}
                  <div className="flex items-center justify-between bg-[#F8FBFF] px-6 py-5 border-l-4 border-[#0066CC]">
                    <div>
                      <div className="text-xs tracking-[0.15em] uppercase text-[#0066CC]/50 mb-1">Program Tuition</div>
                      <div className="text-4xl font-semibold text-[#004C97]">$385</div>
                      <div className="text-xs text-red-600 mt-1">$397 for card payments · $385 with verified US bank payment</div>
                    </div>
                    <div className="flex items-center gap-2 text-[#004C97]/30">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs">Secure checkout</span>
                    </div>
                  </div>

                  {/* Loading PaymentIntent */}
                  {piLoading && (
                    <div className="flex items-center justify-center gap-3 py-12 text-[#004C97]/50">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span className="text-sm">Initializing secure payment…</span>
                    </div>
                  )}

                  {/* PaymentIntent error */}
                  {piError && !piLoading && (
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700">
                        <strong>Could not load payment form:</strong> {piError}
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={goBack} className="inline-flex items-center gap-2 px-6 py-4 border border-[#0066CC]/30 text-[#0066CC] text-sm hover:border-[#0066CC] hover:bg-[#F8FBFF] transition-colors cursor-pointer">
                          <ArrowLeft className="w-4 h-4" />Back
                        </button>
                        <button type="button" onClick={() => { setPiError(null); setClientSecret(null); }} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0066CC] text-white px-6 py-4 text-sm cursor-pointer hover:bg-[#004C97] transition-colors">
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Embedded Stripe Payment Element */}
                  {!piLoading && !piError && clientSecret && paymentIntentId && initialQuote && (
                    <Elements
                      stripe={stripePromise}
                      options={{ mode: 'payment', amount: initialQuote.total, currency: 'usd', paymentMethodTypes: ['card', 'us_bank_account'], appearance: stripeAppearance as any }}
                    >
                      <CheckoutForm
                        form={form}
                        paymentIntentId={paymentIntentId}
                        initialQuote={initialQuote}
                        onSuccess={(rid, status, verificationUrl) => {
                          setRegistrationId(rid);
                          setPaymentStatus(status);
                          setHostedVerificationUrl(verificationUrl ?? null);
                          sessionStorage.removeItem('noor-payment-review');
                          setView('success');
                        }}
                        onBack={goBack}
                      />
                    </Elements>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </section>
      )}

    </div>
  );
}
