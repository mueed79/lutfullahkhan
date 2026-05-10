"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

const collections = [
  {
    slug: "classical-music",
    title: "Classical Music",
    count: "450+ Recordings",
    description: "Rare recordings of classical vocalists and instrumentalists from the 20th century.",
    image: "/collections/music.jpg"
  },
  {
    slug: "literary-discussions",
    title: "Literary Discussions",
    count: "120+ Sessions",
    description: "Conversations with legendary Urdu poets and writers, including Faiz Ahmad Faiz.",
    image: "/collections/literature.jpg"
  },
  {
    slug: "historical-interviews",
    title: "Historical Interviews",
    count: "85 Interviews",
    description: "Oral histories documenting the partition and post-partition era of Pakistan.",
    image: "/collections/interviews.jpg"
  },
  {
    slug: "photographic-archive",
    title: "Photographs",
    count: "2,000+ Items",
    description: "A visual record of cultural life in Lahore and Karachi over five decades.",
    image: "/collections/photos.jpg"
  },
  {
    slug: "manuscripts",
    title: "Manuscripts",
    count: "300+ Documents",
    description: "Handwritten notes, letters, and rare first editions from the archive.",
    image: "/collections/manuscripts.jpg"
  }
];

export default function WorksIndex() {
  return (
    <div className="bg-[var(--background-bg-light-primary)] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[var(--background-bg-white)] border-b border-[var(--border-border-primary)] pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-display-lg text-[var(--text-text-black-primary)]">The Collections</h1>
            <p className="mt-4 text-body-lg text-[var(--text-text-black-seconday)]">
              Explore the breadth of the Lutfullah Khan Archive, spanning music, literature, and history.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-text-black-quaternary)]" />
              <input 
                type="text"
                placeholder="Search the archive..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--border-border-primary)] bg-white py-3 pl-12 pr-4 text-body-sm focus:outline-none focus:ring-2 focus:ring-[var(--colors-brand-200)]"
              />
            </div>
            <button className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-border-primary)] bg-white px-6 py-3 text-body-sm font-bold text-[var(--text-text-black-primary)] hover:bg-[var(--colors-gray-50)]">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col, i) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/works/${col.slug}`} className="group block">
                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-border-tertiary)] bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[16/10] bg-[var(--colors-gray-100)] relative">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--colors-gray-300)] font-heading italic">
                      {col.title}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-text-brand-primary)]">
                        Collection
                      </span>
                      <span className="text-[10px] font-medium text-[var(--text-text-black-quaternary)]">
                        {col.count}
                      </span>
                    </div>
                    <h2 className="mt-3 font-heading text-display-xs text-[var(--text-text-black-primary)] group-hover:text-[var(--text-text-brand-primary)] transition-colors">
                      {col.title}
                    </h2>
                    <p className="mt-4 text-body-sm text-[var(--text-text-black-tertiary)] line-clamp-2 leading-relaxed">
                      {col.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-xs font-bold text-[var(--text-text-black-primary)] group-hover:gap-4 transition-all">
                      Explore Collection <span className="text-[var(--text-text-brand-primary)]">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
