"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AuthDemoPageProps = {
  title?: string;
  intro: string;
  steps: string[];
  children: ReactNode;
};

export function AuthDemoPage({
  intro,
  steps,
  children,
}: AuthDemoPageProps) {
  return (
    <div className="flex min-h-screen flex-col text-slate-100">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-800"
          >
            → Back home 
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-white/10 p-8">
            <p className="text-lg font-medium text-slate-700">{intro}</p>
            <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
}