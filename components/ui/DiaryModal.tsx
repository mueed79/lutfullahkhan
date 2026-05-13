"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DIARY_PARAGRAPHS = [
  "Faiz Ahmed Faiz was not my personal friend. He was my benefactor. Directly and indirectly he contributed to the expansion of my Audio Tape Library and promoted the project wherever he went, whomsoever he met.",
  "One obvious evidence of his sympathy and compassion was that he recorded all his poetic works for my library in a period of twenty years, from April 1964 to March 1984 to be exact. During his long and short stays in Karachi he frequently visited my studio to record whenever it was possible for him to do so. I never found him reluctant in responding to my request. He read whatever I placed before him. Be it from his books or a page from an old magazine, or a little chit bearing an odd couplet of his poetry copied from somebody's diary.",
  "In one or two cases the contents were so odd and old that they had long ceased to be a part of his formal recitations. When he came across such quotations his eyebrows were raised in perplexity but when assured that it was an authentic piece copied from \"Ravi\" published in the early thirties or so, he read it without hesitation. Only once he declined to read a poem. It was an elegy which he had written at the death of his elder brother. I understood his sentiments and did not press.",
  "He was not demanding in any form. I would go to fetch him where he stayed in Karachi and wait for an opportune moment to request him to visit my place. Time and engagements permitting he would readily consent to accompany me. Once he entered my studio he lost no time in preliminary conversation (he did not believe in small talk). He knew what he had to recite and I knew what I had to record. Usually I would set the equipment ready for recording before I went to bring him over. When he arrived, in a matter of seconds he would settle down at the table and start reciting into the microphone. I laid a heap of material before him duly flagged. He would pick up one by one and read without many intervals. In the early years of his visits he chose to recite what he wished to record. Later he quietly read what I wanted him to read.",
  "There was no set quota for his recitation. He read as much as possible within the available time. Twice he came across flagged items that were recorded by him some ten or twelve years ago. His memory was so sharp that when he saw those passages he suddenly paused and reminded me that he had already recited them some years back. Then I had to tell him the truth that those particular pieces were slightly faulty in recording quality and I wished a repeat performance. He obliged with a smile.",
  "Once he embarrassed me deeply. My strategy in recording renowned poets is to ask them to recite a few couplets or a poem which I could boast of having in my library as an exclusive item. Such a request has usually brought me desired results and sometimes fetched me an unexpected reward. When I made this routine request to Faiz in one of the sessions, he kept quiet. To be frank I was rather disappointed. He neither said anything in affirmative nor declined my request but remained seated and lit a cigarette. He puffed and puffed in silence and made no move while I wriggled in my seat uncomfortably. When the smoking was over he lit another cigarette and asked for a paper and pen which I provided promptly. He scribbled something for a few seconds and said, \"Haa'n ji\", which meant, \"start recording\".",
  "Quite naturally it cheered me up immensely. After all Faiz did recall something exclusive and consented to reward me. But when he finished reciting I was simply overwhelmed. His act of gratitude had exceeded the limits of his noble generosity. I am sure he clearly understood what I wanted but what he wrote and recited did not conform to my request. Dealing with Faiz for twenty years and reading his subtle poetry for more than four decades I could never imagine that he would oblige me to the extent of paying compliments to my project by composing an exclusive 'qit.a'* on the subject of my library.",
  "The maximum treatment he received in form of refreshments during the recording period was a couple of sandwiches which my wife prepared. He always preferred a cup of coffee to sip during the recording. Needless to mention he smoked before the recording, during the recording and after the recording. Only in the last days of his life he gave up smoking - I think for a short while. Doctors insisted, friends persuaded, above all his wife Alys kept fair vigilance. Naturally Faiz liked no such restrictions but reluctantly accepted. It was during this period of imposition that I went to him with my usual request. Magnanimously he agreed to visit my place. He looked quite unwell. I thought he was developing asthma as the breathing was heavy. When I brought up this topic he refused to admit that he suffered from breathing trouble but the wheezing sound emitting from his chest was loud and clear (it can be heard in the recording of that particular session) but he never let that interfere with his contribution to my library. To-day when I replay that chunk, the pathetic sound rebukes my selfish attitude and makes me feel guilty. In return I attribute it to the noble cause he served and selfless dedication he displayed.",
  "Although Faiz had recorded a bulk of his poems written after 80's from memory, quite a few had remained unrecorded. My difficulty was that I had no immediate access to his two 'Kulliyaat'. Only as late as October '84 I could manage to obtain a copy of 'Saaray Sukhan Hamaaray' from London and by that time the other collection 'Nuskhahaa-ey-Wafaa', compiled locally, was also ready in Karachi. 24th March 1984 was the last day of his recording at my place before he left for a medical check-up to Moscow. He returned in early November the same year.",
  "In the meanwhile I checked the contents of his last two books. While they did not carry twenty-nine poems that I have in my library, to my surprise and dismay there were as many as twenty-two poems that were not included in my collection. Therefore I prepared a detailed list of the remaining pieces and asked Faiz to oblige me so that I could claim of having his entire work - a unique distinction and singular achievement for a collector.",
  "He was preparing to leave next day for Lahore. He promised that on his next visit, which was planned in the third week of the same month, he would oblige me. As usual I did not insist. I knew he always remembered a promise and fulfilled it sooner or later. Little did I know that not all promises can be kept. Also nothing can be achieved totally or in perfect form - a qualification held only by God the Almighty.",
  "Faiz died at Lahore on 20th November 1984, at 12-45 noon.",
  "*Akin to quatrain.",
];

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiaryModal({ isOpen, onClose }: DiaryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-[#F6EBE0] z-[200] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Close button — sticky so it stays visible while scrolling */}
          <div className="sticky top-0 flex justify-end px-8 md:px-16 pt-8 pb-4 bg-[#F6EBE0] z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[12px] uppercase tracking-[1.2px] text-[#44403c] hover:text-[#1c1917] hover:underline transition-colors"
            >
              Close
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 md:px-24 pt-16 pb-32">
            <div className="max-w-[1035px] mx-auto flex flex-col md:flex-row gap-16 md:gap-[127px] items-start">

              {/* Left: title + divider + source label */}
              <div className="flex flex-col gap-8 md:w-[275px] shrink-0 md:sticky md:top-24">
                <h2 className="font-heading text-[36px] leading-[1.18] text-[#1c1917]">
                  Faiz and My Audio Tape Library
                </h2>
                <div className="h-px w-[159px] bg-[#E65100]" />
                <p className="font-sans font-medium text-[20px] leading-[1.18] text-[#44403c]">
                  From the diary of Lutfullah Khan
                </p>
              </div>

              {/* Right: body */}
              <div className="font-sans text-[20px] leading-[1.18] text-[#1c1917] space-y-6 md:pt-2">
                {DIARY_PARAGRAPHS.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
