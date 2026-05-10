import { notFound } from "next/navigation";
import { collectionsData } from "@/lib/data";
import VideoPlayer from "@/components/media/VideoPlayer";
import AudioPlayer from "@/components/media/AudioPlayer";
import { ArrowLeft, Share2, Download } from "lucide-react";
import Link from "next/link";

export default async function WorkDetail({ params }: { params: { slug: string } }) {
  const collection = collectionsData[params.slug];

  if (!collection) {
    notFound();
  }

  return (
    <div className="bg-[var(--background-bg-light-primary)] min-h-screen pb-24">
      {/* Detail Header */}
      <section className="bg-[var(--background-bg-white)] border-b border-[var(--border-border-primary)] pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/works" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-text-black-tertiary)] hover:text-[var(--text-text-brand-primary)] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-text-brand-primary)]">Collection</span>
              <h1 className="mt-4 font-heading text-display-lg text-[var(--text-text-black-primary)]">{collection.title}</h1>
              <p className="mt-6 text-body-lg text-[var(--text-text-black-seconday)] leading-relaxed">
                {collection.description}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-border-primary)] px-4 py-2 text-xs font-bold text-[var(--text-text-black-primary)] hover:bg-[var(--colors-gray-50)]">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Items List / Player Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="space-y-16">
          {collection.items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[var(--border-border-secondary)] pb-16 last:border-0">
              {/* Media Player Column */}
              <div className="lg:col-span-7">
                {item.mediaType === "video" ? (
                  <VideoPlayer src={item.src} poster={item.poster} />
                ) : item.mediaType === "audio" ? (
                  <AudioPlayer src={item.src} title={item.title} artist={item.metadata?.Artist} />
                ) : (
                  <div className="aspect-[4/3] bg-[var(--colors-gray-100)] rounded-[var(--radius-xl)] flex items-center justify-center italic text-[var(--colors-gray-400)]">
                    Document View Placeholder
                  </div>
                )}
              </div>

              {/* Metadata Column */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border-border-tertiary)] p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-text-black-quaternary)]">
                    Item Metadata
                  </span>
                  <h3 className="mt-4 font-heading text-display-xs text-[var(--text-text-black-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-body-sm text-[var(--text-text-black-seconday)] leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    {Object.entries(item.metadata || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-[var(--border-border-tertiary)] pb-2 text-xs">
                        <span className="font-bold text-[var(--text-text-black-tertiary)] uppercase tracking-wider">{key}</span>
                        <span className="text-[var(--text-text-black-primary)]">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-[var(--border-border-tertiary)]">
                    <button className="w-full flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--background-bg-brand-solid)] py-4 text-xs font-bold text-white hover:brightness-110">
                      <Download className="h-4 w-4" /> Download Resource
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
