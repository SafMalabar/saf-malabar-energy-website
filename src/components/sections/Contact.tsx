"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, slideLeft, slideRight, viewportOnce } from "@/lib/animations";
import { company } from "@/content";

export function Contact() {
  const contactItems = [
    {
      icon: Phone,
      title: "Phone",
      lines: company.phones,
      href: (line: string) => `tel:${line.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      lines: [company.email],
      href: () => `mailto:${company.email}`,
    },
    {
      icon: MapPin,
      title: "Location",
      lines: [company.location],
      href: null,
    },
  ];

  return (
    <section id="contact" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Get In Touch"
          description="Ready to start your solar journey? Reach out to us for a free consultation and quote."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-primary/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-dark">{item.title}</h3>
                  {item.lines.map((line) =>
                    item.href ? (
                      <a
                        key={line}
                        href={item.href(line)}
                        className="block text-sm text-dark/70 transition-colors hover:text-primary"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-dark/70">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="overflow-hidden rounded-2xl border border-primary/5 shadow-sm"
          >
            <iframe
              title="SAF Malabar Energy Location"
              src="https://maps.google.com/maps?q=Malappuram,Kerala,India&z=10&output=embed"
              className="h-full min-h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
