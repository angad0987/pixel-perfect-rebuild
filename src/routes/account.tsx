import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Package, Heart, Calendar, LogOut, ChevronRight, User as UserIcon } from "lucide-react";
import { ORDER_STEPS } from "@/lib/orders";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk } from "@/store/slices/authSlice";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Eye World Opticals" }] }),
  component: AccountPage,
});

function AccountPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const orders = useAppSelector((s) => s.orders.items);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/login", search: { redirect: "/account" } });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-white rounded-2xl border border-border/60 p-5 h-fit">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-12 w-12 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold">
                {(user.name || user.phone).slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-brand truncate">{user.name || "Customer"}</div>
                <div className="text-xs text-muted-foreground">+91 {user.phone}</div>
              </div>
            </div>
            <nav className="mt-4 space-y-1 text-sm">
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-accent/10 text-brand-accent font-medium"><Package className="h-4 w-4" /> Orders</a>
              <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-foreground"><Heart className="h-4 w-4" /> Wishlist</Link>
              <Link to="/booking" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-foreground"><Calendar className="h-4 w-4" /> Eye Test Bookings</Link>
              <button onClick={() => { dispatch(logoutThunk()); navigate({ to: "/" }); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-destructive">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </aside>

          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-brand">My Orders</h1>
                <p className="text-sm text-muted-foreground">{orders.length} order{orders.length === 1 ? "" : "s"}</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-border/60">
                <UserIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No orders yet.</p>
                <Link to="/products" className="inline-block mt-4 bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-medium">Start shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => {
                  const stepIdx = ORDER_STEPS.indexOf(o.status);
                  return (
                    <Link key={o.id} to="/order/$orderId" params={{ orderId: o.id }} className="block bg-white rounded-2xl border border-border/60 p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <img src={o.productImage} alt={o.productName} className="h-20 w-20 rounded-xl object-cover bg-section-muted shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[11px] uppercase tracking-wider text-brand-accent font-semibold">{o.brand}</div>
                              <h3 className="font-semibold text-brand truncate">{o.productName}</h3>
                              <div className="text-xs text-muted-foreground mt-0.5">Order #{o.id} · ₹{o.price.toLocaleString()}</div>
                            </div>
                            <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold shrink-0 ${o.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{o.status}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-1.5">
                            {ORDER_STEPS.map((_, i) => (
                              <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= stepIdx ? "bg-brand-accent" : "bg-section-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground self-center" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
