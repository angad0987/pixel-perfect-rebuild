import { Star } from "lucide-react";
import { FILTERS } from "@/lib/products";

export function FilterSidebar({ filters, setFilters }: any) {
  const toggle = (group: string, value: string) => {
    setFilters((prev: any) => {
      const set = new Set(prev[group] || []);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [group]: Array.from(set) };
    });
  };

  const colors = ["#111111", "#7a4a2a", "#1e3a5f", "#c9a84c", "#b5b5b5", "#e85d3a", "#e0a8c0"];

  return (
    <aside className="bg-white rounded-2xl border border-border/70 p-5 space-y-6 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-brand">Filters</h3>
        <button onClick={() => setFilters({ price: [0, 10000] })} className="text-xs text-brand-accent hover:underline">Clear all</button>
      </div>

      {Object.entries(FILTERS).map(([group, opts]) => (
        <div key={group}>
          <h4 className="font-semibold text-brand mb-2">{group}</h4>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {(opts as string[]).map((o) => (
              <label key={o} className="flex items-center gap-2 cursor-pointer hover:text-brand-accent">
                <input type="checkbox" checked={filters[group]?.includes(o) || false} onChange={() => toggle(group, o)}
                  className="accent-[var(--brand-accent)]" />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h4 className="font-semibold text-brand mb-2">Price Range</h4>
        <input type="range" min={0} max={10000} step={500}
          value={filters.price?.[1] ?? 10000}
          onChange={(e) => setFilters((p: any) => ({ ...p, price: [0, +e.target.value] }))}
          className="w-full accent-[var(--brand-accent)]" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹0</span><span>₹{(filters.price?.[1] ?? 10000).toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-brand mb-2">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const active = filters.Color?.includes(c);
            return (
              <button key={c} onClick={() => toggle("Color", c)} aria-label={c}
                style={{ background: c }}
                className={`h-7 w-7 rounded-full border-2 transition-all ${active ? "border-brand-accent ring-2 ring-brand-accent/30 scale-110" : "border-border"}`} />
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-brand mb-2">Rating</h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer hover:text-brand-accent">
              <input type="checkbox" checked={filters.Rating?.includes(r) || false} onChange={() => toggle("Rating", r as any)} className="accent-[var(--brand-accent)]" />
              <span className="flex items-center">{Array.from({ length: r }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />))} & up</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-brand mb-2">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!filters.inStockOnly} onChange={(e) => setFilters((p: any) => ({ ...p, inStockOnly: e.target.checked }))} className="accent-[var(--brand-accent)]" />
          <span>In stock only</span>
        </label>
      </div>
    </aside>
  );
}
