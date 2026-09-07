'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';
import { analytics } from '@/lib/analytics';

export default function BlogPreview() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const articles = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    analytics.newsletterEmailSubmit();
    try {
      await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'lsp_blog_preview' }),
      });
    } catch {}
    setSubscribed(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="blog-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-xs mb-4">
              <BookOpen className="w-3.5 h-3.5 text-af-blue" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">LSP Resource Center</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Helpful Financial Resources</h2>
            <p className="text-base sm:text-lg text-pv-muted mt-3 max-w-xl">Educational articles from Loan Streamline Pro to help consumers better understand common financial topics and questions.</p>
          </div>
          <Link href="/blog" onClick={() => analytics.blogViewAllClick()} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-af-blue-ice hover:border-af-blue/40 text-af-navy hover:text-af-blue font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200">
            Explore All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="group p-2 rounded-3xl bg-gradient-to-b from-white to-white/80 border border-white shadow-[0_10px_30px_-10px_rgba(29,49,95,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.18)] transition-all duration-300 hover:-translate-y-1">
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 overflow-hidden flex flex-col h-full">
                <Link href={`/blog/${article.slug}`} onClick={() => analytics.blogArticleClick({ slug: article.slug, title: article.title, category: article.category })} className="block relative h-52 w-full overflow-hidden bg-af-blue-soft">
                  <Image src={article.heroImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </Link>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-pv-muted font-mono mb-3"><Clock className="w-3.5 h-3.5 text-af-blue" />{article.readTime}<span>•</span><span>{article.publishedAt}</span></div>
                    <h3 className="text-lg font-bold text-af-navy leading-snug">{article.title}</h3>
                    <p className="text-xs sm:text-sm text-pv-muted leading-relaxed mt-3 line-clamp-3">{article.excerpt}</p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-af-blue-ice/60 flex items-center justify-between">
                    <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-af-blue">Read Article <ArrowRight className="w-4 h-4" /></Link>
                    <span className="text-[10px] text-pv-muted uppercase font-bold tracking-wider">Loan Streamline Pro</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-af-navy via-af-navy-deep to-[#142345] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold"><Sparkles className="w-3.5 h-3.5 text-af-red" />Free Resource Updates</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Get New LSP Resources in Your Inbox</h3>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed">Occasional educational content and updates from Loan Streamline Pro.</p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-trust-green/20 border border-trust-green/40 rounded-2xl p-5 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-trust-green" /><span className="text-sm font-bold">You&apos;re subscribed.</span></div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full px-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-af-blue-cyan" />
                  <button type="submit" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-af-red to-[#E63935] text-white font-bold text-sm whitespace-nowrap">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
