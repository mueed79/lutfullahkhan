"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, VolumeX } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Home() {
  return (
    <div className="bg-white flex flex-col w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[1200px] w-full bg-[#292524] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-80">
          <img 
            src="/hero-karachi.jpg" 
            alt="Karachi Street Scene" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Narrative Text */}
        <div className="absolute left-[120px] top-[300px] flex gap-[200px] text-[var(--text-text-light-primary)]">
          <div className="flex flex-col">
            <span className="font-body text-body-2xl">time is passing.</span>
            <div className="flex items-center gap-3">
              <span className="font-body text-body-2xl">it</span>
              <span className="font-heading italic font-ultra-light text-display-md">always</span>
              <span className="font-body text-body-2xl">is.</span>
            </div>
          </div>
          <div className="flex flex-col font-body text-body-2xl">
            <span className="text-[var(--text-text-light-primary)]">we live it.</span>
            <span className="text-[var(--text-text-light-transparent)]">we forget it.</span>
          </div>
        </div>

        {/* Bottom Question */}
        <div className="absolute left-[900px] top-[812px] flex items-center gap-3 text-[var(--text-text-light-primary)]">
          <span className="font-body text-body-2xl whitespace-nowrap">are you trying to</span>
          <span className="font-heading italic font-ultra-light text-display-md">hold on?</span>
        </div>

        {/* Attribution */}
        <div className="absolute right-[141px] top-[1128px] text-white font-body text-body-xl opacity-70">
          photo by Julian Walter
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-[714px] top-[1114px] flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
          <span className="text-white text-[16px] uppercase tracking-[2px] font-body leading-[var(--line-height-body-md)]">Scroll</span>
          <ChevronDown className="text-white h-5 w-5" />
        </div>
      </section>

      {/* 2. QUOTE BANNER / WAVEFORM */}
      <section className="relative h-[1055px] w-full bg-[#f1e1d0] overflow-hidden">
        {/* Noise Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{ backgroundImage: 'url("/bg-noise.png")', backgroundRepeat: 'repeat' }}
        />

        {/* Floating Waveform Image */}
        <div className="absolute left-[19px] top-[216px] w-[677px] h-[395px] z-10">
          <img src="/waveform.png" alt="Waveform" className="w-full h-full object-cover" />
        </div>

        {/* Vertical Line & Quote */}
        <div className="absolute left-[48px] top-[101px] flex gap-6 items-start z-10">
          <div className="w-[2px] h-[80px] bg-[var(--text-text-brand-primary)]" />
          <div className="flex flex-col font-body text-body-1-5xl text-[var(--text-text-black-primary)]">
            <span>a collection of moments</span>
            <div className="flex items-baseline gap-2">
              <span>someone </span>
              <span className="font-heading italic font-ultra-light text-display-md">refused</span>
              <span> to forget.</span>
            </div>
          </div>
        </div>

        {/* Archive Description */}
        <div className="absolute left-[48px] top-[650px] max-w-[542px] z-10">
          <p className="font-body text-body-xl text-[var(--text-text-black-primary)]">
            <span className="underline cursor-pointer">Lutfullah Khan</span> spent his life recording voices, music, speeches, and conversations – he devoted his attention to preserving a cultural moment. This archive is the result of that care: a living record of cultural memory, where sound becomes a bridge between who we were, who we are, and who we might still become.
          </p>
        </div>

        {/* Large Signature Logo */}
        <div className="absolute right-[88px] top-[650px] z-10">
          <Logo size="large" light={false} />
        </div>

        {/* Explore Button */}
        <div className="absolute left-[714px] top-[946px] flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition-opacity z-10">
          <span className="text-[var(--text-text-black-primary)] text-[16px] uppercase tracking-[2px] font-body">EXPLORE</span>
          <ChevronDown className="text-black h-5 w-5" />
        </div>
      </section>

      {/* 3. STORIES GRID */}
      <section className="bg-[#1c1917] py-[90px] px-[102px] flex flex-col items-center">
        <div className="text-center mb-[94px] space-y-4">
          <h2 className="text-[var(--text-text-light-primary)]">
            <span className="font-body text-display-xl">a world </span>
            <span className="font-heading italic font-ultra-light text-display-xl">worth listening </span>
            <span className="font-body text-display-xl">to</span>
          </h2>
          <p className="font-body text-body-1-5xl text-[var(--text-text-light-primary)] opacity-80">
            explore a curated selection from the archive, designed to help you listen
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-3 gap-x-[24px] gap-y-[80px] w-full max-w-[1307px] items-start">
          <StoryCard 
            title="poetry as defiance" 
            subtitle="fehmida riaz" 
            img="/poetry.jpg" 
            height="h-[265px]"
          />
          <StoryCard 
            title="sacred forms, modern anguish" 
            subtitle="sadequain" 
            img="/sadequain.jpg" 
            height="h-[323px]"
          />
          <StoryCard 
            title="the trouble with telling the truth" 
            subtitle="ismat chughtai" 
            img="/the-trouble.jpg" 
            height="h-[429px]"
          />
          <StoryCard 
            title="writing love letters under surveillance" 
            subtitle="faiz ahmed faiz" 
            img="/faiz.jpg" 
            height="h-[336px]"
          />
          <StoryCard 
            title="a new political imagination" 
            subtitle="collection" 
            img="/quaid.jpg" 
            height="h-[440px]"
            italicSubtitle
          />
          <StoryCard 
            title="radio, before algorithms" 
            subtitle="collection" 
            img="/radio.jpg" 
            height="h-[320px]"
            italicSubtitle
          />
        </div>

        <Link href="/works" className="mt-20 font-body text-[var(--font-size-body-xl)] text-[var(--text-text-light-secondary)] uppercase tracking-[2px] border-b border-white/20 pb-1 hover:border-white transition-all">
          See all stories
        </Link>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <section className="bg-[#f1e1d0] py-[131px] px-[94px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-[100px]">
          {/* Left Column */}
          <div className="w-full lg:max-w-[700px] space-y-[100px]">
            <div className="flex gap-6 items-start">
              <div className="w-[2px] h-[80px] bg-[#E65100] mt-1" />
              <div className="flex flex-col font-body text-body-2xl leading-[1.1] text-[var(--text-text-black-primary)]">
                <span>it was never a singular story.</span>
                <div className="flex items-baseline gap-2">
                  <span>find what </span>
                  <span className="font-heading italic font-ultra-light text-display-md">makes sense</span>
                  <span> to you.</span>
                </div>
              </div>
            </div>

            <div className="max-w-[580px] font-body text-body-xl leading-[1.4] text-[var(--text-text-black-primary)] space-y-8">
              <p>Different cities. Different languages. Different ways of being. Hear voices shaped by migration, memory, class, faith, art, and resistance.</p>
              <p>Some will feel familiar. others might surprise you.</p>
              <p>Together, they reflect the kind of Pakistan many of us grew up missing; complex, creative, unfinished.</p>
            </div>
          </div>

          {/* Right Column (Categories) */}
          <div className="w-full lg:w-[314px] flex flex-col pt-4">
            {[
              { name: "art", sub: null },
              { name: "music", sub: null },
              { name: "poetry", sub: ["ghazal", "nazm", "resistance", "love", "all"], italic: true, active: true },
              { name: "literature", sub: null },
              { name: "languages", sub: null },
              { name: "religion", sub: null },
              { name: "politics", sub: null }
            ].map((cat, idx) => (
              <div key={cat.name} className={`flex flex-col w-full ${idx === 0 ? '' : 'mt-[30px]'}`}>
                <div className="flex flex-col group cursor-pointer items-start w-fit">
                  <span className={`text-display-md transition-all ${cat.italic ? 'font-heading italic' : 'font-body'} text-[var(--text-text-black-primary)]`}>
                    {cat.name}
                  </span>
                  
                  {/* Category Underline (matches word width exactly) */}
                  {!cat.active && (
                    <div className="h-[2px] bg-[#E65100] mt-[2px] w-full" />
                  )}

                  {cat.sub && (
                    <div className="w-full lg:w-[314px]">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 font-body text-body-md text-[var(--text-text-black-primary)]">
                        {cat.sub.map(s => <span key={s} className="hover:text-[#E65100] transition-colors cursor-pointer">{s}</span>)}
                      </div>
                      {/* Active category thick bottom line spanning full width of the column */}
                      {cat.active && (
                        <div className="w-[314px] h-[3px] bg-[#E65100] mt-4 ml-[-20px] lg:ml-0" />
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

function StoryCard({ title, subtitle, img, height, italicSubtitle = false }: any) {
  return (
    <div className="flex flex-col gap-6 group cursor-pointer w-full">
      <div className={`${height} overflow-hidden bg-[#292524]`}>
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-heading text-display-sm text-[var(--text-text-light-primary)] group-hover:text-[var(--text-text-brand-primary)] transition-colors">
          {title}
        </h4>
        <span className={`font-body text-body-xl text-[var(--text-text-light-primary)] opacity-60 ${italicSubtitle ? 'italic' : ''}`}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
