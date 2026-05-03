"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 260;
const FRAME_START = 1;
// Scroll pixels allocated per frame — controls how "fast" the video plays
const PX_PER_FRAME = 18;
const TOTAL_SCROLL = FRAME_COUNT * PX_PER_FRAME; // ~4680px total

export function Scrollytelling() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef   = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // ── Phase 1: Preload ALL frames into memory ──────────────────────────────
  useEffect(() => {
    let done = 0;
    const arr: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `/pics/ezgif-frame-${String(i + FRAME_START).padStart(3, "0")}.jpg`;

      const finish = (idx: number) => () => {
        arr[idx] = img;
        done++;
        setImagesLoaded(done);
        if (done >= FRAME_COUNT) {
          imagesRef.current = arr;
          setIsReady(true);
        }
      };
      img.onload  = finish(i);
      img.onerror = finish(i);
    }
  }, []);

  // ── Phase 2: Canvas + GSAP (runs once all images are in memory) ──────────
  useEffect(() => {
    if (!isReady || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    // willReadFrequently:false speeds up writes; alpha:false = no transparency overhead
    const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false })!;
    const imgs = imagesRef.current;

    // ── cover-fit draw ───────────────────────────────────────────────────────
    const draw = (idx: number) => {
      const img = imgs[idx];
      if (!img || img.naturalWidth === 0) return;

      const cw = canvas.width, ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let sw: number, sh: number, ox: number, oy: number;

      if (cr > ir) { sw = cw; sh = cw / ir; ox = 0;           oy = (ch - sh) / 2; }
      else         { sh = ch; sw = ch * ir;  ox = (cw - sw) / 2; oy = 0; }

      ctx.drawImage(img, ox, oy, sw, sh);
    };

    // ── Resize: keep canvas pixel-perfect ────────────────────────────────────
    let lastFrame = 0;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(lastFrame);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── GSAP ScrollTrigger — scrub:true = zero lag, 1:1 with scroll wheel ───
    const st = ScrollTrigger.create({
      trigger  : containerRef.current,
      start    : "top top",
      end      : `+=${TOTAL_SCROLL}`,
      pin      : true,
      anticipatePin: 1,
      scrub    : true,          // ← KEY: boolean true = no smoothing delay
      onUpdate : (self) => {
        const next = Math.min(
          FRAME_COUNT - 1,
          Math.round(self.progress * (FRAME_COUNT - 1))
        );
        if (next !== lastFrame) {
          lastFrame = next;
          // Schedule on next paint — keeps us in sync with browser's paint cycle
          requestAnimationFrame(() => draw(next));
        }
      },
    });

    // Draw frame 0 immediately so canvas isn't blank on entry
    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [isReady]);

  const loadPercent = Math.round((imagesLoaded / FRAME_COUNT) * 100);

  return (
    <div className="relative w-full" style={{ zIndex: 0, isolation: 'isolate' }}>
      <section
        ref={containerRef}
        className="relative w-full h-screen bg-black overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* ── Loading Screen ─────────────────────────────────────────── */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <p className="text-white font-serif text-3xl font-bold tracking-widest mb-10 opacity-80">
              Noble<span className="text-primary">Crafts</span>
            </p>

            {/* Progress bar */}
            <div className="w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${loadPercent}%` }}
              />
            </div>

            {/* Spinner + label */}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-4 h-4 border-2 border-zinc-700 border-t-primary rounded-full animate-spin" />
              <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase">
                Loading your experience&nbsp;&nbsp;{loadPercent}%
              </p>
            </div>
          </div>
        )}

        {/* ── Canvas ─────────────────────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full z-0 block transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ── Gradient Overlay for text readability ──────────────────── */}
        <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`} />

        {/* ── UI Overlays ────────────────────────────────────────────── */}
        <div className={`absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 md:pt-32 pt-24 pointer-events-none transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}>
          {/* Top Heading */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/40 text-sm tracking-widest uppercase mb-4"
            >
              About Us
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight pointer-events-auto bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
            >
              Pioneering <span className="italic font-display opacity-80">ideas</span> for <br className="hidden md:block" />
              minds that <span className="italic font-display opacity-80">create, build, and inspire.</span>
            </motion.h2>
          </div>

          {/* Bottom Overlay */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-auto pb-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md"
            >
              <div className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.
              </p>
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium cursor-pointer"
            >
              Explore more
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
