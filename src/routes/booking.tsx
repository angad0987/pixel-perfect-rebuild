import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, Eye, Check, User, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppIcon } from "@/components/shop/WhatsAppIcon";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Eye Test — Eye World Opticals" },
      { name: "description", content: "Book a comprehensive eye test at Eye World Opticals. Confirmation sent instantly on WhatsApp." },
    ],
  }),
  component: BookingPage,
});

const SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"];
const SERVICES = [
  { id: "eye-test", label: "Comprehensive Eye Test", price: "Free" },
  { id: "child", label: "Child Eye Check-up", price: "Free" },
  { id: "contact-lens", label: "Contact Lens Fitting", price: "₹500" },
  { id: "frame", label: "Frame Style Consultation", price: "Free" },
];

function BookingPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ name: "", phone: "", date: today, slot: "", service: "eye-test", notes: "" });
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.slot) return;
    const svc = SERVICES.find((s) => s.id === form.service)?.label;
    const msg = `Hello Eye World, I'd like to book an appointment.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${svc}%0ADate: ${form.date}%0ATime: ${form.slot}%0ANotes: ${form.notes || "—"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-section-muted flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl border border-border/60 p-10 max-w-md w-full text-center shadow-xl">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-brand mt-4">Appointment Requested</h1>
            <p className="text-sm text-muted-foreground mt-2">We've opened WhatsApp with your booking details. Send the message to confirm your slot — our team will reply within minutes.</p>
            <div className="mt-6 p-4 bg-section-muted rounded-xl text-left text-sm space-y-1">
              <div><span className="text-muted-foreground">Date:</span> <span className="font-semibold text-brand">{form.date}</span></div>
              <div><span className="text-muted-foreground">Time:</span> <span className="font-semibold text-brand">{form.slot}</span></div>
              <div><span className="text-muted-foreground">Service:</span> <span className="font-semibold text-brand">{SERVICES.find((s) => s.id === form.service)?.label}</span></div>
            </div>
            <button onClick={() => setDone(false)} className="mt-6 text-sm text-brand-accent font-medium">Book another</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand to-brand-accent text-white py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full"><Eye className="h-3.5 w-3.5" /> EYE CARE</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4">Book Your Eye Test</h1>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Free comprehensive eye check with our certified optometrists. Confirmation comes straight to your WhatsApp.</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 -mt-12 pb-16">
          <form onSubmit={submit} className="bg-white rounded-2xl border border-border/60 shadow-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display text-lg font-bold text-brand">1. Choose Service</h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                {SERVICES.map((s) => (
                  <label key={s.id} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${form.service === s.id ? "border-brand-accent bg-brand-accent/5" : "border-border hover:border-brand-accent/40"}`}>
                    <span>
                      <span className="block text-sm font-semibold text-brand">{s.label}</span>
                      <span className="text-xs text-muted-foreground">{s.price}</span>
                    </span>
                    <input type="radio" name="svc" className="sr-only" checked={form.service === s.id} onChange={() => setForm({ ...form, service: s.id })} />
                    <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${form.service === s.id ? "border-brand-accent bg-brand-accent" : "border-border"}`}>
                      {form.service === s.id && <Check className="h-3 w-3 text-white" />}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-brand">2. Pick Date & Time</h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <label className="block">
                  <span className="text-xs font-medium text-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Date</span>
                  <input required type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
                </label>
                <div>
                  <span className="text-xs font-medium text-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Time Slot</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {SLOTS.map((s) => (
                      <button type="button" key={s} onClick={() => setForm({ ...form, slot: s })} className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-colors ${form.slot === s ? "bg-brand-accent text-white border-brand-accent" : "border-border text-foreground hover:border-brand-accent"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-brand">3. Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <label className="block">
                  <span className="text-xs font-medium text-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Phone</span>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-foreground">Notes (optional)</span>
                  <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
                </label>
              </div>
            </div>

            <button disabled={!form.slot} className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-base">
              <WhatsAppIcon className="h-5 w-5" /> Confirm on WhatsApp
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
