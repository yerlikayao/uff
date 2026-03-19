import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-border-bold bg-paper-dark">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="bg-pop-coral text-white text-lg font-black tracking-tighter px-2 py-0.5 rounded-md rotate-[-1deg] inline-block mb-3">
              UFF
            </span>
            <p className="text-sm text-ink-light max-w-sm">
              Open source IRS form filling. Your data never leaves your browser.
              Not tax advice &mdash; consult a CPA.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-light">
            <Link href="/forms" className="hover:text-ink transition-colors">Forms</Link>
            <Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
            <a href="https://github.com/yerlikayao/uff" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">GitHub</a>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t-2 border-border/40">
          <p className="text-xs text-ink-muted font-medium">
            &copy; {new Date().getFullYear()} UFF by Onur Yerlikaya. Apache License 2.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
