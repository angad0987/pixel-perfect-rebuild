import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  Package,
  Heart,
  Calendar,
  LogOut,
  ChevronRight,
  ShoppingBag,
  User as UserIcon,
  AlertCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk, updateProfileThunk, clearError } from "@/store/slices/authSlice";
import { setLoading as setOrdersLoading, loadOrdersThunk } from "@/store/slices/ordersSlice";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LogoutModal } from "@/components/shared/LogoutModal";
import type { OrderStatus } from "@/lib/orders";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Eye World Opticals" }] }),
  component: AccountPage,
});

const STATUS_BADGE: Record<string, string> = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const FILTER_TABS: ("All" | OrderStatus)[] = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-20 w-20 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-3 w-12 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SAMPLE_ORDERS_EMPTY = false; // set true to test empty state

function AccountPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.orders.items);
  const loading = useAppSelector((s) => s.orders.loading);
  const error = useAppSelector((s) => s.orders.error);

  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [profileName, setProfileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLoggingOut = useRef(false);

  useEffect(() => {
    if (!user && !isLoggingOut.current) {
      navigate({ to: "/login", search: { redirect: "/account" } });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) setProfileName(user.name || "");
  }, [user]);

  if (!user) return null;

  const filtered = statusFilter === "All" ? items : items.filter((o) => o.status === statusFilter);

  const nameChanged = profileName.trim() !== (user.name || "");

  async function handleRetry() {
    dispatch(setOrdersLoading());
    setTimeout(() => dispatch(loadOrdersThunk()), 600);
  }

  async function handleSaveProfile() {
    setSaving(true);
    dispatch(clearError());
    const ok = await dispatch(updateProfileThunk({ name: profileName.trim() }));
    setSaving(false);
    if (ok) {
      toast("Profile updated successfully");
    } else {
      toast.error("Failed to update. Please try again.");
    }
  }

  function handleLogout() {
    isLoggingOut.current = true;
    dispatch(logoutThunk());
    navigate({ to: "/" });
    toast("Logged out successfully");
  }

  return (
    <div className="min-h-screen bg-section-muted flex flex-col">
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <Header />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* ============ SIDEBAR ============ */}
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
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  activeTab === "orders"
                    ? "bg-brand-accent/10 text-brand-accent font-medium"
                    : "hover:bg-section-muted text-foreground"
                }`}
              >
                <Package className="h-4 w-4" /> Orders
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  activeTab === "profile"
                    ? "bg-brand-accent/10 text-brand-accent font-medium"
                    : "hover:bg-section-muted text-foreground"
                }`}
              >
                <UserIcon className="h-4 w-4" /> Profile
              </button>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-foreground"
              >
                <Heart className="h-4 w-4" /> Wishlist
              </Link>
              <Link
                to="/booking"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-foreground"
              >
                <Calendar className="h-4 w-4" /> Eye Test Bookings
              </Link>
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-section-muted text-destructive"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </aside>

          {/* ============ MAIN CONTENT ============ */}
          <section>
            {/* Tabs bar */}
            <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto sticky top-0 bg-section-muted z-10 pb-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`pb-3 text-sm font-semibold whitespace-nowrap ${
                  activeTab === "orders"
                    ? "text-brand-accent border-b-2 border-brand-accent"
                    : "text-muted-foreground"
                }`}
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`pb-3 text-sm font-semibold whitespace-nowrap ${
                  activeTab === "profile"
                    ? "text-brand-accent border-b-2 border-brand-accent"
                    : "text-muted-foreground"
                }`}
              >
                My Profile
              </button>
            </div>

            {/* ============ ORDERS TAB ============ */}
            {activeTab === "orders" && (
              <>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-brand">My Orders</h1>
                    <p className="text-sm text-muted-foreground">
                      {items.length} order{items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {/* Filter tabs */}
                {items.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {FILTER_TABS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setStatusFilter(t)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${
                          statusFilter === t
                            ? "bg-brand-accent text-white"
                            : "bg-white text-muted-foreground border border-border hover:border-brand-accent"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Loading state */}
                {loading && (
                  <div className="space-y-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                )}

                {/* Error state */}
                {!loading && error && (
                  <div className="bg-white rounded-2xl p-12 text-center border border-border/60">
                    <AlertCircle className="h-10 w-10 mx-auto text-destructive mb-3" />
                    <p className="text-destructive font-medium">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="inline-block mt-4 bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-medium"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Empty state */}
                {!loading && !error && filtered.length === 0 && (
                  <div className="bg-white rounded-2xl p-12 text-center border border-border/60">
                    <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground font-medium">
                      {statusFilter === "All"
                        ? "No orders yet"
                        : `No ${statusFilter.toLowerCase()} orders`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {statusFilter === "All"
                        ? "Start shopping to see your orders here"
                        : "Try a different filter"}
                    </p>
                    {statusFilter === "All" && (
                      <Link
                        to="/products"
                        className="inline-block mt-4 bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-medium"
                      >
                        Browse Products
                      </Link>
                    )}
                  </div>
                )}

                {/* Order list */}
                {!loading && !error && filtered.length > 0 && (
                  <div className="space-y-4">
                    {filtered.map((o) => (
                      <Link
                        key={o.id}
                        to="/order/$orderId"
                        params={{ orderId: o.id }}
                        className="block bg-white rounded-2xl border border-border/60 p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex gap-4">
                          <img
                            src={o.productImage}
                            alt={o.productName}
                            className="h-20 w-20 rounded-xl object-cover bg-section-muted shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-[11px] uppercase tracking-wider text-brand-accent font-semibold">
                                  {o.brand}
                                </div>
                                <h3 className="font-semibold text-brand truncate">
                                  {o.productName}
                                </h3>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  Order #{o.id}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(o.placedAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}{" "}
                                  · Qty: {o.quantity} · ₹{o.price.toLocaleString("en-IN")}
                                </div>
                              </div>
                              <span
                                className={`text-[11px] px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                                  STATUS_BADGE[o.status] || "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {o.status}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground self-center shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ============ PROFILE TAB ============ */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-border/60 p-6">
                <h2 className="font-display text-xl font-bold text-brand mb-6">My Profile</h2>

                <div className="space-y-5">
                  {/* Phone (read-only) */}
                  <div>
                    <label className="text-xs font-medium text-foreground">Phone Number</label>
                    <div className="mt-1 px-3 py-3 bg-section-muted rounded-lg text-sm text-muted-foreground">
                      +91 {user.phone.replace(/\D/g, "").replace(/(\d{5})(\d{5})/, "$1 $2")}
                    </div>
                  </div>

                  {/* Name (editable) */}
                  <div>
                    <label className="text-xs font-medium text-foreground">Full Name</label>
                    <input
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      type="text"
                      placeholder="Your name"
                      className="mt-1 w-full border border-border rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
                    />
                  </div>

                  {/* Member since */}
                  <div>
                    <label className="text-xs font-medium text-foreground">Member Since</label>
                    <div className="mt-1 text-sm text-brand font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                            month: "long",
                            year: "numeric",
                          })
                        : "January 2024"}
                    </div>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={handleSaveProfile}
                    disabled={!nameChanged || saving}
                    className="w-full bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
