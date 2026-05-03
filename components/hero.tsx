"use client"
import { CloudLightning, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HomeBadge from "@/components/ui/home-badge"
import MuxPlayer from "@mux/mux-player-react"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const PIXEL_SCRIPT_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixel-RKkUKH2OXWk9adKbDnozmndkwseTQh.js"



export default function Hero() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          import("@/lib/load-script").then(({ loadScript }) => {
            loadScript(PIXEL_SCRIPT_URL)
              .then(() => {
                setIsScriptLoaded(true)
              })
              .catch((error) => {
                console.error("Error loading pixel script:", error)
              })
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const heroElement = document.getElementById("hero-section")
    if (heroElement) {
      observer.observe(heroElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const cards = [
    {
      title: "Custom Design",
      description: "Beautiful websites tailored to your brand.",
      icon: <CloudLightning className="h-full w-full" />,
      variant: "rose",
      showGridLines: true,
    },
    {
      title: "SEO Optimized",
      description: "Rank higher on Google and drive traffic.",
      icon: <Sparkles className="h-full w-full" />,
      variant: "rose",
      showGridLines: true,
    },
  ] as const

  const cardConfigurations = [
    {
      color: "rose",
      icon: "Blocks",
      label: "Command",
      canvasProps: { gap: 3, speed: 80, colors: "#fff, #fda4af, #e11d48" },
      number: 100,
      desc: "Projects Completed",
    },
    {
      color: "rose",
      icon: "f",
      label: "Dropper",
      canvasProps: { gap: 3, speed: 80, colors: "#fff, #fda4af, #e11d48" },
      number: 15,
      desc: "Industries Served",
    },
  ]

  return (
    <div
      id="hero-section"
      className="bg-background relative min-h-screen w-full overflow-x-hidden py-16 md:py-32 px-4 md:px-6"
    >
      <div className="absolute inset-0 z-0">
        <MuxPlayer
          playbackId="01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE"
          autoPlay="muted"
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <img
        src="/vector1.webp"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute top-0 right-0 z-[2] object-cover object-center select-none hidden lg:block"
      />
      <img
        src="/vector2.png"
        alt="Vector"
        width={300}
        height={300}
        draggable={false}
        className="absolute top-0 left-0 z-[2] object-cover object-center select-none hidden lg:block"
      />
      <img
        src="/vector5.webp"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute bottom-0 -left-44 z-[2] -rotate-90 object-cover object-center select-none hidden lg:block"
      />
      <img
        src="/vector6.png"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute -right-44 bottom-0 z-[2] rotate-90 object-cover object-center select-none hidden lg:block"
      />
      <div className="container relative z-10 mx-auto px-0 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <HomeBadge />
        </motion.div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <motion.h1
            className="from-white to-white/60 bg-gradient-to-b bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent leading-tight max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Build Your Online Presence
            <img
              src="/rose.webp"
              alt="Logo"
              draggable={false}
              className="mx-2 mb-1 inline-block h-8 sm:h-10 md:h-12 lg:h-16 w-auto"
            />
            & Grow Your Business
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
            Professional web design that converts visitors into customers. Beautiful, responsive, and SEO-friendly.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <Link prefetch={false} href="/docs/introduction" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-b from-rose-500 to-rose-700 text-sm text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]">
              Start Your Website Today
            </Button>
          </Link>
          <Link prefetch={false} href="/about" className="w-full sm:w-auto">
            <Button variant={"secondary"} className="w-full">
              Learn More <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-x-1 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <span className="text-xs sm:text-sm text-gray-500">Built with industry standards</span>
          <img
            src="/nextjs.webp"
            draggable={false}
            alt="Next.js"
            width={28}
            height={28}
            className="h-6 w-6 sm:h-7 sm:w-7 select-none"
          />
          <img
            src="/tailwind.webp"
            alt="Tailwind CSS"
            width={28}
            height={28}
            className="h-6 w-6 sm:h-7 sm:w-7 select-none"
            draggable={false}
          />
          <img
            src="/framer.webp"
            alt="Framer Motion"
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  )
}
