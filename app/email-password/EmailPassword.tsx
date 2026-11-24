"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type Mode = "signup" | "signin"

export default function EmailPasswordDemo() {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = getSupabaseBrowserClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setStatus("Signed out successfully");
  }

  useEffect(() => {
    async function getInitialUser() {
      const { data } = await supabase.auth.getSession();
      setCurrentUser(data.session?.user ?? null);
    }

    getInitialUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode == "signup") {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
        }
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Check your inbox to confirm the new account.");
      }
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Signed in successfully");
      }
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-6">
        {!currentUser && (
          <>
            <form
              className="relative overflow-hidden border p-8 text-slate-700"
              onSubmit={handleSubmit}
            >
              <div
                className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 "
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40"
                aria-hidden="true"
              />
              <div className="absolute inset-x-8 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-700">
                <span>Primary</span>
                <span>Flow</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-700">
                    Credentials
                  </p>
                  <h3 className="text-xl font-semibold text-slate-700">
                    {mode === "signup" ? "Create an account" : "Welcome back"}
                  </h3>
                </div>
                <div className="flex rounded-full border border-slate-300 p-1 text-xs font-semibold text-slate-700">
                  {(["signup", "signin"] as Mode[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={mode === option}
                      onClick={() => setMode(option)}
                      className={`rounded-full px-4 py-1 transition ${mode === option
                        ? "bg-pink-300 text-white shadow shadow-pink-500/20"
                        : "text-slate-700"
                        }`}
                    >
                      {option === "signup" ? "Sign up" : "Sign in"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="mt-2 w-full border border-white/10 bg-slate-200 px-3 py-2.5 text-base text-slate-700 placeholder-slate-500 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    className="mt-2 w-full border border-white/10 bg-slate-200 px-3 py-2.5 text-base text-slate-700 placeholder-slate-500 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    placeholder="At least 6 characters"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center bg-pink-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:bg-slate-600/40"
              >
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
              {status && (
                <p className="mt-4 text-sm text-slate-700" role="status" aria-live="polite">
                  {status}
                </p>
              )}
            </form>
          </>
        )}
        {currentUser && (
          <section className="rounded-xl border border-[#E9E4DE] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#393432]">
              Welcome back!
            </h3>

            <p className="mt-2 text-sm text-[#77706C]">
              You are signed in as {currentUser.email}
            </p>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-6 w-full rounded-lg bg-[#C8796E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#B86B61]"
            >
              Sign out
            </button>
          </section>
        )}
      </div>
    </main>
  );
}