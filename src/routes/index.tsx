import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { WhyUs } from "@/components/site/WhyUs";
import { Brands } from "@/components/site/Brands";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eye World Opticals — See Better. Look Better. Live Better." },
      { name: "description", content: "Trusted optical store offering premium eyewear, contact lenses, eye check-ups and top brands like Ray-Ban, Oakley, Vogue and Titan." },
      { property: "og:title", content: "Eye World Opticals" },
      { property: "og:description", content: "Premium eyewear, eye care, and better vision." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <WhyUs />
        <Brands />
      </main>
      <Footer />
    </div>
  );
}
