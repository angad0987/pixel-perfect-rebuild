import { ArrowRight } from "lucide-react";
import eyeglasses from "@/assets/cat-eyeglasses.jpg";
import sunglasses from "@/assets/cat-sunglasses.jpg";
import contacts from "@/assets/cat-contacts.jpg";
import solutions from "@/assets/cat-solutions.jpg";
import kids from "@/assets/cat-kids.jpg";

const items = [
  { name: "Eyeglasses", img: eyeglasses },
  { name: "Sunglasses", img: sunglasses },
  { name: "Contact Lenses", img: contacts },
  { name: "Lens Solutions", img: solutions },
  { name: "Kids Collection", img: kids },
];

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-brand-accent">
      <span className="h-px w-12 bg-brand-accent/40" />
      <span className="text-[10px]">◆</span>
    </div>
  );
}

export function Categories() {
  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-4 mb-10">
          <Divider />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">Shop By Category</h2>
          <Divider />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {items.map((c) => (
            <div key={c.name} className="group bg-section-muted rounded-2xl p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden rounded-xl bg-white mb-3 flex items-center justify-center">
                <img src={c.img} alt={c.name} width={640} height={640} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-display font-bold text-brand text-lg mb-3">{c.name}</h3>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-brand border border-brand/30 rounded-full px-4 py-1.5 hover:bg-brand hover:text-white transition-colors">
                Shop Now <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
