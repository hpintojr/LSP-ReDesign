'use client';

import { useState, useRef, useCallback } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

const reviews = [
  {
    name: 'Jenny Benda',
    title: 'Kind, helpful guidance',
    body: 'I have been wanting to start this process for years, and Ryan was so helpful. I was able to come to terms with how much I owed and how much I was paying. I am so thankful for the kind help!',
  },
  {
    name: 'Sonia Allen',
    title: 'Attentive and informative',
    body: 'Ryan Lopes is the absolute best. Not only is he attentive and informative, he truly shows that he cares about his customers as people. He is always quickly available to answer questions and explains things clearly and thoroughly.',
  },
  {
    name: 'Bri',
    title: 'Knowledgeable and honest',
    body: 'Eric was extremely knowledgeable and honest. Speaking about finances can be stressful, but he provided great service and allowed me to feel calm and comfortable.',
  },
  {
    name: 'Penny Belcher',
    title: 'Compassionate from the start',
    body: 'Ryan Lopes was awesome. He made us not feel like failures, thoroughly explained the entire process, and answered our questions clearly. His compassion was awesome.',
  },
];

export default function HeroReviews() {
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

  const ReviewCard = ({ review, idx }: { review: typeof reviews[0]; idx: number }) => (
    <div
      className="group block p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 shadow-[0_2px_10px_-2px_rgba(29,49,95,0.04)] hover:shadow-[0_8px_20px_-4px_rgba(15,117,188,0.12)] transition-all duration-200 hover:-translate-y-0.5 card-hover-bar"
      id={`hero-review-${idx + 1}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5" aria-label="5 star customer review">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-af-blue bg-af-blue-soft px-2 py-0.5 rounded-full">
          <MessageSquareQuote className="w-3 h-3" /> Customer Review
        </span>
      </div>
      <p className="text-xs font-bold text-af-navy leading-snug mb-1">&ldquo;{review.title}&rdquo;</p>
      <p className="text-[11px] text-pv-muted leading-relaxed line-clamp-2">{review.body}</p>
      <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-af-blue-ice/60">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-af-navy to-af-blue text-white flex items-center justify-center text-[10px] font-bold">
          {review.name.charAt(0)}
        </div>
        <span className="text-[10px] font-semibold text-pv-muted">{review.name}</span>
      </div>
    </div>
  );

  return (
    <div className="order-4 lg:order-3" id="hero-customer-reviews">
      <div className="hidden sm:grid grid-cols-2 gap-3">
        {reviews.map((review, idx) => <ReviewCard key={review.name} review={review} idx={idx} />)}
      </div>

      <div className="sm:hidden">
        <div
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {reviews.map((review, idx) => (
              <div key={review.name} className="w-full flex-shrink-0">
                <ReviewCard review={review} idx={idx} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-3">
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
  );
}
