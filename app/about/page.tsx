"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-[var(--background-bg-light-primary)] min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--background-bg-white)] border-b border-[var(--border-border-primary)] pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-display-xl text-[var(--text-text-black-primary)]">The Curator of Sound</h1>
            <p className="mt-8 text-body-xl text-[var(--text-text-black-seconday)] leading-relaxed italic">
              "My life has been a search for the echoes of our past. I didn't just collect recordings; I collected the soul of a generation."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div className="prose prose-neutral max-w-none">
              <h2 className="font-heading text-display-xs text-[var(--text-text-black-primary)] mb-6">A Life Dedicated to Preservation</h2>
              <p className="text-body-md text-[var(--text-text-black-seconday)] leading-relaxed mb-6">
                Lutfullah Khan (1916–2012) was a Pakistani author, collector, and archivist who dedicated over sixty years of his life to documenting the cultural and intellectual landscape of South Asia. Born in Madras, he eventually settled in Karachi, where he began his monumental task of recording the voices of the era.
              </p>
              <p className="text-body-md text-[var(--text-text-black-seconday)] leading-relaxed mb-6">
                His collection, now housed at the Lahore University of Management Sciences (LUMS), consists of thousands of hours of rare audio recordings, including classical music, literary sessions, and interviews with political and cultural icons.
              </p>
              
              <h3 className="font-heading text-body-xl text-[var(--text-text-black-primary)] mt-12 mb-6">The LUMS Archive</h3>
              <p className="text-body-md text-[var(--text-text-black-seconday)] leading-relaxed">
                In partnership with the Khan family, LUMS has undertaken the digital preservation of this archive. Our mission is to make this vast cultural treasure accessible to scholars, students, and the public, ensuring that the voices Lutfullah Khan captured continue to resonate for generations to come.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="aspect-[3/4] bg-[var(--colors-gray-200)] rounded-[var(--radius-2xl)] overflow-hidden relative shadow-2xl">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--colors-gray-400)] font-heading">
                Portrait of Lutfullah Khan
              </div>
            </div>
            <div className="bg-[var(--colors-brand-50)] p-8 rounded-[var(--radius-xl)] border border-[var(--colors-brand-100)]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-text-brand-primary)] mb-4">Quick Facts</h4>
              <ul className="space-y-4 text-body-sm text-[var(--text-text-brand-secondary)]">
                <li className="flex justify-between border-b border-[var(--colors-brand-100)] pb-2">
                  <span>Recordings</span>
                  <span className="font-bold">6,000+ Hours</span>
                </li>
                <li className="flex justify-between border-b border-[var(--colors-brand-100)] pb-2">
                  <span>Years Active</span>
                  <span className="font-bold">1951 - 2012</span>
                </li>
                <li className="flex justify-between border-b border-[var(--colors-brand-100)] pb-2">
                  <span>Location</span>
                  <span className="font-bold">Lahore, Pakistan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
