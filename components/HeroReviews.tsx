import { CheckCircle2, Network, ShieldCheck } from 'lucide-react';

const cards = [
  { icon: CheckCircle2, title: 'Simple Inquiry', text: 'Tell LSP what you are looking for.' },
  { icon: Network, title: 'Partner Connection', text: 'LSP may connect you with independent Lending Partners.' },
  { icon: ShieldCheck, title: 'Lender Decision', text: 'The Lending Partner determines approval, rates, fees, and terms.' },
];

export default function HeroReviews() {
  return (
    <div className="order-4 lg:order-3 grid grid-cols-1 sm:grid-cols-3 gap-3" id="hero-process-cards">
      {cards.map(({ icon: Icon, title, text }) => (
        <div key={title} className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 shadow-[0_2px_10px_-2px_rgba(29,49,95,0.04)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-af-blue-soft text-af-blue flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs font-extrabold text-af-navy">{title}</p>
          </div>
          <p className="text-[11px] text-pv-muted leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}
