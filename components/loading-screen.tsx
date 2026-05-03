"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const WORDS = ["Design", "Create", "Inspire"]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const onCompleteRef = useRef(onComplete)

  // Update ref to avoid stale closures
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Word rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 900)

    return () => clearInterval(interval)
  }, [])

  // Counter and progress logic
  useEffect(() => {
    let startTime: number | null = null
    let animationFrameId: number

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      
      const newProgress = Math.min((elapsed / 1200) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(updateCounter)
      } else {
        // Wait 200ms after reaching 100 then call onComplete
        setTimeout(() => {
          onCompleteRef.current()
        }, 200)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Element 1: "Portfolio" Label (Top-Left) */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Portfolio
      </motion.div>

      {/* Element 2: Rotating Words (Center) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Element 3: Counter (Bottom-Right) */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {Math.round(progress).toString().padStart(3, "0")}
      </motion.div>

      {/* Element 4: Progress Bar (Bottom Edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[#89AACC] to-[#4E85BF]"
          style={{ 
            scaleX: progress / 100,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)" 
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  )
}
