"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { slideLeft, slideRight, viewportOnce } from "@/lib/animations";
import { company as defaultCompany } from "@/content";

type CompanyData = typeof defaultCompany;

export function Contact({ companyData }: { companyData?: CompanyData }) {
  const company = companyData ?? defaultCompany;

  const directChannels = [
    {
      icon: Phone,
      label: "Call Us",
      href: `tel:${company.phones[0].replace(/\s/g, "")}`,
      description: company.phones[0],
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
      description: "Chat with our team",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${company.email}`,
      description: company.email,
      external: false,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white" aria-labelledby="contact-heading">
      <div className="section-container">
        <SectionHeading
          label="Contact Us"
          title="Start Your Solar Engineering Assessment"
          description="Complete the form below or reach us directly. Our team responds within 24 hours with a preliminary system assessment."
        />

        <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/[0.06]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Info panel */}
            <motion.div
              className="relative overflow-hidden bg-primary-dark p-8 text-white sm:p-10"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

              <div className="relative">
                <h3 className="text-xl font-bold">Talk to an Engineer</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Skip the sales pitch. Reach our technical team directly through any of
                  these channels.
                </p>

                {/* Direct channels */}
                <div className="mt-8 space-y-3">
                  {directChannels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary-light transition-colors group-hover:bg-secondary group-hover:text-white">
                        <channel.icon size={19} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{channel.label}</p>
                        <p className="text-xs text-white/60">{channel.description}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Additional phones */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                    All Lines
                  </p>
                  <ul className="space-y-2" role="list">
                    {company.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                        >
                          <Phone size={13} className="text-secondary-light" aria-hidden="true" />
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hours + location */}
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm">
                  <div className="flex items-start gap-2.5 text-white/70">
                    <Clock size={15} className="mt-0.5 shrink-0 text-secondary-light" aria-hidden="true" />
                    <span>
                      {company.workingHours.weekdays}
                      <span className="mt-0.5 block font-semibold text-secondary-light">
                        {company.workingHours.emergency}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-white/70">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-secondary-light" aria-hidden="true" />
                    {company.location}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form panel */}
            <motion.div
              className="bg-white p-6 sm:p-10"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <motion.div
          className="mt-8 overflow-hidden rounded-3xl border border-border shadow-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="SAF Malabar Energy office location on Google Maps"
            src="https://maps.google.com/maps?q=Malappuram,Kerala,India&z=10&output=embed"
            className="h-64 w-full border-0 lg:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
