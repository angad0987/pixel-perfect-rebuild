import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

export function MapLocation() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-3">VISIT US</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand">
            Our Shop Location
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Come visit us for a free eye check-up or to explore our latest eyewear collection.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white border border-border/60 rounded-xl p-6 lg:p-8 flex flex-col justify-center gap-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-brand">Address</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Eye World Opticals & Eye Clinic<br />
                  Karingar, Nadia<br />
                  West Bengal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-brand">Phone</h3>
                <p className="text-muted-foreground text-sm mt-1">+91 9000000000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-brand">Hours</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Open Everyday<br />
                  10:00 AM – 8:30 PM
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=30.3214514,76.393469"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-accent transition-colors mt-2"
            >
              <ExternalLink className="h-4 w-4" /> Get Directions
            </a>
          </div>

          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-border/60 shadow-md h-[350px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.5!2d76.393469!3d30.321451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391029e895c9c4db%3A0xbbdef4e88cdfafbd!2sEye+World+Opticals!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Eye World Opticals Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
