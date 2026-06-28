import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sneha Patel",
    location: "Mumbai",
    rating: 5,
    text: "Excellent service! The optometrist was very thorough and helped me pick the perfect frames. My new glasses are incredibly comfortable. Highly recommend!",
  },
  {
    name: "Rahul Deshmukh",
    location: "Pune",
    rating: 5,
    text: "I've been coming here for years. Great selection of brands, honest pricing, and the staff truly cares about your vision. Best optical store in town.",
  },
  {
    name: "Anita Sharma",
    location: "Navi Mumbai",
    rating: 5,
    text: "Took my whole family for eye check-ups. The kids felt comfortable and the doctor was amazing with them. Found stylish frames for everyone at great prices.",
  },
  {
    name: "Vikram Joshi",
    location: "Thane",
    rating: 5,
    text: "Ordered progressive lenses and the fitting was perfect. The team guided me through every step. My vision has never been clearer. Thank you, Eye World!",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-3">TESTIMONIALS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Real stories from real people who trust us with their vision.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white border border-border/60 rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
              <Quote className="h-5 w-5 text-brand-accent/40" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{r.text}"</p>
              <div>
                <StarRating count={r.rating} />
                <div className="mt-2">
                  <div className="font-semibold text-sm text-brand">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
