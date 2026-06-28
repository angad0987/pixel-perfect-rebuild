import { ArrowRight } from "lucide-react";
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
        <div className="grid grid-cols-3 md:grid-cols-9 gap-4 items-center mb-10">
          {brands.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="h-16 w-full flex items-center justify-center bg-gray-50 rounded-lg p-2 group-hover:shadow-md transition-shadow">
                <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight group-hover:text-brand-accent transition-colors">{b.name}</span>
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
