import { ArrowRight, Sparkles } from "lucide-react";
import tommyLogo from "@/assets/brands/tommy-hilfiger.png";
import scottLogo from "@/assets/brands/scott.png";
import opiumLogo from "@/assets/brands/opium.png";
import hashtagLogo from "@/assets/brands/hashtag.png";
import tagHillLogo from "@/assets/brands/tag-hill.png";
import henryCarterLogo from "@/assets/brands/henry-carter.png";
import sorrentoLogo from "@/assets/brands/sorrento.png";
import danielParkerLogo from "@/assets/brands/daniel-parker.png";
import rosvinBugLogo from "@/assets/brands/rosvin-bug.png";

const brands = [
  { name: "Tommy Hilfiger", logo: tommyLogo },
  { name: "Scott", logo: scottLogo },
  { name: "Opium", logo: opiumLogo },
  { name: "Hashtag", logo: hashtagLogo },
  { name: "Tag Hill", logo: tagHillLogo },
  { name: "Henry Carter", logo: henryCarterLogo },
  { name: "Sorrento", logo: sorrentoLogo },
  { name: "Daniel Parker", logo: danielParkerLogo },
  { name: "Rosvin Bug", logo: rosvinBugLogo },
];

export function Brands() {
  // Duplicate for seamless infinite marquee
  const loop = [...brands, ...brands];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-section-muted to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5" /> Premium Brands
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold text-brand">Designer Eyewear, Curated.</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">100% authentic frames from the world's most loved brands — backed by our authenticity guarantee.</p>
        </div>

        {/* Premium marquee with edge fade */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-section-muted to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-section-muted to-transparent z-10" />
          <div className="ew-marquee flex gap-5 py-2">
            {loop.map((b, i) => (
              <div key={`${b.name}-${i}`} className="group shrink-0 w-[180px] sm:w-[220px]">
                <div className="h-28 sm:h-32 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-6 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/0 group-hover:from-brand-accent/5 group-hover:to-transparent transition-colors" />
                  <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-brand-accent transition-colors">{b.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-brand-accent transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Explore All Brands <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ew-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ew-marquee {
          width: max-content;
          animation: ew-marquee-scroll 40s linear infinite;
        }
        .ew-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ew-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
