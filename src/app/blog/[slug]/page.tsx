import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug, blogCategories } from "@/lib/blog-posts";
import { getFormById } from "@/lib/forms";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — UFF Blog`,
    description: post.excerpt,
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 mb-6">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[15px] text-ink-light leading-relaxed">
              <span className="text-pop-coral font-bold mt-0.5 flex-shrink-0">&bull;</span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const inlineFormat = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="bg-paper-dark px-1.5 py-0.5 rounded text-sm font-mono border border-border">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-display text-2xl md:text-3xl tracking-tight mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-bold text-lg mt-8 mb-3"
        >
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.replace(/^[-*] /, ""));
    } else if (/^\d+\.\s/.test(line)) {
      flushList();
      const match = line.match(/^(\d+)\.\s(.+)/);
      if (match) {
        listItems.push(match[2]);
      }
    } else if (line.startsWith("| ")) {
      flushList();
      // collect table
      const tableLines = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].startsWith("| ")) {
        tableLines.push(lines[j]);
        j++;
      }
      i = j - 1;

      const headerCells = tableLines[0].split("|").filter((c) => c.trim());
      const bodyRows = tableLines.slice(2); // skip header and separator
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-6 border-2 border-border-bold rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-dark border-b-2 border-border-bold">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="text-left px-4 py-2.5 font-bold text-xs uppercase tracking-wide text-ink-muted">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => {
                const cells = row.split("|").filter((c) => c.trim());
                return (
                  <tr key={ri} className="border-b border-border last:border-0">
                    {cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-2.5 text-ink-light"
                        dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }}
                      />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${i}`}
          className="text-[15px] text-ink-light leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }
  }

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedForm = post.relatedForm ? getFormById(post.relatedForm) : null;
  const categoryLabel = blogCategories.find((c) => c.id === post.category)?.label;

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-ink-muted mb-8">
            <Link href="/blog" className="hover:text-ink transition-colors font-medium">
              Blog
            </Link>
            <span>/</span>
            <span className="text-ink-muted">{categoryLabel}</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold bg-paper-dark px-2.5 py-1 rounded-md border-2 border-border text-ink-muted">
                {categoryLabel}
              </span>
              <span className="text-sm text-ink-muted">{post.readingTime} read</span>
              <span className="text-sm text-ink-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.1] mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-ink-light leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Related form callout */}
          {relatedForm && (
            <div className="bg-pop-yellow border-2 border-border-bold rounded-xl p-5 mb-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-ink mb-0.5">
                  Fill {relatedForm.name} with UFF
                </p>
                <p className="text-xs text-ink-light">
                  {relatedForm.fullName}
                </p>
              </div>
              <Link
                href={`/forms/${relatedForm.id}`}
                className="flex-shrink-0 text-sm font-bold bg-ink text-white px-4 py-2 rounded-lg border-2 border-border-bold shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
              >
                Fill Now
              </Link>
            </div>
          )}

          {/* Content */}
          <div className="prose-uff">{renderMarkdown(post.content)}</div>

          {/* GitHub callout */}
          <div className="mt-16 bg-paper-dark border-2 border-border-bold rounded-xl p-6 text-center">
            <p className="text-sm font-bold mb-1">UFF is open source</p>
            <p className="text-xs text-ink-muted mb-4">
              View the source code, report issues, or contribute on GitHub.
            </p>
            <a
              href="https://github.com/yerlikayao/uff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold bg-ink text-white px-5 py-2.5 rounded-lg border-2 border-border-bold shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl mb-6">Related articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="bg-card border-2 border-border-bold rounded-xl p-5 shadow-brutal-static hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all group"
                  >
                    <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-pop-coral transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-[11px] text-ink-muted line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
}
