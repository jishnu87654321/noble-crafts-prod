"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { GlobePolaroids } from "./ui/cobe-globe-polaroids"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const [isFeature2Hovering, setIsFeature2Hovering] = useState(false)
  const [isFeature4Hovering, setIsFeature4Hovering] = useState(false)

  return (
    <section id="features" className="bg-[#000000] text-white relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-24 md:pt-32 md:pb-32 px-4 md:px-0">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto flex flex-col items-center gap-12"
      >
        <h2 className="text-center text-5xl sm:text-7xl md:text-8xl tracking-tight premium-silver-gradient mb-12 flex flex-col md:flex-row items-center justify-center gap-x-4 font-normal">
          <span>Our</span>
          <span className="font-bold">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Feature 1: Custom Web Design */}
          <motion.div
            className="group border-white/5 bg-white/[0.02] col-span-1 md:col-span-1 lg:col-span-2 flex flex-col overflow-hidden rounded-3xl border p-8 shadow-2xl transition-all duration-500 hover:border-[#e78a53]/30 hover:bg-white/[0.04]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-2xl font-bold text-white">Custom Web Design</h3>
              <p className="text-white/50 text-sm max-w-sm">
                Beautiful, responsive websites tailored to your brand. We design sites that convert visitors into customers.
              </p>
            </div>

            <div className="relative w-full flex-1 min-h-[350px] md:min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
              <Image 
                src="/images/noblecrafts-hero.jpg" 
                alt="Custom Web Design - NobleCrafts Mockup" 
                fill
                quality={100}
                priority
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Feature 2: SEO Mastery */}
          <motion.div
            className="group border-white/5 bg-white/[0.02] col-span-1 md:col-span-1 lg:col-span-2 flex flex-col overflow-hidden rounded-3xl border p-8 shadow-2xl transition-all duration-500 hover:border-[#e78a53]/30 hover:bg-white/[0.04]"
            onMouseEnter={() => setIsFeature2Hovering(true)}
            onMouseLeave={() => setIsFeature2Hovering(false)}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-2xl font-bold text-white">SEO Mastery</h3>
              <p className="text-white/50 text-sm">
                Get found on Google. We build SEO-friendly sites that rank and drive organic traffic.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#e78a53]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full max-w-[400px]">
                <GlobePolaroids speed={0.005} />
              </div>
            </div>
          </motion.div>

          {/* Feature 4: Fast & Secure */}
          <motion.div
            className="group border-white/5 bg-white/[0.02] col-span-1 md:col-span-2 lg:col-span-4 flex flex-col overflow-hidden rounded-3xl border p-8 shadow-2xl transition-all duration-500 hover:border-[#e78a53]/30 hover:bg-white/[0.04]"
            onMouseEnter={() => setIsFeature4Hovering(true)}
            onMouseLeave={() => setIsFeature4Hovering(false)}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col lg:flex-row gap-8 h-full items-center">
              {/* Left: Text */}
              <div className="flex flex-col gap-4 lg:w-[280px] shrink-0">
                <h3 className="text-2xl font-bold text-white">Fast & Secure</h3>
                <p className="text-white/50 text-sm">
                  Lightning-fast loading speeds and enterprise-grade security to protect your business.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Page Speed", val: "99/100" },
                    { label: "Security", val: "A+" },
                    { label: "Uptime", val: "99.99%" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
                      <span className="text-[#e78a53] text-[10px] font-bold">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Video */}
              <div className="flex-1 w-full relative">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-[21/9]"
                  animate={isFeature4Hovering ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    <source src="/new-feature-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white/80 text-[10px] font-mono">Shield Active</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
