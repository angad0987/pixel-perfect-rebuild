import { Calendar, Eye, ShieldCheck, BadgeDollarSign, Camera } from "lucide-react";
import heroImg from "@/assets/hero-clinic.jpg";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[oklch(0.97_0.01_250)] to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-32 lg:pb-40 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-brand text-white text-xs font-medium px-3 py-1.5 rounded-md">
            <Camera className="h-3.5 w-3.5" /> SELFIE POINT
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-brand">
            See Better.<br />Look Better.<br />
            <span className="text-brand-accent">Live Better.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            Your vision is our mission. Experience clarity, style, and care – all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-accent transition-colors shadow-md">
              <Calendar className="h-4 w-4" /> Book Eye Test
            </button>
            <button className="inline-flex items-center gap-2 bg-white text-brand border-2 border-brand px-6 py-3 rounded-full text-sm font-medium hover:bg-brand hover:text-white transition-colors">
              <Eye className="h-4 w-4" /> Shop Glasses
            </button>
          </div>
          <div className="flex flex-wrap gap-6 pt-3 text-sm text-foreground/80">
            <span className="flex items-center gap-2"><Eye className="h-4 w-4 text-brand-accent" /> Expert Eye Care</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> Premium Quality</span>
            <span className="flex items-center gap-2"><BadgeDollarSign className="h-4 w-4 text-brand-accent" /> Affordable Prices</span>
          </div>
        </div>
        <div className="relative">
          <img src={heroImg} alt="Eye World Opticals clinic interior" width={1280} height={960} className="rounded-2xl shadow-xl object-cover w-full h-[420px] lg:h-[520px]" />
        </div>
      </div>

      {/* Booking card */}
      <div className="absolute left-0 right-0 -bottom-12 px-4">
        <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-2xl border border-border/60 p-4 grid md:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-3 bg-brand text-white rounded-xl px-5 py-4 md:min-w-[260px]">
            <Calendar className="h-8 w-8 shrink-0" />
            <div>
              <div className="font-semibold leading-tight">Schedule Your<br />Eye Test Today</div>
              <div className="text-[11px] opacity-80 mt-1">Early detection. Better protection.</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <input className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Your Name" />
            <input className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Phone Number" />
            <input type="date" className="border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          </div>
          <button className="bg-brand text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-brand-accent transition-colors">Book Now</button>
        </div>
      </div>
    </section>
  );
}
