'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Star, MessageSquareQuote, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Terry Miller',
    title: 'Professional and personable',
    body: 'Phillip was great! He took time to explain everything in detail. He was very professional but also very personable, made us feel like he was a family member. He was not pushy and did not pressure us.',
  },
  {
    name: 'Nelly Pognon-Cooper',
    title: 'Patient and helpful',
    body: 'Ryan was very helpful by explaining the process and what to expect. Ryan was patient and answered all my questions. He always wanted to make sure I was comfortable with the process.',
  },
  {
    name: 'Jackie Mullins',
    title: 'Kind, knowledgeable and empathetic',
    body: 'Hope was kind, friendly, professional, knowledgeable, empathetic and explained everything in detail. I am now on my way to financial freedom. Thank you Hope!',
  },
];

export default function TestimonialGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchDeltaX.current < -50) {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    } else if (touchDeltaX.current > 50) {
      setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  }, []);

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="p-2 rounded-3xl bg-gradient-to-b from-af-blue-soft to-white border border-af-blue-ice shadow-[0_10px_30px_-10px_rgba(29,49,95,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.15)] transition-all duration-300 hover:-translate-y-1 card-hover-bar h-full">
      <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-8 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-1" aria-label="5 star customer review">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <Quote className="w-7 h-7 text-af-blue/20" />
          </div>
          <h3 className="text-base font-extrabold text-af-navy mb-3 leading-snug">&ldquo;{review.title}&rdquo;</h3>
          <p className="text-sm text-pv-muted leading-relaxed">&ldquo;{review.body}&rdquo;</p>
        </div>

        <div className="flex items-center gap-3 border-t border-af-blue-ice/60 pt-4 mt-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-af-navy to-af-blue text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {review.name.charAt(0)}
          </div>
          <div>
            <span className="block text-xs font-bold text-af-navy">{review.name}</span>
            <span className="flex items-center gap-1 text-[11px] text-af-blue font-semibold mt-0.5">
              <MessageSquareQuote className="w-3 h-3" /> Customer Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="customer-testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-trust-green" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">Customer Experiences</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            What Customers Say About Our Team
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            Real customer comments displayed directly on Loan Streamline Pro without third-party review links or live rating widgets.
          </p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {reviews.map((review) => <ReviewCard key={review.name} review={review} />)}
        </div>

        <div className="md:hidden">
          <div className="overflow-hidden rounded-3xl" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {reviews.map((review) => (
                <div key={review.name} className="w-full flex-shrink-0"><ReviewCard review={review} /></div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((review, idx) => (
              <button
                key={review.name}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${idx === activeIndex ? 'bg-af-blue w-5' : 'bg-af-blue-ice w-2'}`}
                aria-label={`Go to customer review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
