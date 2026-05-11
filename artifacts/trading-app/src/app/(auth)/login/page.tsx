"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  // inside your component
  async function handleLogin(e: React.FormEvent) {
    
    // e.preventDefault();
    // setLoading(true);
    // setError("");

    // const supabase = createClient();

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   setError(error.message);
    //   setLoading(false);
    //   return;
    // }

    router.push("/dashboard");
    router.refresh();
  }


  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">
            TradeDesk
          </span>
        </div>

        <div className="bg-bg-card border border-border-dark rounded-2xl p-8">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Sign in to your trading account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-bg-primary border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-primary border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-trade text-xs bg-red-trade/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-semibold transition-colors mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
