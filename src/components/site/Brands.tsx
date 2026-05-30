import { ArrowRight } from "lucide-react";

const brands = ["Ray-Ban", "OAKLEY", "vogue", "TITAN", "fastrack", "Crizal"];

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-brand-accent">
      <span className="h-px w-12 bg-brand-accent/40" />
      <span className="text-[10px]">◆</span>
    </div>
  );
}

export function Brands() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-4 mb-10">
          <Divider />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">Our Top Brands</h2>
          <Divider />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center mb-10">
          {brands.map((b) => (
            <div key={b} className="text-center font-display font-bold text-2xl text-foreground/80 hover:text-brand-accent transition-colors cursor-pointer">
              {b}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 bg-brand text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-brand-accent transition-colors">
            View All Brands <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
