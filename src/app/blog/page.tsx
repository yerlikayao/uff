import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/lib/blog-posts";

const categoryColors: Record<string, string> = {
  guides: "bg-pop-blue text-white",
  explainers: "bg-pop-purple text-white",
  tips: "bg-pop-green text-white",
  scenarios: "bg-pop-coral text-white",
};

export const metadata = {
  title: "Blog — UFF | US Form Filling Guides & Tips",
  description:
    "Practical guides, tips, and explainers for filling IRS tax forms. Built for international founders and small businesses.",
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <Header />

      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-4">
              The UFF Blog.
            </h1>
            <p className="text-lg text-ink-light max-w-lg">
              Practical guides for filling IRS forms. No jargon, no fluff
              &mdash; just what you need to know.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {blogCategories.map((cat) => {
              const count = blogPosts.filter((p) => p.category === cat.id).length;
              return (
                <span
                  key={cat.id}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border-2 border-border-bold ${categoryColors[cat.id]}`}
                >
                  {cat.label}
                  <span className="opacity-70">({count})</span>
                </span>
              );
            })}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card border-2 border-border-bold rounded-xl p-6 shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all group flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-border ${categoryColors[post.category]}`}
                  >
                    {blogCategories.find((c) => c.id === post.category)?.label}
                  </span>
                  <span className="text-[11px] text-ink-muted font-medium">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="font-bold text-[15px] leading-snug mb-2 group-hover:text-pop-coral transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-pop-coral">
                  Read more
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
