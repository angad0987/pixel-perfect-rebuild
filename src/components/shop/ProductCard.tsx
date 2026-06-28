import { Heart, Eye, Star } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { buildWhatsAppOrderLink } from "@/lib/products";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: any;
  onQuickView: (p: any) => void;
}) {
  const wishlist = useWishlist();
  const wish = wishlist.includes(product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div className="group relative bg-white rounded-2xl border border-border/70 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative aspect-square bg-gradient-to-br from-section-muted to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {off > 0 && (
          <span className="absolute top-3 left-3 bg-brand-accent text-white text-[11px] font-semibold px-2 py-1 rounded-md">
            {off}% OFF
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-destructive text-white text-[11px] font-semibold px-2 py-1 rounded-md">
            Out of Stock
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${wish ? "fill-brand-accent text-brand-accent" : ""}`} />
          </button>
          <button
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="uppercase tracking-wider font-semibold text-brand-accent">
            {product.brand}
          </span>
          <span>{product.sku}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-brand leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded">
            {product.rating} <Star className="h-3 w-3 fill-white" />
          </span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-bold text-brand">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.mrp.toLocaleString()}
          </span>
        </div>

        <a
          href={buildWhatsAppOrderLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
