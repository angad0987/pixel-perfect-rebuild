import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Check, Package, Truck, Home as HomeIcon, ClipboardCheck, ShoppingBag, ArrowLeft, Loader } from "lucide-react";
import { ORDER_STEPS, type OrderStatus } from "@/lib/orders";
import { useAppSelector } from "@/store/hooks";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppIcon } from "@/components/shop/WhatsAppIcon";
import { buildWhatsAppChatLink } from "@/lib/products";

export const Route = createFileRoute("/order/$orderId")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.orderId} — Eye World Opticals` }] }),
  component: OrderPage,
});

const ICONS: Record<OrderStatus, any> = {
  Placed: ClipboardCheck, Confirmed: Check, Packed: Package, Shipped: Truck, Delivered: HomeIcon,
};

function OrderPage() {
  const { orderId } = useParams({ from: "/order/$orderId" });
  const items = useAppSelector((s) => s.orders.items);
  const loading = useAppSelector((s) => s.orders.loading);
  const order = items.find((o) => o.id === orderId);

  if (loading) {
    return (
      <div className="min-h-screen bg-section-muted flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Loader className="h-8 w-8 animate-spin text-brand-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-section-muted flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
            <h1 className="mt-4 font-display text-2xl font-bold text-brand">Order not found</h1>
            <p className="text-sm text-muted-foreground mt-1">We couldn't find order #{orderId}.</p>
            <Link to="/account" className="inline-flex items-center gap-2 mt-4 text-brand-accent text-sm font-medium"><ArrowLeft className="h-4 w-4" /> Back to My Orders</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stepIdx = ORDER_STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8">
        <Link to="/account" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-brand-accent"><ArrowLeft className="h-4 w-4" /> Back to orders</Link>

        <div className="bg-white rounded-2xl border border-border/60 p-6 mt-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Order ID</div>
              <h1 className="font-display text-2xl font-bold text-brand">#{order.id}</h1>
              <div className="text-xs text-muted-foreground mt-1">Placed on {new Date(order.placedAt).toLocaleString()}</div>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{order.status}</span>
          </div>

          <div className="flex gap-4 mt-6 pb-6 border-b border-border">
            <img src={order.productImage} alt={order.productName} className="h-24 w-24 rounded-xl object-cover bg-section-muted" />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wider text-brand-accent font-semibold">{order.brand}</div>
              <h3 className="font-semibold text-brand">{order.productName}</h3>
              <div className="text-xs text-muted-foreground mt-1">SKU {order.sku}</div>
              <div className="text-lg font-bold text-brand mt-2">₹{order.price.toLocaleString()}</div>
            </div>
          </div>

          <h2 className="font-display text-lg font-bold text-brand mt-6 mb-4">Tracking Timeline</h2>
          <ol className="relative">
            {ORDER_STEPS.map((s, i) => {
              const done = i <= stepIdx;
              const current = i === stepIdx;
              const Icon = ICONS[s];
              const entry = order.timeline.find((t) => t.status === s);
              return (
                <li key={s} className="flex gap-4 pb-6 last:pb-0 relative">
                  {i < ORDER_STEPS.length - 1 && (
                    <span className={`absolute left-5 top-10 bottom-0 w-0.5 ${i < stepIdx ? "bg-brand-accent" : "bg-section-muted"}`} />
                  )}
                  <div className={`relative h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-brand-accent text-white" : "bg-section-muted text-muted-foreground"} ${current ? "ring-4 ring-brand-accent/20" : ""}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pt-1.5">
                    <div className={`text-sm font-semibold ${done ? "text-brand" : "text-muted-foreground"}`}>{s}</div>
                    <div className="text-xs text-muted-foreground">{entry ? new Date(entry.at).toLocaleString() : "Pending"}</div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 p-4 bg-section-muted rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-brand">Need help with this order?</div>
              <div className="text-xs text-muted-foreground">Chat with our team on WhatsApp for instant updates.</div>
            </div>
            <a href={buildWhatsAppChatLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-2.5 rounded-xl">
              <WhatsAppIcon className="h-4 w-4" /> Chat now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
