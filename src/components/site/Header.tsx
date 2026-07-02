import { Eye, Search, User, Heart, Menu, X, LogOut, Package, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk } from "@/store/slices/authSlice";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Shop", to: "/products" },
  { label: "Book Eye Test", to: "/booking" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const wishlist = useAppSelector((s) => s.wishlist.ids);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[oklch(0.62_0.14_240)] to-[oklch(0.27_0.08_255)] flex items-center justify-center">
            <Eye className="h-6 w-6 text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-bold tracking-wide text-brand">EYE WORLD</div>
            <div className="text-[10px] tracking-[0.3em] text-brand-accent text-center mt-0.5">— OPTICALS —</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => {
            const isActive = pathname === n.to;
            return (
              <Link key={n.label} to={n.to} className={`text-sm font-medium relative py-1 transition-colors ${isActive ? "text-brand-accent" : "text-foreground hover:text-brand-accent"}`}>
                {n.label}
                {isActive && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-accent rounded" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button aria-label="Search" className="hidden sm:inline-flex text-foreground hover:text-brand-accent transition-colors"><Search className="h-5 w-5" /></button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-foreground hover:text-brand-accent transition-colors">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{wishlist.length}</span>}
          </Link>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenu(!menu)} aria-label="Account" className="h-9 w-9 rounded-full bg-gradient-to-br from-brand to-brand-accent text-white font-semibold text-sm flex items-center justify-center hover:opacity-90">
                {(user.name || user.phone).slice(0, 1).toUpperCase()}
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-section-muted">
                    <div className="text-xs text-muted-foreground">Signed in as</div>
                    <div className="text-sm font-semibold text-brand">+91 {user.phone}</div>
                  </div>
                  <Link to="/account" onClick={() => setMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-section-muted"><Package className="h-4 w-4" /> My Orders</Link>
                  <Link to="/wishlist" onClick={() => setMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-section-muted"><Heart className="h-4 w-4" /> Wishlist</Link>
                  <Link to="/booking" onClick={() => setMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-section-muted"><Calendar className="h-4 w-4" /> Book Eye Test</Link>
                  <button onClick={() => { dispatch(logoutThunk()); navigate({ to: "/" }); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-section-muted border-t border-border">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" search={{ redirect: "/account" }} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-brand-accent">
              <User className="h-5 w-5" /> <span className="hidden sm:inline">Sign in</span>
            </Link>
          )}

          <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-3">
          {nav.map((n) => {
            const isActive = pathname === n.to;
            return (
              <Link key={n.label} to={n.to} className={`text-sm font-medium transition-colors ${isActive ? "text-brand-accent" : "text-foreground hover:text-brand-accent"}`} onClick={() => setOpen(false)}>{n.label}</Link>
            );
          })}
          {user && (
            <Link to="/account" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground hover:text-brand-accent">My Account</Link>
          )}
        </nav>
      )}
    </header>
  );
}
