"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required");
        return;
      }
      if (password.length < 4) {
        setError("Password must be at least 4 characters");
        return;
      }
      const ok = signup(name.trim(), email.trim(), password);
      if (!ok) {
        setError("An account with this email already exists");
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError("All fields are required");
        return;
      }
      const ok = login(email.trim(), password);
      if (!ok) {
        setError("Invalid email or password");
        return;
      }
    }

    router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 animate-fade-in-up">
          <div className="mb-8 text-center">
            <img src="/logo.png" alt="TradeFlow" className="mx-auto h-14 w-14 rounded-xl object-cover shadow-lg shadow-[var(--primary-glow)]" />
            <h1 className="mt-4 text-2xl font-bold gradient-text">TradeFlow</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {isSignup ? "Create your account" : "Welcome back! Sign in to continue"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="mb-1 block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--primary-glow)] hover:shadow-xl hover:shadow-[var(--primary-glow)] transition-all"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => { setIsSignup(!isSignup); setError(""); }}
              className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {!isSignup && (
            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              Demo: use any email and password (min 4 chars) after signing up
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
