import Link from "next/link";
import Image from "next/image";
import { stories } from "@/lib/data";

interface RelatedStoriesProps {
  /** Slug of the current page — excluded from the card list */
  excludeSlug?: string;
  /** How many cards to show (default 3) */
  maxItems?: number;
  /** Wrap the section in h-screen for snap-scroll pages */
  fullHeight?: boolean;
}

/* Card image heights — staggered intentionally to match Figma design.
   Heights cycle through this array for each card position.
   card heights: h-[180px] h-[220px] h-[290px] ← adjust per card */
const CARD_HEIGHTS = ["h-[180px]", "h-[220px]", "h-[290px]"];

export default function RelatedStories({
  excludeSlug,
  maxItems = 3,
  fullHeight = false,
}: RelatedStoriesProps) {
  const cards = stories
    .filter((s) => s.slug !== excludeSlug && s.tagline)
    .slice(0, maxItems);

  return (
    /* bg: bg-[#EDE8DC] | padding: px-8 md:px-24 py-16 md:py-24 */
    <section
      className={`w-full bg-[#EDE8DC] text-[#2b2a29] px-8 md:px-24 py-16 md:py-16 flex flex-col justify-between${fullHeight ? ' h-screen flex-shrink-0' : ''}`}
    >
      {/* ── Top row: tagline left / archive branding right ───────────── */}
      <div className="flex items-start justify-between w-full">
        {/* Left: "it was never / a singular story." */}
        <div className="space-y-0 leading-snug">
          {/* text-[28px] md:text-[32px] ← tagline size */}
          <p className="font-sans text-[28px] md:text-[32px] leading-[1.23] font-normal">
            it was never
          </p>
          <p className="font-display italic text-[28px] md:text-[32px] leading-[1.23]">
            a singular story.
          </p>
        </div>

        {/* Right: archive branding */}
        {/* "the" text-[30px] | "Lutfullah Khan" text-[36px] | "archive" text-[30px] right-aligned */}
        <div className="text-right leading-[1.1] space-y-0">
          <p className="font-sans text-[28px] md:text-[30px] font-normal">the</p>
          <p className="font-display text-[34px] md:text-[38px] font-normal">Lutfullah Khan</p>
          <p className="font-sans text-[28px] md:text-[30px] font-normal">archive</p>
        </div>
      </div>

      {/* ── Cards row ────────────────────────────────────────────────── */}
      {/* gap-6 md:gap-7 ← space between cards */}
      <div className="flex items-end gap-6 md:gap-7 mt-14 md:mt-0 md:max-w-[72%]">
        {cards.map((story, i) => {
          const heightClass = CARD_HEIGHTS[i % CARD_HEIGHTS.length];
          const inner = (
            <div className="flex flex-col gap-4 md:gap-5 flex-1 min-w-0">
              {/* Image area */}
              <div className={`relative w-full ${heightClass} bg-[#2b2a29] overflow-hidden rounded`}>
                {story.coverImage ? (
                  <Image
                    src={story.coverImage}
                    alt={story.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder when no image is set */
                  <div className="absolute inset-0 flex items-end p-4 opacity-20">
                    <span className="font-display italic text-white text-[13px]">
                      {story.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="space-y-1">
                {/* tagline: font-display text-[16px] md:text-[20px] */}
                <p className="font-display text-[16px] md:text-[20px] leading-[1.1] text-[#2b2a29]">
                  {story.tagline}
                </p>
                {/* name: font-sans text-[13px] md:text-[15px] */}
                <p className="font-sans text-[13px] md:text-[15px] leading-[1.1] text-[#2b2a29] lowercase">
                  {story.name}
                </p>
              </div>
            </div>
          );

          return story.slug ? (
            <Link
              key={story.slug ?? story.name}
              href={`/${story.slug}`}
              className="flex-1 min-w-0 group"
            >
              {inner}
            </Link>
          ) : (
            <div key={story.name} className="flex-1 min-w-0">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
