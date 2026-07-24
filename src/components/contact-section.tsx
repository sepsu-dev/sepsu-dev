"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, ArrowUpRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
  email: string;
  githubUrl?: string;
}

export function ContactSection({ email, githubUrl }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        description: `You can now paste ${email} anywhere.`,
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  return (
    <section id="contact" className="py-12 relative">
      {/* Visual Accent Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[300px] h-[300px] bg-primary/10 rounded-full blur-[90px] opacity-70 animate-pulse-soft"></div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2 shrink-0 font-sans">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Get In Touch</span>
        </h2>
        <div className="h-[1px] flex-1 bg-border/40 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1 mb-8 max-w-xl">
        Have an exciting project, a job opportunity, or just want to chat about development? Feel free to reach out!
      </p>

      <div className="relative group p-6 sm:p-8 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md hover:bg-card/60">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-primary/10 to-purple-500/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-gradient-to-tr from-blue-500/5 to-primary/5 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-40"></div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">
              Let's build something awesome together!
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              I'm always open to discussing new products, backend architectures, front-end designs, or code optimization.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-primary font-semibold mt-4">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
            {/* Email CTA */}
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(var(--primary),0.5)] transition-all group/btn"
            >
              <span>Email Me</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            {/* Copy Email CTA */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border bg-background hover:bg-muted text-sm font-bold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
