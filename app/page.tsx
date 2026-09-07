import React from 'react';
import Navbar from '../components/Navbar';
import TypewriterHeader from '../components/TypewriterHeader';
import BenefitChecklist from '../components/BenefitChecklist';
import SavingsEstimator from '../components/SavingsEstimator';
import StatsRow from '../components/StatsRow';
import LoanSolutionsGrid from '../components/LoanSolutionsGrid';
import ProcessSteps from '../components/ProcessSteps';
import LenderComparisonTable from '../components/LenderComparisonTable';
import TrustBar from '../components/TrustBar';
import BlogPreview from '../components/BlogPreview';
import TestimonialGrid from '../components/TestimonialGrid';
import HeroReviews from '../components/HeroReviews';
import HeroBadges from '../components/HeroBadges';
import FaqAccordion from '../components/FaqAccordion';
import ClosingCta from '../components/ClosingCta';
import Footer from '../components/Footer';
import ScrollDepthTracker from '../components/ScrollDepthTracker';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="app-wrapper">
      <Navbar />

      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-14 sm:pb-16 lg:pt-18 lg:pb-20 bg-mesh-hero" id="hero-split-section">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left h-full self-stretch" id="hero-left-content">
              <HeroBadges />

              <div className="order-1 lg:order-1 flex flex-col gap-3 mt-2">
                <TypewriterHeader />
                <p className="text-base sm:text-lg lg:text-xl text-pv-muted max-w-[54ch] leading-relaxed" id="hero-subtext">
                  Loan Streamline Pro helps you explore financial options by connecting you with independent Lending Partners. <strong className="text-af-navy font-bold">LSP is not a lender</strong> and does not make credit decisions, set rates, or determine eligibility.
                </p>
                <BenefitChecklist />
              </div>

              <div className="order-2 lg:order-5 pt-4 flex flex-wrap items-center justify-center gap-6 text-[14px] sm:text-xs font-semibold text-pv-muted border-t border-af-blue-ice/60">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-trust-green" />
                  <span>No Fee Charged by LSP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-af-blue" />
                  <span>Simple Online Inquiry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-af-red" />
                  <span>Independent Lending Partners</span>
                </div>
              </div>

              <HeroReviews />
            </div>

            <div className="lg:col-span-5" id="estimator-anchor">
              <div className="w-full transform transition-all duration-300 hover:shadow-2xl" id="estimator-card-container">
                <SavingsEstimator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsRow />
      <LenderComparisonTable />
      <ProcessSteps />
      <LoanSolutionsGrid />
      <TrustBar />
      <TestimonialGrid />
      <BlogPreview />
      <FaqAccordion />
      <ClosingCta />
      <Footer />
      <ScrollDepthTracker />
    </div>
  );
}
