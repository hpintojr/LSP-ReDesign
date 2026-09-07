import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug } from '@/data/blogPosts';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-af-navy flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-af-blue-ice/80 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-pv-muted hover:text-af-blue transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>LSP Resource Center</span>
          </Link>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-af-blue bg-af-blue-soft px-3 py-1 rounded-full border border-af-blue-ice">{post.category}</span>
        </div>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <header className="space-y-6 mb-10">
          <div className="flex items-center gap-3 text-xs text-pv-muted font-mono">
            <span>{post.publishedAt}</span><span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-af-blue" />{post.readTime}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-[1.15]">{post.title}</h1>
          <p className="text-lg sm:text-xl text-pv-muted leading-relaxed">{post.subtitle}</p>

          <div className="pt-5 border-t border-af-blue-ice/70 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-af-blue-ice bg-white p-1.5">
              <Image src={post.author.avatar} alt="Loan Streamline Pro" fill className="object-contain p-1" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-af-navy block">{post.author.name}</span>
              <span className="text-xs text-pv-muted">{post.author.role}</span>
            </div>
          </div>
        </header>

        <figure className="mb-12 rounded-3xl overflow-hidden bg-af-blue-soft border border-af-blue-ice/80 shadow-md">
          <div className="relative h-72 sm:h-96 lg:h-[450px] w-full">
            <Image src={post.heroImage} alt={post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
          </div>
          {post.imageCaption && <figcaption className="p-3.5 bg-white text-center text-xs text-pv-muted italic">{post.imageCaption}</figcaption>}
        </figure>

        <aside className="mb-12 rounded-2xl bg-gradient-to-br from-af-blue-soft to-white border border-af-blue/20 p-6 sm:p-8 shadow-xs">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-af-navy mb-4">Key Takeaways</h2>
          <ul className="space-y-2.5 text-sm text-af-navy">
            {post.keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-2.5 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-trust-green flex-shrink-0 mt-0.5" /><span>{takeaway}</span></li>
            ))}
          </ul>
        </aside>

        <article className="space-y-10 text-af-navy leading-relaxed">
          <p className="text-lg sm:text-xl font-medium">{post.content.intro}</p>

          {post.content.sections.map((section) => (
            <section key={section.heading} className="space-y-5 pt-4 border-t border-af-blue-ice/50">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight">{section.heading}</h2>
                {section.subheading && <p className="mt-1 text-sm font-semibold text-af-blue">{section.subheading}</p>}
              </div>

              {section.body.map((paragraph) => <p key={paragraph} className="text-base text-pv-muted leading-7">{paragraph}</p>)}

              {section.highlightBox && (
                <div className="rounded-2xl border border-af-blue-ice bg-af-blue-soft/60 p-5">
                  <strong className="block text-sm text-af-navy">{section.highlightBox.title}</strong>
                  <p className="text-sm text-pv-muted mt-2">{section.highlightBox.text}</p>
                </div>
              )}

              {section.table && (
                <div className="overflow-hidden rounded-2xl border border-af-blue-ice bg-white">
                  {section.table.caption && <div className="bg-af-navy text-white px-5 py-3 text-xs font-bold uppercase tracking-wider">{section.table.caption}</div>}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-af-blue-soft border-b border-af-blue-ice">
                        <tr>{section.table.headers.map((header) => <th key={header} className="px-4 py-3 font-extrabold text-af-navy">{header}</th>)}</tr>
                      </thead>
                      <tbody>{section.table.rows.map((row, index) => <tr key={index} className="border-b border-af-blue-ice/50 last:border-b-0">{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`} className="px-4 py-3 text-pv-muted">{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </div>
              )}

              {section.quote && <blockquote className="border-l-4 border-af-blue pl-5 py-2 text-lg italic text-af-navy">“{section.quote.text}”<footer className="text-xs text-pv-muted mt-2 not-italic">— {section.quote.cite}</footer></blockquote>}
            </section>
          ))}

          <div className="rounded-2xl bg-af-navy text-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-extrabold">In Summary</h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">{post.content.conclusion}</p>
          </div>

          <div className="rounded-2xl border border-af-blue-ice bg-white p-5 flex items-start gap-3 text-xs text-pv-muted">
            <ShieldCheck className="w-5 h-5 text-af-blue flex-shrink-0" />
            <p><strong className="text-af-navy">Educational content only.</strong> Loan Streamline Pro is a technology service, not a lender. This article is general information and is not a loan offer or individualized financial, legal, or tax advice. Any actual product, approval, rate, fee, or term is determined by the applicable independent Lending Partner.</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
