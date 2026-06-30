/* eslint-disable prettier/prettier */
import { WhatsAppIcon } from "./WhatsAppIcon";
import { buildWhatsAppChatLink } from "@/lib/products";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppChatLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <WhatsAppIcon className="h-7 w-7 relative" />
    </a>
  );
}
