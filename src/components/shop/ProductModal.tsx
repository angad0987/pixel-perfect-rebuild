import { X, Star, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ConfirmOrderModal } from "./ConfirmOrderModal";

export function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  if (!product) return null;
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative grid md:grid-cols-2 gap-6 p-6">
          <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center hover:bg-section-muted">
            <X className="h-4 w-4" />
          </button>

          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-section-muted">
              <img src={gallery[active]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2">
                {gallery.map((g: string, i: number) => (
                  <button key={i} onClick={() => setActive(i)} className={`h-16 w-16 rounded-lg overflow-hidden border-2 ${active === i ? "border-brand-accent" : "border-border"}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-xs uppercase tracking-wider text-brand-accent font-semibold">{product.brand}</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand mt-1">{product.name}</h2>
            <div className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</div>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <span className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded">
                {product.rating} <Star className="h-3 w-3 fill-white" />
              </span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-brand">₹{product.price.toLocaleString()}</span>
              <span className="text-base text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
              <span className="text-sm text-green-600 font-semibold">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off</span>
            </div>

            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

            <div className="mt-5">
              <div className="text-sm font-semibold text-brand mb-2">Available Colors</div>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <span key={c} style={{ background: c }} className="h-8 w-8 rounded-full border-2 border-border" />
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Info label="Frame Shape" value={product.frameShape} />
              <Info label="Frame Material" value={product.frameMaterial} />
              <Info label="Gender" value={product.gender} />
              <Info label="Category" value={product.category} />
            </div>

            <div className="mt-4 bg-section-muted rounded-xl p-4">
              <div className="text-sm font-semibold text-brand mb-2">Lens Details</div>
              <p className="text-sm text-muted-foreground">{product.lens}</p>
            </div>

            <div className="mt-4">
              <div className="text-sm font-semibold text-brand mb-2">Specifications</div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-brand font-medium">{v as string}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex gap-3">
              <button aria-label="Wishlist" className="h-12 w-12 shrink-0 rounded-xl border border-border flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button onClick={() => setShowConfirm(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-base">
                <WhatsAppIcon className="h-6 w-6" />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <ConfirmOrderModal
          product={product}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-section-muted rounded-lg px-3 py-2">
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-brand font-medium">{value}</div>
    </div>
  );
}
