"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const SLIDE_UP = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WORD_VARIANTS = {
  hidden: { y: 40, opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function SplitWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display: "inline", overflow: "hidden" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            custom={i}
            variants={WORD_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FeaturedVideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isVideoInView = useInView(videoRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-black pt-12 md:pt-16 pb-0 px-6 overflow-hidden relative"
    >
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(231,138,83,0.04)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* About Us & Heading */}
        <motion.div
          className="mb-12 md:mb-20"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Eyebrow tag */}
          <motion.div variants={SLIDE_UP} className="mb-6 inline-flex items-center gap-3">
            <motion.div
              className="h-px w-8 bg-[#e78a53]"
              variants={{
                hidden: { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
              }}
            />
            <span className="text-[#e78a53] text-xs tracking-[0.4em] uppercase font-medium">
              About Us
            </span>
          </motion.div>

          {/* Main headline with per-word reveal */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight premium-silver-gradient font-medium">
            <SplitWords text="Pioneering ideas for" />
            <br className="hidden md:block" />
            <SplitWords
              text="minds that create, build, and inspire."
            />
          </h2>


        </motion.div>

        {/* Video container — parallax scale-in */}
        <motion.div
          ref={videoRef}
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="relative rounded-3xl overflow-hidden aspect-video w-full shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          <video
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="none"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Top-left badge */}
          <motion.div
            className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isVideoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#e78a53]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <span className="text-white/70 text-xs tracking-widest uppercase">Live Preview</span>
          </motion.div>

          {/* Bottom overlays */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <motion.div
              className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[#e78a53] text-xs tracking-widest uppercase mb-3">Our Approach</div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                We believe in the power of curiosity-driven exploration. Every project starts with a
                question, and every answer opens a new door to innovation.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isVideoInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(231,138,83,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium whitespace-nowrap cursor-pointer shrink-0 border border-[#e78a53]/30"
            >
              Explore more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
