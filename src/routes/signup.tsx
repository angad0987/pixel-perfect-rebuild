import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ShieldCheck, ArrowLeft, User, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  sendOtpThunk,
  verifyOtpThunk,
  createAccountThunk,
  setSignupData,
  resetOtpFlow,
  clearError,
} from "@/store/slices/authSlice";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Eye World Opticals" },
      {
        name: "description",
        content:
          "Create your Eye World Opticals account to track orders, save your wishlist and book eye tests.",
      },
    ],
  }),
  component: SignupPage,
});

const RESEND_COOLDOWN = 40;

function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector((s) => s.auth.error);
  const loading = useAppSelector((s) => s.auth.loading);
  const otpVerified = useAppSelector((s) => s.auth.otpVerified);

  const [step, setStep] = useState<"form" | "otp">("form");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (step === "otp" && !otpVerified) {
      setResendTimer(RESEND_COOLDOWN);
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [step, otpVerified]);

  function goBack() {
    dispatch(resetOtpFlow());
    dispatch(clearError());
    clearInterval(timerRef.current);
    setStep("form");
    setOtp("");
    setResendTimer(0);
    setValidationError("");
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");
    dispatch(clearError());

    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return setValidationError("Enter a valid 10-digit mobile number");
    if (!name.trim()) return setValidationError("Enter your name");
    if (password.length < 6) return setValidationError("Password must be at least 6 characters");
    if (password !== confirmPassword) return setValidationError("Passwords do not match");

    dispatch(setSignupData({ phone: clean, name: name.trim(), password }));
    const ok = await dispatch(sendOtpThunk(clean));
    if (ok) setStep("otp");
  }

  async function handleVerifyOtp() {
    setValidationError("");
    dispatch(clearError());

    if (otp.length < 6) return setValidationError("Enter the 6 digit OTP code");

    const clean = phone.replace(/\D/g, "");
    await dispatch(verifyOtpThunk(clean, otp));
  }

  async function handleResendOtp() {
    setValidationError("");
    dispatch(clearError());
    setOtp("");

    const clean = phone.replace(/\D/g, "");
    const ok = await dispatch(sendOtpThunk(clean));
    if (ok) setResendTimer(RESEND_COOLDOWN);
  }

  async function handleCreateAccount() {
    setValidationError("");
    dispatch(clearError());

    const ok = await dispatch(createAccountThunk());
    if (ok) navigate({ to: "/account" });
  }

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border/60 p-8">
          {step === "otp" && (
            <button
              onClick={goBack}
              className="text-sm text-muted-foreground inline-flex items-center gap-1 mb-4 hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}

          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-brand-accent/10 flex items-center justify-center mb-3">
              {step === "form" ? (
                <User className="h-6 w-6 text-brand-accent" />
              ) : otpVerified ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <ShieldCheck className="h-6 w-6 text-brand-accent" />
              )}
            </div>
            <h1 className="font-display text-2xl font-bold text-brand">
              {step === "form"
                ? "Create Account"
                : otpVerified
                  ? "Phone Verified"
                  : "Verify your number"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === "form"
                ? "Join Eye World Opticals"
                : otpVerified
                  ? `+91 ${phone.replace(/\D/g, "")}`
                  : `OTP sent to +91 ${phone.replace(/\D/g, "")}`}
            </p>
          </div>

          {step === "form" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Mobile Number</span>
                <div className="mt-1 flex rounded-lg border border-border focus-within:ring-2 focus-within:ring-brand-accent overflow-hidden">
                  <span className="bg-section-muted text-sm px-3 flex items-center text-muted-foreground border-r border-border">
                    +91
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    className="flex-1 px-3 py-3 text-sm outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-foreground">Full Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your full name"
                  className="mt-1 w-full border border-border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-foreground">Password</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Min 6 characters"
                  className="mt-1 w-full border border-border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-foreground">Confirm Password</span>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter your password"
                  className="mt-1 w-full border border-border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </label>

              {validationError && <p className="text-xs text-destructive">{validationError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : otpVerified ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                <CheckCircle className="h-5 w-5 shrink-0" />
                OTP verified successfully
              </div>

              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="w-full bg-brand hover:bg-brand-accent text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Enter 6-digit OTP</span>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  inputMode="numeric"
                  placeholder="••••••"
                  className="mt-1 w-full text-center tracking-[0.6em] text-2xl font-bold border border-border rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </label>

              <p className="text-[11px] text-center text-muted-foreground">
                Demo OTP: <span className="font-mono font-semibold text-brand-accent">123456</span>
              </p>

              {(authError || validationError) && (
                <p className="text-xs text-destructive">{authError || validationError}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 6}
                className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <span className="text-xs text-muted-foreground">
                    Resend OTP in{" "}
                    <span className="font-semibold text-brand-accent">{resendTimer}s</span>
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-xs text-brand-accent font-medium hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {step === "form" && (
            <>
              <p className="text-sm text-center mt-6 text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  search={{ redirect: "/account" }}
                  className="text-brand-accent font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-xs text-center mt-4 text-muted-foreground">
                By continuing you agree to our Terms & Privacy
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
