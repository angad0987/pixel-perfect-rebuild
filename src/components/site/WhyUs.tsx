import { Eye, Glasses, ShieldCheck, Award, ArrowRight } from "lucide-react";

const features = [
  { icon: Eye, label: "Comprehensive\nEye Check-up" },
  { icon: Glasses, label: "Latest Frames\n& Designs" },
  { icon: ShieldCheck, label: "100% Authentic\nProducts" },
  { icon: Award, label: "Affordable\nPricing" },
];

export function WhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
        <div>
          <div className="text-xs tracking-[0.25em] text-brand-accent font-medium mb-4">WHY CHOOSE US</div>
          <h2 className="font-display text-4xl font-bold text-brand leading-tight mb-4">
            Clear Vision.<br />Better Life.
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            We combine expertise, technology, and care to give you the best optical experience.
          </p>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-brand border border-brand/30 rounded-full px-5 py-2 hover:bg-brand hover:text-white transition-colors">
            Learn More <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.label} className="text-center group">
              <div className="mx-auto h-20 w-20 rounded-full bg-section-muted flex items-center justify-center mb-4 group-hover:bg-brand transition-colors">
                <f.icon className="h-9 w-9 text-brand-accent group-hover:text-white transition-colors" strokeWidth={1.8} />
              </div>
              <div className="text-sm font-semibold text-brand whitespace-pre-line">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
