import { Eye, MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[oklch(0.62_0.14_240)] to-white/20 flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="leading-none">
              <div className="font-display text-xl font-bold tracking-wide">EYE WORLD</div>
              <div className="text-[10px] tracking-[0.3em] text-white/70 mt-0.5 text-center">— OPTICALS —</div>
            </div>
          </div>
          <div className="text-sm text-white/80 mb-2">See Better • Look Better • Live Better</div>
          <p className="text-sm text-white/70 max-w-xs">
            Your trusted optical store for premium eyewear, eye care, and better vision.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="WhatsApp" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Phone className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {["Home", "About Us", "Services", "Shop", "Brands", "Contact"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {["Eye Check-up", "Power Glasses", "Contact Lenses", "Kids Eyewear", "Sunglasses", "Lens Solutions"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>Karingar, Nadia,<br />West Bengal</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>9000000000</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>eyeworldopticals@gmail.com</span></li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5" /><span>Open Everyday<br />10:00 AM – 8:30 PM</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
          <span>© 2024 Eye World Opticals & Eye Clinic. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
