import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductModal } from "@/components/shop/ProductModal";
import { WhatsAppFloat } from "@/components/shop/WhatsAppFloat";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Eyewear — Eye World Opticals" },
      { name: "description", content: "Browse premium eyeglasses, sunglasses, and contact lenses. Order directly on WhatsApp." },
      { property: "og:title", content: "Shop Eyewear — Eye World Opticals" },
      { property: "og:description", content: "Premium eyewear from Ray-Ban, Oakley, Vogue, Titan and more." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [filters, setFilters] = useState<any>({ price: [0, 10000] });
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [quick, setQuick] = useState<any>(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (query && !`${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.Category?.length && !filters.Category.includes(p.category)) return false;
      if (filters.Brand?.length && !filters.Brand.includes(p.brand)) return false;
      if (filters.Gender?.length && !filters.Gender.includes(p.gender)) return false;
      if (filters["Frame Shape"]?.length && !filters["Frame Shape"].includes(p.frameShape)) return false;
      if (filters["Frame Material"]?.length && !filters["Frame Material"].includes(p.frameMaterial)) return false;
      if (filters.Color?.length && !p.colors.some((c) => filters.Color.includes(c))) return false;
      if (filters.Rating?.length && !filters.Rating.some((r: number) => p.rating >= r)) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.price && (p.price < filters.price[0] || p.price > filters.price[1])) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort, query]);

  return (
    <div className="min-h-screen bg-section-muted font-sans">
      <TopBar />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand">Shop Eyewear</h1>
          <p className="text-sm text-muted-foreground mt-1">Premium frames, sunglasses & lenses — order on WhatsApp in seconds.</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-border/70 p-3 md:p-4 flex flex-wrap items-center gap-3 mb-6 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-section-muted border border-transparent focus:bg-white focus:border-brand-accent outline-none text-sm" />
          </div>
          <button onClick={() => setOpenMobile(true)} className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <div className="text-sm text-muted-foreground hidden sm:block">
            <span className="font-semibold text-brand">{filtered.length}</span> products
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-section-muted border border-transparent text-sm focus:border-brand-accent outline-none">
            <option value="popular">Sort: Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          <div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-border/70">
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuick} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpenMobile(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-bold text-brand">Filters</h3>
              <button onClick={() => setOpenMobile(false)} className="h-9 w-9 rounded-full border border-border flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}

      {quick && <ProductModal product={quick} onClose={() => setQuick(null)} />}
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
