/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPortal } from "react-dom";
import { X, Loader, Check } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrderThunk } from "@/store/slices/ordersSlice";
import { buildWhatsAppOrderLink } from "@/lib/products";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ConfirmOrderModal({ product, onClose }: { product: any; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleProceed() {
    if (!user) return;
    setLoading(true);
    // simulate future backend API call
    await new Promise((r) => setTimeout(r, 1500));
    const order = await dispatch(
      createOrderThunk({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        brand: product.brand,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity ?? 1,
      }),
    );
    if (order) {
      setLoading(false);
      setDone(true);
      // show checkmark first, then open WhatsApp
      setTimeout(() => {
        window.open(buildWhatsAppOrderLink(product, order.id), "_blank");
      }, 600);
      setTimeout(onClose, 3000);
    } else {
      setLoading(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-section-muted flex items-center justify-center hover:bg-border transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {!user ? (
            <div className="text-center py-6">
              <div className="text-lg font-semibold text-brand mb-2">Please sign in</div>
              <p className="text-sm text-muted-foreground mb-4">
                You need to sign in to place an order.
              </p>
              <a
                href="/login?redirect=/products"
                className="inline-flex items-center justify-center bg-brand-accent text-white font-semibold px-6 py-2.5 rounded-xl"
              >
                Sign in
              </a>
            </div>
          ) : done ? (
            <div className="text-center py-6">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-semibold text-brand mb-1">Order placed!</div>
              <p className="text-sm text-muted-foreground">
                WhatsApp is opening with your order details.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-6">
              <Loader className="h-8 w-8 animate-spin text-brand-accent mx-auto mb-3" />
              <div className="text-sm text-muted-foreground">Placing your order...</div>
            </div>
          ) : (
            <>
              <div className="text-lg font-bold text-brand mb-4">Confirm Order</div>

              <div className="flex gap-3 bg-section-muted rounded-xl p-3 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover bg-white shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs uppercase text-brand-accent font-semibold">
                    {product.brand}
                  </div>
                  <div className="font-semibold text-brand text-sm truncate">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.sku}</div>
                  <div className="font-bold text-brand mt-0.5">
                    ₹{product.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                You'll be redirected to WhatsApp to send your order request to our team.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-xl hover:bg-section-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Proceed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
