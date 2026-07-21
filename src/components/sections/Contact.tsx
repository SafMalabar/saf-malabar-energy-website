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
  const quickActions = [
    {
      icon: Phone,
      label: "Call Us",
      href: `tel:${company.phones[0].replace(/\s/g, "")}`,
      description: company.phones[0],
      color: "bg-primary",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
      description: "Chat with our team",
      color: "bg-[#25D366]",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${company.email}`,
      description: company.email,
      color: "bg-accent",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-warm-white" aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="Contact Us"
          title="Start Your Solar Engineering Assessment"
          description="Complete the form below or reach us directly. Our team responds within 24 hours with a preliminary system assessment."
        />

        {/* Quick action buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.label === "WhatsApp" ? "_blank" : undefined}
              rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="card-premium flex items-center gap-3 px-5 py-3.5 transition-transform hover:-translate-y-0.5"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color} text-white`}>
                <action.icon size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-dark">{action.label}</p>
                <p className="text-xs text-muted">{action.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ContactForm />
          </motion.div>

          {/* Sidebar info + map */}
          <motion.div
            className="space-y-6 lg:col-span-2"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Working hours */}
            <div className="card-premium p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-dark">Working Hours</h3>
              </div>
              <p className="text-sm text-muted">{company.workingHours.weekdays}</p>
              <p className="mt-2 text-sm font-semibold text-primary">
                {company.workingHours.emergency}
              </p>
            </div>

            {/* All phones */}
            <div className="card-premium p-6">
              <h3 className="mb-4 font-bold text-dark">Phone Numbers</h3>
              <ul className="space-y-3" role="list">
                {company.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                    >
                      <Phone size={14} className="text-secondary" aria-hidden="true" />
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="card-premium p-6">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-secondary" aria-hidden="true" />
                <h3 className="font-bold text-dark">Office Location</h3>
              </div>
              <p className="text-sm text-muted">{company.location}</p>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="SAF Malabar Energy office location on Google Maps"
                src="https://maps.google.com/maps?q=Malappuram,Kerala,India&z=10&output=embed"
                className="h-56 w-full border-0 lg:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
