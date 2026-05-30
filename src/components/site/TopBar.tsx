import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[oklch(0.22_0.07_255)] text-white text-xs">
      <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>Karingar, Nadia, West Bengal</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:9000000000" className="flex items-center gap-1.5 hover:text-[oklch(0.85_0.1_240)] transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span>9000000000</span>
          </a>
          <a href="mailto:eyeworldopticals@gmail.com" className="flex items-center gap-1.5 hover:text-[oklch(0.85_0.1_240)] transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>eyeworldopticals@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="hover:text-[oklch(0.85_0.1_240)] transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-[oklch(0.85_0.1_240)] transition-colors"><Instagram className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
