"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-[var(--background-bg-light-primary)] min-h-screen">
      {/* Header */}
      <section className="bg-[var(--background-bg-white)] border-b border-[var(--border-border-primary)] pt-32 pb-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="font-heading text-display-lg text-[var(--text-text-black-primary)]">Get in Touch</h1>
            <p className="mt-6 text-body-lg text-[var(--text-text-black-seconday)]">
              Have questions about the archive or want to schedule a visit to the physical collection at LUMS? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Card */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-[var(--radius-xl)] border border-[var(--border-border-primary)]">
                <Mail className="h-6 w-6 text-[var(--text-text-brand-primary)] mb-4" />
                <h3 className="font-bold text-body-md text-[var(--text-text-black-primary)]">Email Us</h3>
                <p className="mt-2 text-body-sm text-[var(--text-text-black-tertiary)]">archive@lums.edu.pk</p>
              </div>
              <div className="p-8 bg-white rounded-[var(--radius-xl)] border border-[var(--border-border-primary)]">
                <Phone className="h-6 w-6 text-[var(--text-text-brand-primary)] mb-4" />
                <h3 className="font-bold text-body-md text-[var(--text-text-black-primary)]">Call Us</h3>
                <p className="mt-2 text-body-sm text-[var(--text-text-black-tertiary)]">+92 (42) 3560 8000</p>
              </div>
            </div>

            <div className="p-8 bg-[var(--background-bg-dark-primary)] rounded-[var(--radius-xl)] text-white">
              <MapPin className="h-6 w-6 text-[var(--colors-brand-300)] mb-4" />
              <h3 className="font-bold text-body-md text-[var(--text-text-light-primary)]">Our Location</h3>
              <p className="mt-2 text-body-sm text-[var(--text-text-light-secondary)] leading-relaxed">
                Gadha & Birgi Gadha Library Building, <br />
                LUMS, Sector U, DHA Phase 5, <br />
                Lahore, 54792, Pakistan
              </p>
              <div className="mt-8 aspect-video w-full rounded-[var(--radius-md)] bg-[var(--colors-gray-800)] flex items-center justify-center text-xs text-[var(--colors-gray-600)]">
                Interactive Map Placeholder
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 rounded-[var(--radius-2xl)] border border-[var(--border-border-primary)] shadow-sm">
            <h2 className="font-heading text-display-xs text-[var(--text-text-black-primary)] mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-text-black-tertiary)]">Full Name</label>
                  <input type="text" className="w-full bg-[var(--colors-gray-25)] border border-[var(--border-border-primary)] rounded-[var(--radius-md)] px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--colors-brand-200)] focus:outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-text-black-tertiary)]">Email Address</label>
                  <input type="email" className="w-full bg-[var(--colors-gray-25)] border border-[var(--border-border-primary)] rounded-[var(--radius-md)] px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--colors-brand-200)] focus:outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-text-black-tertiary)]">Subject</label>
                <select className="w-full bg-[var(--colors-gray-25)] border border-[var(--border-border-primary)] rounded-[var(--radius-md)] px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--colors-brand-200)] focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Archive Visitation</option>
                  <option>Research Request</option>
                  <option>Media Contribution</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-text-black-tertiary)]">Message</label>
                <textarea rows={5} className="w-full bg-[var(--colors-gray-25)] border border-[var(--border-border-primary)] rounded-[var(--radius-md)] px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--colors-brand-200)] focus:outline-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--background-bg-brand-solid)] py-4 text-sm font-bold text-white hover:brightness-110 transition-all active:scale-[0.98]">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
