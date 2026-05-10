"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import StickyAudioPlayer from "@/components/media/StickyAudioPlayer";

export default function FaizPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio State
  const [audioState, setAudioState] = useState({
    activeTrack: 'chand',
    theme: 'orange' as 'orange' | 'dark',
    trackTitle: 'Chand Roz Aur Meri Jaan',
    isVisible: false
  });

  // Section Refs for scroll tracking
  const heroRef = useRef(null);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);
  const s4Ref = useRef(null);
  const s5Ref = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { amount: 0.5 });
  const s2InView = useInView(s2Ref, { amount: 0.2 });
  const s3InView = useInView(s3Ref, { amount: 0.2 });
  const s4InView = useInView(s4Ref, { amount: 0.2 });
  const s5InView = useInView(s5Ref, { amount: 0.2 });

  useEffect(() => {
    const isPastHero = s2InView || s3InView || s4InView || s5InView;
    
    if (s5InView) {
      setAudioState(prev => ({ ...prev, theme: 'dark', isVisible: true }));
    } else if (isPastHero) {
      setAudioState(prev => ({ ...prev, theme: 'orange', isVisible: true }));
    } else {
      setAudioState(prev => ({ ...prev, isVisible: false }));
    }
  }, [heroInView, s2InView, s3InView, s4InView, s5InView]);
  
  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#1C1917] text-[#FAF5EF] overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-[140vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #141312 0%, #232222 100%)' }}>
        
        {/* fahmida-spool image - positioned lower as per feedback */}
        <div className="absolute right-[-5%] bottom-[10%] w-[480px] h-[480px] mix-blend-color-dodge opacity-90 pointer-events-none z-[10]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/fahmida-spool.png" 
              alt="Tape Spool" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <div className="relative z-20 max-w-[900px] text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <h1 className="text-[54px] md:text-[64px] font-sans leading-[1.1] tracking-tight text-[#EDE8DC]">
              &ldquo;Faiz was not my personal friend. 
              <br className="hidden md:block" />
              He was my <span className="text-[#E65100] italic font-heading font-thin">benefactor</span>.&rdquo;
            </h1>
            <p className="text-body-lg uppercase tracking-[0.4em] opacity-40 font-bold">
              &mdash; Lutfullah Khan
            </p>
          </motion.div>
        </div>

        {/* LISTEN Indicator - Center below quote */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-60 font-bold">Listen</span>
          <div className="w-[2px] h-32" style={{ background: 'linear-gradient(180deg, #E65100 0%, rgba(230, 81, 0, 0) 100%)' }} />
        </div>
      </section>

      {/* 2. Recording Sessions Section (Karachi) - Full-bleed Portrait Layout */}
      <section ref={s2Ref} className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#1C1917] text-[#EDE8DC]"
      style={{ background: 'linear-gradient(180deg, #232222 0%, #151413 100%)' }}>
        <div className="w-full md:w-1/2 relative h-screen grayscale">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full"
          >
            <Image 
              src="/faiz-portrait-large.png" 
              alt="Faiz portrait" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center px-24">
          <div className="max-w-[480px] space-y-10">
            <p className="text-[11px] uppercase tracking-[0.3em] opacity-40 font-bold">Recording Sessions, Karachi 1964 – 1984</p>
            <div className="relative pl-10">
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#E65100]" />
              <h2 className="text-[34px] font-heading font-light leading-snug">
                &ldquo;Once he entered my studio, he lost no time in preliminary conversation – he did not believe in small talk. He knew what he had to recite and I knew what I had to record.&rdquo;
              </h2>
            </div>
            <p className="text-[16px] opacity-60 leading-relaxed font-light">
              Over twenty years, Faiz visited Lutfullah Khan&apos;s home whenever he passed through Karachi. He would settle at the table, and within seconds, begin reciting into the microphone. Poems from published books, from old magazines, from odd couplets copied into somebody&apos;s diary.
            </p>
            
            <div className="flex items-center gap-4 text-[#E65100] pt-4">
              <div className="flex gap-1.5 items-center">
                {[1,2,3].map(i => <div key={i} className={`w-[2px] bg-current ${i===1 ? 'h-3' : i===2 ? 'h-5' : 'h-2'}`} />)}
              </div>
              <span className="text-[13px] font-bold uppercase tracking-[0.2em]">His voice is playing below.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 1911 – Sialkot - Cream Layout Refined */}
      <section ref={s3Ref} className="relative min-h-screen w-full flex items-center bg-[#F1E1D0] text-[#1C1917] px-24 py-32">
        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <div className="max-w-[600px] space-y-10">
            <p className="text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1911 – Sialkot</p>
            <p className="text-[32px] font-heading font-light leading-[1.3]">
              Born in Sialkot in 1911, <span className="text-[#E65100] italic">Faiz Ahmad Faiz</span> stands as one of South Asia’s most resonant voices. A poet of resistance and of the people, his vision of Pakistan was inseparable from a broader commitment to justice, humanity, and solidarity across borders.
            </p>
            <button className="text-[20px] font-heading italic opacity-80 hover:opacity-100 transition-opacity pt-4">know more +</button>
          </div>
        </div>
        
        {/* Noise overlay for paper texture */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-multiply">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
      </section>

      {/* 4. 1936 – Lahore - Split Layout (Cream) */}
      <section ref={s4Ref} className="relative min-h-screen w-full flex items-center justify-center bg-[#F1E1D0] text-[#1C1917] px-24 py-32">
        <div className="grid grid-cols-2 gap-24 items-end">
          <div className="space-y-12 opacity-30 grayscale pointer-events-none">
            <p className="text-[14px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1911 – Sialkot</p>
            <p className="text-[36px] font-heading font-light leading-[1.2]">
              Born in Sialkot in 1911, <span className="text-[#E65100] italic">Faiz Ahmad Faiz</span> stands as one of South Asia’s most resonant voices.
            </p>
          </div>
          
          <div className="space-y-12">
            <p className="text-[14px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1936 – Lahore</p>
            <p className="text-[36px] md:text-[42px] font-heading font-light leading-[1.2]">
              Deeply informed by Marxist ideals, Faiz joined the Progressive Writers’ Movement and spent much of his life confronting oppression, even when it meant prison or exile.
            </p>
          </div>
        </div>

        {/* Noise overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-multiply">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
      </section>

      {/* 5. 1951 – Resistance - Dark Layout with Poetry */}
      <section ref={s5Ref} className="relative min-h-[150vh] w-full flex flex-col items-center pt-32 pb-32 bg-[#1C1917] text-[#EDE8DC] px-24">
        <div className="max-w-[800px] space-y-12 mb-48">
          <p className="text-[14px] uppercase tracking-[0.3em] text-[#E65100] font-bold text-center">1951 – Resistance in confinement</p>
          <div className="space-y-8 text-[22px] font-light leading-relaxed opacity-80">
            <p>
              In 1951, he was arrested in the famous Rawalpindi Conspiracy Case and spent four years in jails across Pakistan, often in solitary confinement. 
            </p>
            <p>
              With no access to pen or paper, Faiz relied on his memory to compose poems, and, where possible, traced verses onto prison walls with coal. From these years of confinement came some of his most enduring poetry.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="relative flex gap-16 items-start max-w-[1000px]">
            <div className="space-y-6 text-right">
              <p className="text-[24px] font-heading leading-tight tracking-tight" style={{ direction: 'rtl' }}>
                متاعِ لوح و قلم چھن گئی تو کیا غم ہے<br/>
                کہ خونِ دل میں ڈبو لی ہیں انگلیاں میں نے<br/>
                زبان پہ مہر لگی ہے تو کیا
              </p>
              <div className="space-y-2 opacity-60 text-[16px] leading-relaxed font-light mt-12">
                <p>My pen and tablet, all that I had, taken away from me. But what is there to grieve for?</p>
                <p>For I have dipped my fingers in my heart’s blood</p>
                <p>So what if my lips have been sealed shut?</p>
              </div>
            </div>
            <div className="w-1 bg-[#E65100] h-[240px]" />
          </div>
        </div>
      </section>

      {/* 6. 1977 – Beirut */}
      <section className="relative min-h-screen w-full py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <h3 className="text-display-md font-heading tracking-tight">1977 &ndash; Beirut</h3>
            <div className="space-y-8 text-body-xl opacity-70 leading-relaxed font-light">
              <p>
                After General Zia&apos;s 1977 coup, he went into self-imposed exile in Beirut, where he edited Lotus, the Afro-Asian Writers&apos; Association journal. 
              </p>
              <p>
                Faiz&apos;s commitment was profoundly internationalist. He exchanged letters with Turkish revolutionary poet Nâzım Hikmet and maintained a close friendship with Pablo Neruda. Embedded in both local and global networks of anti-colonial struggle, he understood the fight for justice in Pakistan as part of broader movements for freedom across continents.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-video bg-[#161311] rounded-sm overflow-hidden border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-10 italic text-body-md uppercase tracking-widest">Beirut: Exile & Solidarity</div>
          </motion.div>
        </div>
      </section>

      {/* 7. Handwritten Note Section - Refined */}
      <section className="relative min-h-screen w-full py-48 px-24 bg-[#1C1917] text-[#EDE8DC] flex items-center">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <p className="text-[11px] uppercase tracking-[0.3em] opacity-60 font-bold">RECORDING SESSIONS, KARACHI 1964 – 1984</p>
            
            <div className="space-y-8 text-[16px] leading-relaxed opacity-80 font-light max-w-[500px]">
              <p>
                Although Faiz had recited many of his poems for Lutfullah Khan, a few remained unrecorded. And so Khan carefully prepared a list of what was still missing.
              </p>
              <p>
                In one of their final sessions together, a wheezing sound began to emit from Faiz&apos;s chest, loud and clear.
              </p>
            </div>

            <div className="relative pl-10 py-2">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E65100]" />
              <div className="space-y-8 max-w-[500px]">
                <p className="text-[32px] font-heading font-light leading-snug">
                  &ldquo;It can be heard in the recording of that particular session ... but he never let that interfere with his contribution to my library.
                </p>
                <p className="text-[32px] font-heading font-light leading-snug">
                  He always preferred a cup of coffee to sip during the recording. Needless to mention, he smoked – before, during, and after.&rdquo;
                </p>
              </div>
            </div>

            <button className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 transition-opacity pt-12">
              READ LUTFULLAH KHAN’S FULL ACCOUNT <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-6">
            <div className="relative w-full aspect-square max-w-[500px] shadow-2xl">
              <Image 
                src="/faiz-letter.png" 
                alt="Handwritten note" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[14px] opacity-80 font-light">Handwritten note from Faiz to Lutfullah Khan</p>
              <p className="text-[11px] opacity-40 italic">Photo from This Source</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Days */}
      <section className="relative h-screen w-full flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-[900px] space-y-16 text-center"
        >
          <p className="text-body-3xl font-heading leading-tight tracking-tight italic opacity-90">
            &ldquo;He promised that on his next visit, which was planned in the third week of the same month, he would oblige me. As usual, I did not insist... Little did I know that not all promises can be kept.&rdquo;
          </p>
          <div className="w-24 h-0.5 bg-[#E65100] mx-auto opacity-50" />
          <p className="text-body-xl uppercase tracking-[0.4em] opacity-30 font-bold">
            Faiz died in Lahore on November 20, 1984.
          </p>
        </motion.div>
      </section>

      {/* 9. Bol Poem Closing */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-6 bg-[#161311] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
        <div className="text-center space-y-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-hero font-heading leading-none tracking-tighter"
          >
            Bol
          </motion.h2>
          <div className="space-y-10 max-w-[700px] mx-auto">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[48px] font-heading text-[#E65100] tracking-tight" 
              style={{ direction: 'rtl' }}
            >
              بول کہ لب آزاد ہیں تیرے
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-body-2xl opacity-60 italic font-light leading-relaxed"
            >
              &ldquo;Speak, for your lips are free<br/>
              Speak, your tongue is still yours.&rdquo;
            </motion.p>
          </div>
        </div>
      </section>

      <div className="h-[20vh]" /> {/* Bottom spacing */}

      <StickyAudioPlayer 
        activeTrack={audioState.activeTrack}
        theme={audioState.theme}
        trackTitle={audioState.trackTitle}
        isVisible={audioState.isVisible}
      />
    </main>
  );
}
