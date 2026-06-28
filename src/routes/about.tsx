import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Eye, ShieldCheck, BadgeDollarSign, HeartHandshake, Search, Users, Star } from "lucide-react";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Eye World Opticals" },
      { name: "description", content: "Learn about Eye World Opticals — our mission, story, core values, and commitment to providing quality eye care and stylish eyewear." },
      { property: "og:title", content: "About Us — Eye World Opticals" },
      { property: "og:description", content: "Quality eye care and stylish eyewear since our founding." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Eye, title: "Expert Care", desc: "Our team brings years of experience in optometry and eyewear fitting." },
  { icon: ShieldCheck, title: "Premium Quality", desc: "We source only authentic, high-quality frames and lenses from trusted brands." },
  { icon: BadgeDollarSign, title: "Affordable Prices", desc: "Quality eyewear should be accessible. We offer competitive pricing without compromise." },
  { icon: HeartHandshake, title: "Customer Trust", desc: "Your vision and satisfaction are at the heart of everything we do." },
];

const offers = [
  { icon: Eye, title: "Comprehensive Eye Tests", desc: "Thorough vision assessments by experienced optometrists." },
  { icon: Search, title: "Prescription Glasses", desc: "Custom lenses fitted into frames that match your style." },
  { icon: Star, title: "Sunglasses", desc: "Premium UV-protection sunglasses from top brands." },
  { icon: Users, title: "Contact Lenses", desc: "Wide range of soft and specialized contact lenses." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <TopBar />
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-brand via-brand/95 to-brand-accent py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.14_240/0.15),_transparent_70%)]" />
          <div className="mx-auto max-w-7xl px-4 text-center relative z-10">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              About <span className="text-white/90">Eye World Opticals</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mt-4">
              Where clear vision meets timeless style — your trusted partner in eye care.
            </p>
          </div>
        </section>

        {/* Mission / Introduction */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4">OUR MISSION</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                Seeing the World Clearly, One Smile at a Time
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mt-6 leading-relaxed">
                At Eye World Opticals, we believe that great vision transforms lives. Our mission is to provide
                accessible, high-quality eye care paired with stylish, authentic eyewear that makes you look and
                feel your best. Whether you need a routine check-up, a new pair of prescription glasses, or
                trendy sunglasses, we are here to help you see the world clearly.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4">OUR STORY</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                  Founded with a Vision
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mt-6 leading-relaxed">
                  Eye World Opticals was born from a simple belief — that everyone deserves access to quality eye
                  care and beautiful eyewear without breaking the bank. What started as a small local clinic with
                  a passion for precision has grown into a trusted destination for families seeking expert vision
                  solutions. Over the years, we have helped thousands of customers rediscover the joy of clear
                  sight, combining modern technology with old-fashioned care.
                </p>
                <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
                  Our journey has been driven by a commitment to excellence, continuous learning, and a deep
                  understanding that every pair of eyes is unique. Today, we stand proud as a community-focused
                  optical store that puts your vision first.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand/5 to-brand-accent/10 rounded-2xl p-8 lg:p-10 border border-brand/10">
                <div className="text-center">
                  <div className="text-6xl font-display font-bold text-brand">10+</div>
                  <div className="text-muted-foreground mt-2">Years of Service</div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-brand-accent">5K+</div>
                    <div className="text-muted-foreground text-sm mt-1">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-brand-accent">50+</div>
                    <div className="text-muted-foreground text-sm mt-1">Top Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-brand-accent">100%</div>
                    <div className="text-muted-foreground text-sm mt-1">Authentic Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-brand-accent">4.9</div>
                    <div className="text-muted-foreground text-sm mt-1">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4">OUR VALUES</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                What Drives Us Every Day
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-border/60 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto">
                    <v.icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="font-semibold text-lg text-brand mt-4">{v.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4">WHAT WE OFFER</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                Complete Eye Care Under One Roof
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offers.map((o) => (
                <div key={o.title} className="bg-white border border-border/60 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="h-12 w-12 rounded-lg bg-brand text-white flex items-center justify-center">
                    <o.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-brand mt-4">{o.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                Plus — we regularly organize <strong>free eye check-up camps</strong> in partnership with local
                communities to promote vision health for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4">OUR TEAM</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand leading-tight">
                Meet the Experts Behind Your Vision
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-2xl mx-auto">
                Our team of experienced optometrists and eyewear consultants is dedicated to providing you with
                personalized care and the perfect fit — every single time.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Dr. Arjun Mehta", role: "Chief Optometrist", desc: "15+ years of experience in comprehensive eye care and vision therapy." },
                { name: "Priya Sharma", role: "Eyewear Consultant", desc: "Expert in frame styling, lens selection, and personalized fittings." },
                { name: "Rohan Kapoor", role: "Optical Technician", desc: "Specialist in precision lens grinding, coating, and quality assurance." },
              ].map((m) => (
                <div key={m.name} className="bg-white border border-border/60 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand/20 to-brand-accent/20 flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-brand" />
                  </div>
                  <h3 className="font-semibold text-lg text-brand mt-4">{m.name}</h3>
                  <div className="text-brand-accent text-sm font-medium">{m.role}</div>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-brand to-brand-accent">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to Experience Clearer Vision?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mt-4">
              Visit us today for a comprehensive eye check-up or browse our collection of premium frames and lenses.
              Your journey to better sight starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="/" className="inline-flex items-center gap-2 bg-white text-brand px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg">
                <Calendar className="h-4 w-4" /> Book an Appointment
              </a>
              <a href="/products" className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/60 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                <Eye className="h-4 w-4" /> Shop Eyewear
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
