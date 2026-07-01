import { Calendar, Eye, ShieldCheck, BadgeDollarSign } from "lucide-react";
import heroImg from "@/assets/newherimage.png";

export function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "contain",
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 w-full relative z-10 pt-3 lg:pt-8 min-h-[auto] lg:min-h-[700px] flex items-start">
        <div className="max-w-xl w-full space-y-5 lg:space-y-6">

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] lg:leading-[1.05] text-brand">
            See Better.<br />Look Better.<br />
            <span className="text-brand-accent">Live Better.</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            Your vision is our mission. Experience clarity, style, and care – all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-brand-accent transition-colors shadow-md">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Book Eye Test
            </button>
            <button className="inline-flex items-center gap-2 bg-white text-brand border-2 border-brand px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-brand hover:text-white transition-colors">
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Shop Glasses
            </button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 lg:pt-3 text-xs sm:text-sm text-foreground/80">
            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-accent shrink-0" /> Expert Eye Care</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-accent shrink-0" /> Premium Quality</span>
            <span className="flex items-center gap-1.5"><BadgeDollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-accent shrink-0" /> Affordable Prices</span>
          </div>
        </div>
      </div>

      {/* Booking card */}
      <div className="relative lg:absolute left-0 right-0 lg:-bottom-12 px-4 pb-8 lg:pb-0 mt-8 lg:mt-0">
        <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-2xl border border-border/60 p-4 sm:p-5 grid sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-3 bg-brand text-white rounded-xl px-5 py-4 sm:min-w-[220px] lg:min-w-[260px]">
            <Calendar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <div>
              <div className="font-semibold leading-tight text-sm sm:text-base">Schedule Your<br />Eye Test Today</div>
              <div className="text-[10px] sm:text-[11px] opacity-80 mt-1">Early detection. Better protection.</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-2 sm:gap-3">
            <input className="border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Your Name" />
            <input className="border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Phone Number" />
            <input type="date" className="border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          </div>
          <button className="bg-brand text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm hover:bg-brand-accent transition-colors w-full sm:w-auto">Book Now</button>
        </div>
      </div>
    </section>
  );
}
