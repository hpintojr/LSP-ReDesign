'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';

const WORDS = [
  { text: 'personal loan options', highlight: 'from-af-blue to-af-blue-cyan' },
  { text: 'consolidation options', highlight: 'from-af-blue-cyan to-af-blue' },
  { text: 'Lending Partners', highlight: 'from-af-navy to-af-blue' },
  { text: 'a clearer next step', highlight: 'from-[#059669] to-trust-green' },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function TypewriterHeader() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(WORDS[0].text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Reduced-motion still rotates content, but without character-by-character typing.
  useEffect(() => {
    if (!prefersReducedMotion) return;

    setDisplayedText(WORDS[currentWordIndex].text);
    const timer = setTimeout(() => {
      setCurrentWordIndex((index) => (index + 1) % WORDS.length);
    }, 2800);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, currentWordIndex]);

  // Standard typewriter behavior.
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (!isStarted) {
      const initialDelay = setTimeout(() => {
        setIsDeleting(true);
        setIsStarted(true);
      }, 2200);
      return () => clearTimeout(initialDelay);
    }

    const fullWord = WORDS[currentWordIndex].text;
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(
          () => setDisplayedText(fullWord.substring(0, displayedText.length - 1)),
          35
        );
      } else {
        timer = setTimeout(() => {
          const nextIndex = (currentWordIndex + 1) % WORDS.length;
          setCurrentWordIndex(nextIndex);
          setIsDeleting(false);
        }, 80);
      }
    } else if (displayedText.length < fullWord.length) {
      timer = setTimeout(
        () => setDisplayedText(fullWord.substring(0, displayedText.length + 1)),
        60
      );
    } else {
      timer = setTimeout(() => setIsDeleting(true), 1900);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, prefersReducedMotion, isStarted]);

  const currentHighlight = WORDS[currentWordIndex].highlight;

  return (
    <div id="hero-headline-container">
      <h1
        className="font-display text-[38px] sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.03em] text-af-navy leading-[1.08] min-h-[104px] sm:min-h-[120px] lg:min-h-[140px] overflow-visible"
        id="typewriter-h1"
      >
        Streamline your path to
        <br />
        <span className="inline-block relative mt-1">
          <span
            className={`bg-gradient-to-r ${currentHighlight} bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm`}
            id="typed-text-span"
          >
            {displayedText}
          </span>
          {!prefersReducedMotion && (
            <span
              className="inline-block w-1 sm:w-1.5 h-[80%] bg-af-blue align-middle ml-1 rounded-full animate-pulse"
              style={{ animationDuration: '0.85s' }}
              id="cursor-blink"
            />
          )}
        </span>
      </h1>
    </div>
  );
}
