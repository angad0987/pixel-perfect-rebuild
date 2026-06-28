import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppIcon } from "@/components/shop/WhatsAppIcon";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Eye World Opticals" },
      { name: "description", content: "Get in touch with Eye World Opticals — visit our store in Karingar, call us, or send a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hello Eye World!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", email: "", message: "" });
  }

  const info = [
    { icon: MapPin, title: "Visit Us", text: "Karingar Bazaar, Nadia, West Bengal 741123" },
    { icon: Phone, title: "Call Us", text: "+91 88473 81404" },
    { icon: Mail, title: "Email Us", text: "hello@eyeworldopticals.com" },
    { icon: Clock, title: "Open Hours", text: "Mon - Sat: 10:00 AM - 9:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand to-brand-accent text-white py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold">Get in Touch</h1>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">We'd love to hear from you. Send us a message or visit our store for personalised eye care.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 -mt-12 pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {info.map((i) => (
              <div key={i.title} className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-11 w-11 rounded-full bg-brand-accent/10 flex items-center justify-center mb-3">
                  <i.icon className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="font-semibold text-brand">{i.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{i.text}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-border/60 p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-brand">Send a message</h2>
              <p className="text-sm text-muted-foreground mt-1">We typically reply within an hour during business hours.</p>
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-6">
                <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                <div className="sm:col-span-2">
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                </div>
                <label className="sm:col-span-2 block">
                  <span className="text-xs font-medium text-foreground">Message</span>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
                </label>
                <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand text-white font-semibold py-3 rounded-lg transition-colors">
                  {sent ? <><Check className="h-4 w-4" /> Opened WhatsApp</> : <><Send className="h-4 w-4" /> Send via WhatsApp</>}
                </button>
              </form>
            </div>

            <aside className="lg:col-span-2 space-y-4">
              <div className="bg-brand text-white rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold">Chat instantly</h3>
                <p className="text-sm text-white/80 mt-1">Skip the form — message us on WhatsApp for fastest replies.</p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-2.5 rounded-lg">
                  <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
                <iframe
                  title="Eye World location"
                  src="https://www.google.com/maps?q=Nadia%20West%20Bengal&output=embed"
                  className="w-full h-64 border-0"
                  loading="lazy"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-accent" />
    </label>
  );
}
