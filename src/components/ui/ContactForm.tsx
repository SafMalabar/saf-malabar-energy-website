"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { contactForm } from "@/content";

const inputClass =
  "w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-sm text-dark transition-colors placeholder:text-muted/60 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15";

const labelClass = "mb-1.5 block text-sm font-semibold text-dark";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to submit. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Connection error. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col items-center justify-center px-8 py-16 text-center"
        role="status"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/[0.08]">
          <CheckCircle className="text-primary" size={32} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-dark">Thank You</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Your enquiry has been received. Our engineering team will contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Contact enquiry form"
    >
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-primary">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location <span className="text-primary">*</span>
          </label>
          <input id="location" name="location" type="text" required className={inputClass} placeholder="City, District" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="propertyType" className={labelClass}>Property Type</label>
          <select id="propertyType" name="propertyType" className={inputClass}>
            <option value="">Select property type</option>
            {contactForm.propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="billRange" className={labelClass}>Monthly Electricity Bill</label>
          <select id="billRange" name="billRange" className={inputClass}>
            <option value="">Select range</option>
            {contactForm.billRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>Service Interested In</label>
        <select id="service" name="service" className={inputClass}>
          <option value="">Select a service</option>
          {contactForm.services.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="billUpload" className={labelClass}>Electricity Bill Upload</label>
        <input
          id="billUpload"
          name="billUpload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="w-full rounded-xl border border-dashed border-border bg-warm-white px-4 py-3 text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
        />
        <p className="mt-1 text-xs text-muted">PDF, JPG, or PNG — max 5 MB</p>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your energy needs..." />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} aria-hidden="true" />}
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
