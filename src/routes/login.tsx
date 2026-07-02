/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Phone, LogIn } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginThunk, clearError } from "@/store/slices/authSlice";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Eye World Opticals" },
      {
        name: "description",
        content:
          "Sign in to Eye World Opticals to track orders, manage your wishlist and book eye tests.",
      },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: (s.redirect as string) || "/account",
  }),
  component: LoginPage,
});

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const authError = useAppSelector((s) => s.auth.error);
  const loading = useAppSelector((s) => s.auth.loading);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");
    dispatch(clearError());

    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return setValidationError("Enter a valid 10-digit mobile number");
    if (!password) return setValidationError("Enter your password");

    const ok = await dispatch(loginThunk(clean, password));
    if (ok) navigate({ to: redirect as any });
  }

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border/60 p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-brand-accent/10 flex items-center justify-center mb-3">
              <LogIn className="h-6 w-6 text-brand-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-brand">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <span className="text-xs font-medium text-foreground">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full border border-border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </label>

            {(validationError || authError) && (
              <p className="text-xs text-destructive">{validationError || authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            New user?{" "}
            <Link to="/signup" className="text-brand-accent font-medium hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-xs text-center mt-4 text-muted-foreground">
            Need help?{" "}
            <Link to="/contact" className="text-brand-accent font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
