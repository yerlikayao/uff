"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-border-bold bg-paper sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-pop-coral text-white text-xl font-black tracking-tighter px-2.5 py-0.5 rounded-md rotate-[-1deg] inline-block">
            UFF
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/#forms"
            className="text-sm font-semibold text-ink px-3 py-1.5 rounded-md hover:bg-paper-dark transition-colors"
          >
            Forms
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-ink px-3 py-1.5 rounded-md hover:bg-paper-dark transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-ink px-3 py-1.5 rounded-md hover:bg-paper-dark transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold text-ink px-3 py-1.5 rounded-md hover:bg-paper-dark transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/forms"
            className="ml-2 text-sm font-bold bg-pop-yellow text-ink border-2 border-border-bold px-4 py-1.5 rounded-lg shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
          >
            Start Filling
          </Link>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t-2 border-border-bold bg-paper px-6 py-5 space-y-3">
          <Link href="/#forms" className="block text-sm font-semibold py-1" onClick={() => setMenuOpen(false)}>Forms</Link>
          <Link href="/#how-it-works" className="block text-sm font-semibold py-1" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link href="/pricing" className="block text-sm font-semibold py-1" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/blog" className="block text-sm font-semibold py-1" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link
            href="/forms"
            className="block text-sm font-bold bg-pop-yellow text-ink border-2 border-border-bold px-4 py-2.5 rounded-lg text-center shadow-brutal-sm mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Start Filling
          </Link>
        </div>
      )}
    </header>
  );
}
