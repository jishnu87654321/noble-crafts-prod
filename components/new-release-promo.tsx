"use client"

import { motion } from "framer-motion"
import { Rocket, ArrowRight, Sparkles } from "lucide-react"

export function NewReleasePromo() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="relative rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/5 p-12 md:p-24 text-center group liquid-glass"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e78a53]/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          {/* Stroked Background Text */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
            <motion.h1
              className="text-[120px] md:text-[240px] font-bold text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(231, 138, 83, 0.08)",
                letterSpacing: "-0.05em"
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              NobleCrafts
            </motion.h1>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">

            <motion.h2 
              className="text-4xl md:text-7xl tracking-tight premium-silver-gradient mb-8 leading-[1.1] flex flex-col items-center font-medium"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Ready to</span>
              <span className="font-display italic">Elevate</span>
              <span>Your Digital Presence?</span>
            </motion.h2>

            <motion.p 
              className="text-white/40 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-sans uppercase tracking-widest text-sm"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Join dozens of forward-thinking brands who have transformed their online identity with NobleCrafts. 
              Modern design, peak performance, and absolute reliability.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(231, 138, 83, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#e78a53] text-white font-bold px-10 py-5 rounded-full flex items-center gap-3 transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                <span>Launch Your Project</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                className="text-white/60 hover:text-white font-medium flex items-center gap-2 px-6 py-3 transition-colors"
              >
                <span>View Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/5 rounded-tl-3xl group-hover:border-[#e78a53]/20 transition-colors duration-700" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/5 rounded-br-3xl group-hover:border-[#e78a53]/20 transition-colors duration-700" />
        </motion.div>
      </div>
    </section>
  )
}
