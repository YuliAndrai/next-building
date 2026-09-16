"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Subtle glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-red-950/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-3">
          {"// THE INNER CIRCLE"}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
          JOIN THE RITUAL
        </h2>
        <p className="mt-4 text-xs sm:text-sm uppercase tracking-widest text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
          Subscribe for exclusive tour pre-sale codes, unreleased edits, private pop-up locations, and limited capsule drops.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 text-neutral-200 inline-flex items-center gap-3 text-xs uppercase tracking-widest font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>YOU ARE REGISTERED IN THE INNER CIRCLE. CHECK YOUR INBOX SOON.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-neutral-800 text-xs uppercase tracking-widest text-white pl-10 pr-4 py-3.5 focus:outline-none focus:border-white placeholder:text-neutral-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-lg"
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] uppercase font-mono tracking-widest text-neutral-600">
          WE RESPECT YOUR PRIVACY. ZERO SPAM. ONLY PURE TRANSMISSIONS.
        </p>
      </div>
    </section>
  );
}
