import { Eye, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const nav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/" },
  { label: "Services", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Brands", to: "/" },
  { label: "Blog", to: "/" },
  { label: "Contact", to: "/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[oklch(0.62_0.14_240)] to-[oklch(0.27_0.08_255)] flex items-center justify-center">
            <Eye className="h-6 w-6 text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-bold tracking-wide text-brand">EYE WORLD</div>
            <div className="text-[10px] tracking-[0.3em] text-brand-accent text-center mt-0.5">— OPTICALS —</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n, i) => (
            <Link key={n.label} to={n.to} className={`text-sm font-medium relative py-1 transition-colors ${i === 0 ? "text-brand-accent" : "text-foreground hover:text-brand-accent"}`}>
              {n.label}
              {i === 0 && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-accent rounded" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground hover:text-brand-accent transition-colors"><Search className="h-5 w-5" /></button>
          <button aria-label="Account" className="text-foreground hover:text-brand-accent transition-colors"><User className="h-5 w-5" /></button>
          <button aria-label="Cart" className="relative text-foreground hover:text-brand-accent transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </button>
          <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-3">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} className="text-sm font-medium text-foreground hover:text-brand-accent transition-colors" onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
