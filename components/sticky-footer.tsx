"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 20

      setIsAtBottom(isNearBottom)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.footer
          className="fixed z-50 bottom-0 left-0 w-full h-[50vh] flex flex-col justify-between overflow-hidden"
          style={{ backgroundColor: "#e78a53" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between relative">
            <div className="w-full flex justify-end">
              <div className="flex gap-16 md:gap-24 mt-8 md:mt-12 mr-4 md:mr-16">
                <ul className="flex flex-col gap-4 text-right md:text-left">
                  <li><a href="#" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Home</a></li>
                  <li><a href="#features" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Services</a></li>
                  <li><a href="#works" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Portfolio</a></li>
                </ul>
                <ul className="flex flex-col gap-4 text-right md:text-left">
                  <li><a href="#" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Github</a></li>
                  <li><a href="#" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Twitter</a></li>
                  <li><a href="mailto:hello@noblecrafts.com" className="text-[#111111] font-medium hover:opacity-70 transition-opacity text-lg">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="w-full mt-auto pb-4 md:pb-8">
              <h1 className="text-[25vw] md:text-[18vw] font-bold text-[#111111] leading-none tracking-tighter" style={{ marginLeft: "-2%" }}>
                NC
              </h1>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}
