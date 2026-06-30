import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { requestOtpThunk, loginThunk } from "@/store/slices/authSlice";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Eye World Opticals" },
      { name: "description", content: "Sign in to Eye World Opticals with your phone number to track orders, manage your wishlist and book eye tests." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ redirect: (s.redirect as string) || "/account" }),
  component: AuthPage,
});

function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const authError = useAppSelector((s) => s.auth.error);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [validationError, setValidationError] = useState("");

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return setValidationError("Enter a valid 10-digit mobile number");
    const code = await dispatch(requestOtpThunk(clean));
    if (code) {
      setSentOtp(code as string);
      setPhone(clean);
      setStep("otp");
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    const ok = await dispatch(loginThunk(phone, otp));
    if (ok) navigate({ to: redirect as any });
  }

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border/60 p-8">
          {step === "otp" && (
            <button onClick={() => { setStep("phone"); setValidationError(""); }} className="text-sm text-muted-foreground inline-flex items-center gap-1 mb-4 hover:text-brand-accent">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-brand-accent/10 flex items-center justify-center mb-3">
              {step === "phone" ? <Phone className="h-6 w-6 text-brand-accent" /> : <ShieldCheck className="h-6 w-6 text-brand-accent" />}
            </div>
            <h1 className="font-display text-2xl font-bold text-brand">
              {step === "phone" ? "Welcome to Eye World" : "Verify your number"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === "phone" ? "Sign in or sign up with your mobile" : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {step === "phone" ? (
            <form onSubmit={sendCode} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Mobile Number</span>
                <div className="mt-1 flex rounded-lg border border-border focus-within:ring-2 focus-within:ring-brand-accent overflow-hidden">
                  <span className="bg-section-muted text-sm px-3 flex items-center text-muted-foreground border-r border-border">+91</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" maxLength={10} placeholder="10-digit mobile" className="flex-1 px-3 py-3 text-sm outline-none" />
                </div>
              </label>
              {validationError && <p className="text-xs text-destructive">{validationError}</p>}
              <button className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors">Send OTP</button>
              <p className="text-[11px] text-center text-muted-foreground">By continuing you agree to our Terms & Privacy</p>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Enter 6-digit OTP</span>
                <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} maxLength={6} inputMode="numeric" placeholder="••••••" className="mt-1 w-full text-center tracking-[0.6em] text-2xl font-bold border border-border rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-brand-accent" />
              </label>
              {sentOtp && <p className="text-[11px] text-center text-muted-foreground">Demo OTP: <span className="font-mono font-semibold text-brand-accent">{sentOtp}</span></p>}
              {authError && <p className="text-xs text-destructive">{authError}</p>}
              <button className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors">Verify & Continue</button>
            </form>
          )}
          <p className="text-xs text-center mt-6 text-muted-foreground">
            Need help? <Link to="/contact" className="text-brand-accent font-medium">Contact us</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
