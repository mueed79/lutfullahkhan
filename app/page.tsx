"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Home() {
  return (
    <div className="bg-white flex flex-col w-full overflow-x-hidden">

      {/* ============================================================
          1. HERO SECTION
          - Section height:    h-screen (mobile) / md:h-[1200px] (desktop) ← change [1200px]
          - Image overlay:     opacity-80 on the image div, bg-black/40 on the overlay
          - Top text position: md:top-[300px] ← move text up/down on desktop
          - Gap between cols:  md:gap-[200px] ← space between "time is passing" and "we live it"
          ============================================================ */}
      <section className="relative h-screen md:h-[1200px] w-full bg-[#292524] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-80"> {/* ← opacity-80: image brightness */}
          <Image
            src="/hero-karachi.jpg"
            alt="Karachi Street Scene"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" /> {/* ← bg-black/40: dark overlay intensity */}
        </div>

        {/* Narrative Text — "time is passing. it always is." */}
        {/* Position: md:left-[120px] md:top-[300px] | Font size: text-body-2xl (36px) */}
        <div className="absolute left-6 md:left-[120px] top-[20%] md:top-[300px] flex flex-col md:flex-row gap-12 md:gap-[200px] text-[var(--text-text-light-primary)] w-[calc(100%-3rem)] md:w-auto">
          <div className="flex flex-col">
            <span className="font-body text-[24px] md:text-body-2xl">time is passing.</span>
            <div className="flex items-center gap-3">
              <span className="font-body text-[24px] md:text-body-2xl">it</span>
              <span className="font-heading italic font-ultra-light text-[42px] md:text-display-md">always</span> {/* ← italic heading word */}
              <span className="font-body text-[24px] md:text-body-2xl">is.</span>
            </div>
          </div>
          <div className="flex flex-col font-body text-[24px] md:text-body-2xl">
            <span className="text-[var(--text-text-light-primary)]">we live it.</span>
            <span className="text-[var(--text-text-light-transparent)]">we forget it.</span> {/* ← transparent: 50% white */}
          </div>
        </div>

        {/* Bottom Question — "are you trying to hold on?" */}
        {/* Desktop position: md:left-[900px] md:top-[812px] ← adjust to reposition */}
        <div className="absolute left-6 md:left-[900px] bottom-[20%] md:top-[812px] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 text-[var(--text-text-light-primary)] w-[calc(100%-3rem)] md:w-auto">
          <span className="font-body text-[24px] md:text-body-2xl whitespace-nowrap">are you trying to</span>
          <span className="font-heading italic font-ultra-light text-[42px] md:text-display-md">hold on?</span>
        </div>

        {/* Photo credit — bottom right */}
        <div className="absolute right-6 md:right-[141px] bottom-12 md:top-[1128px] text-white font-body text-[14px] md:text-body-xl opacity-70">
          photo by Julian Walter
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 md:top-[1114px] md:left-[714px] flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
          <span className="text-white text-[12px] md:text-[16px] uppercase tracking-[2px] font-body">Scroll</span>
          <ChevronDown className="text-white h-4 w-4 md:h-5 md:w-5" />
        </div>
      </section>

      {/* ============================================================
          2. QUOTE BANNER / WAVEFORM  (warm cream background)
          - Section height:   md:h-[1055px] ← change to adjust section height
          - Section padding:  py-20 px-6 (mobile) — no padding on desktop (md:p-0)
          - Noise opacity:    opacity-40 on the noise overlay div
          - Quote font size:  text-body-1-5xl (28px) | italic word: text-display-md (36px)
          - Description max width: md:max-w-[542px] ← wraps the paragraph text
          ============================================================ */}
      <section className="relative min-h-screen md:h-[1055px] w-full bg-[#f1e1d0] overflow-hidden py-20 px-6 md:p-0">
        {/* Noise texture overlay — adjust opacity-40 to change grain intensity */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{ backgroundImage: 'url("/bg-noise.png")', backgroundRepeat: 'repeat' }}
        />

        {/* Waveform image — desktop: md:left-[19px] md:top-[216px] md:w-[677px] md:h-[395px] */}
        <div className="relative md:absolute md:left-[19px] md:top-[216px] w-full md:w-[677px] h-auto md:h-[395px] z-10 mt-20 md:mt-0">
          <Image
            src="/waveform.png"
            alt="Waveform"
            width={677}
            height={395}
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        {/* Orange accent line + quote text */}
        {/* Line height: h-[80px] | Quote position: md:left-[48px] md:top-[101px] */}
        <div className="absolute left-6 md:left-[48px] top-12 md:top-[101px] flex gap-4 md:gap-6 items-start z-10">
          <div className="w-[2px] h-[60px] md:h-[80px] bg-[var(--text-text-brand-primary)]" /> {/* ← orange accent line */}
          <div className="flex flex-col font-body text-[18px] md:text-body-1-5xl text-[var(--text-text-black-primary)]">
            <span>a collection of moments</span>
            <div className="flex flex-wrap items-baseline gap-2">
              <span>someone </span>
              <span className="font-heading italic font-ultra-light text-[32px] md:text-display-md">refused</span>
              <span> to forget.</span>
            </div>
          </div>
        </div>

        {/* Archive description paragraph — md:top-[650px] md:max-w-[542px] */}
        <div className="relative md:absolute left-0 md:left-[48px] md:top-[650px] max-w-full md:max-w-[542px] z-10 mt-12 md:mt-0">
          <p className="font-body text-[16px] md:text-body-xl text-[var(--text-text-black-primary)] leading-relaxed">
            <span className="underline cursor-pointer font-bold">Lutfullah Khan</span> spent his life recording voices, music, speeches, and conversations – he devoted his attention to preserving a cultural moment. This archive is the result of that care: a living record of cultural memory, where sound becomes a bridge between who we were, who we are, and who we might still become.
          </p>
        </div>

        {/* Large signature logo — md:right-[88px] md:top-[650px] */}
        <div className="relative md:absolute right-0 md:right-[88px] md:top-[650px] z-10 mt-12 md:mt-0 flex justify-center md:block">
          <Logo size="large" light={false} />
        </div>

        {/* Explore arrow */}
        <div className="relative md:absolute md:left-[714px] md:top-[946px] flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition-opacity z-10 mt-16 md:mt-0">
          <span className="text-[var(--text-text-black-primary)] text-[14px] md:text-[16px] uppercase tracking-[2px] font-body">EXPLORE</span>
          <ChevronDown className="text-black h-4 w-4 md:h-5 md:w-5" />
        </div>
      </section>

      {/* ============================================================
          3. STORIES GRID  (dark background)
          - Section padding:  py-20 md:py-[90px] px-6 md:px-[102px] ← left/right breathing room
          - Grid gap (horiz): gap-x-[24px] ← space between cards
          - Grid gap (vert):  gap-y-16 md:gap-y-[80px] ← space between card rows
          - Heading size:     text-display-xl (56px)
          - Card image heights are set per-card via the height prop (e.g. h-[265px])
          ============================================================ */}
      <section className="bg-[#1c1917] py-20 md:py-[90px] px-6 md:px-[102px] flex flex-col items-center">
        <div className="text-center mb-12 md:mb-[94px] space-y-4"> {/* ← mb-[94px]: gap below heading */}
          <h2 className="text-[var(--text-text-light-primary)]">
            <span className="font-body text-[32px] md:text-display-xl">a world </span>
            <span className="font-heading italic font-ultra-light text-[32px] md:text-display-xl">worth listening </span>
            <span className="font-body text-[32px] md:text-display-xl">to</span>
          </h2>
          <p className="font-body text-[16px] md:text-body-1-5xl text-[var(--text-text-light-primary)] opacity-80 max-w-[600px]">
            explore a curated selection from the archive, designed to help you listen
          </p>
        </div>

        {/* Story cards — height prop controls image tall-ness per card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-16 md:gap-y-[80px] w-full max-w-[1307px] items-start">
          <StoryCard title="poetry as defiance"                   subtitle="fehmida riaz"   img="/poetry.jpg"      height="h-[265px]" href="/fehmida" />
          <StoryCard title="sacred forms, modern anguish"         subtitle="sadequain"       img="/sadequain.jpg"   height="h-[323px]" />
          <StoryCard title="the trouble with telling the truth"   subtitle="ismat chughtai" img="/the-trouble.jpg" height="h-[429px]" />
          <StoryCard title="writing love letters under surveillance" subtitle="faiz ahmed faiz" img="/faiz.jpg"    height="h-[336px]" href="/faiz" />
          <StoryCard title="a new political imagination"          subtitle="collection"      img="/quaid.jpg"      height="h-[440px]" italicSubtitle />
          <StoryCard title="radio, before algorithms"             subtitle="collection"      img="/radio.jpg"      height="h-[320px]" italicSubtitle />
        </div>

        <Link href="/" className="mt-16 md:mt-20 font-body text-[14px] md:text-[var(--font-size-body-xl)] text-[var(--text-text-light-secondary)] uppercase tracking-[2px] border-b border-white/20 pb-1 hover:border-white transition-all">
          See all stories
        </Link>
      </section>

      {/* ============================================================
          4. CATEGORIES SECTION  (cream background)
          - Section padding:  py-20 md:py-[131px] px-6 md:px-[94px] ← top/bottom and sides
          - Left col max-w:   lg:max-w-[700px]
          - Right col width:  lg:w-[314px] ← category list column
          - Gap between cols: gap-16 md:gap-[100px]
          - Category font:    text-[28px] md:text-display-md (36px)
          - Subcategory font: text-[14px] md:text-body-md (16px)
          ============================================================ */}
      <section className="bg-[#f1e1d0] py-20 md:py-[131px] px-6 md:px-[94px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-[100px]">

          {/* Left: headline + description paragraphs */}
          <div className="w-full lg:max-w-[700px] space-y-12 md:space-y-[100px]">
            <div className="flex gap-4 md:gap-6 items-start">
              <div className="w-[2px] h-[60px] md:h-[80px] bg-[#E65100] mt-1" /> {/* ← orange accent bar */}
              <div className="flex flex-col font-body text-[20px] md:text-body-2xl leading-[1.1] text-[var(--text-text-black-primary)]">
                <span>it was never a singular story.</span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span>find what </span>
                  <span className="font-heading italic font-ultra-light text-[32px] md:text-display-md">makes sense</span>
                  <span> to you.</span>
                </div>
              </div>
            </div>

            {/* Description paragraphs — text-body-xl (20px), max-w-[580px] */}
            <div className="max-w-[580px] font-body text-[16px] md:text-body-xl leading-[1.4] text-[var(--text-text-black-primary)] space-y-6 md:space-y-8">
              <p>Different cities. Different languages. Different ways of being. Hear voices shaped by migration, memory, class, faith, art, and resistance.</p>
              <p>Some will feel familiar. others might surprise you.</p>
              <p>Together, they reflect the kind of Pakistan many of us grew up missing; complex, creative, unfinished.</p>
            </div>
          </div>

          {/* Right: category list — to add/remove categories, edit the array below */}
          <div className="w-full lg:w-[314px] flex flex-col pt-4">
            {[
              { name: "art",        sub: null },
              { name: "music",      sub: null },
              { name: "poetry",     sub: ["ghazal", "nazm", "resistance", "love", "all"], italic: true, active: true },
              { name: "literature", sub: null },
              { name: "languages",  sub: null },
              { name: "religion",   sub: null },
              { name: "politics",   sub: null }
            ].map((cat, idx) => (
              <div key={cat.name} className={`flex flex-col w-full ${idx === 0 ? '' : 'mt-6 md:mt-[30px]'}`}> {/* ← mt-[30px]: gap between categories */}
                <div className="flex flex-col group cursor-pointer items-start w-fit">
                  <span className={`text-[28px] md:text-display-md transition-all ${cat.italic ? 'font-heading italic' : 'font-body'} text-[var(--text-text-black-primary)]`}>
                    {cat.name}
                  </span>
                  {/* orange underline bar — h-[2px]: thickness, bg-[#E65100]: color */}
                  {!cat.active && (
                    <div className="h-[2px] bg-[#E65100] mt-[2px] w-full" />
                  )}
                  {cat.sub && (
                    <div className="w-full lg:w-[314px]">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 font-body text-[14px] md:text-body-md text-[var(--text-text-black-primary)]">
                        {cat.sub.map(s => <span key={s} className="hover:text-[#E65100] transition-colors cursor-pointer">{s}</span>)}
                      </div>
                      {cat.active && (
                        <div className="w-full lg:w-[314px] h-[3px] bg-[#E65100] mt-4" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── STORY CARD ────────────────────────────────────────────────
   height prop → controls how tall the image is (e.g. "h-[265px]")
   Title font:  text-display-sm (30px), font-heading
   Subtitle:    text-body-xl (20px), opacity-60
   Hover:       grayscale lifts, image scales up 5%, title turns orange */
interface StoryCardProps {
  title: string;
  subtitle: string;
  img: string;
  height: string;       /* e.g. "h-[265px]" — change to resize the image area */
  italicSubtitle?: boolean;
  href?: string;
}

function StoryCard({ title, subtitle, img, height, italicSubtitle = false, href }: StoryCardProps) {
  const inner = (
    <>
      <div className={`${height} overflow-hidden bg-[#292524] relative`}>
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1"> {/* ← gap-1: space between title and subtitle */}
        <h4 className="font-heading text-display-sm text-[var(--text-text-light-primary)] group-hover:text-[var(--text-text-brand-primary)] transition-colors">
          {title}
        </h4>
        <span className={`font-body text-body-xl text-[var(--text-text-light-primary)] opacity-60 ${italicSubtitle ? 'italic' : ''}`}>
          {subtitle}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex flex-col gap-6 group cursor-pointer w-full">
        {inner}
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-6 group cursor-pointer w-full">
      {inner}
    </div>
  );
}
