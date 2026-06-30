import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlistThunk } from "@/store/slices/wishlistSlice";
import { ConfirmOrderModal } from "@/components/shop/ConfirmOrderModal";
import { WhatsAppIcon } from "@/components/shop/WhatsAppIcon";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "My Wishlist — Eye World Opticals" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);
  const items = PRODUCTS.filter((p) => ids.includes(p.id));
  const [confirmProduct, setConfirmProduct] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand">My Wishlist</h1>
            <p className="text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"} saved</p>
          </div>
          <Link to="/products" className="text-sm text-brand-accent font-medium hover:underline">Continue shopping →</Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border/60 p-16 text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl font-bold text-brand">Your wishlist is empty</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse products and tap the heart to save them here.</p>
            <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-brand-accent text-white px-6 py-2.5 rounded-full text-sm font-medium">
              <ShoppingBag className="h-4 w-4" /> Shop now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-border/60 overflow-hidden group">
                <div className="relative aspect-square bg-section-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <button onClick={() => dispatch(toggleWishlistThunk(p.id))} aria-label="Remove from wishlist" className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center">
                    <Heart className="h-4 w-4 fill-brand-accent text-brand-accent" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-[11px] uppercase font-semibold text-brand-accent">{p.brand}</div>
                  <div className="font-semibold text-brand text-sm truncate">{p.name}</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-brand">₹{p.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
                  </div>
                  <button onClick={() => setConfirmProduct(p)} className="mt-3 w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold py-2 rounded-lg">
                    <WhatsAppIcon className="h-4 w-4" /> Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {confirmProduct && (
        <ConfirmOrderModal
          product={confirmProduct}
          onClose={() => setConfirmProduct(null)}
        />
      )}
    </div>
  );
}
