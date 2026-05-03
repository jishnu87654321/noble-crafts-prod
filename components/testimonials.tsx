import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Marquee } from "@/components/magicui/marquee"

const testimonials = [
  {
    name: "Sarah Johnson",
    username: "@sarahjohnson",
    body: "NobleCrafts transformed our online presence. Our new website is beautiful and we've seen a 40% increase in inquiries!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    username: "@mchen_business",
    body: "Professional, responsive, and SEO-optimized. NobleCrafts delivered exactly what we needed to compete online.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emma Rodriguez",
    username: "@emmarod",
    body: "The team at NobleCrafts understood our vision and created a website that truly represents our brand.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Park",
    username: "@davidpark_co",
    body: "Fast, secure, and beautiful. Our customers love the new site and checkout process is seamless.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Lisa Thompson",
    username: "@lisathompson",
    body: "NobleCrafts made the entire process easy. From design to launch, they were professional and responsive.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "James Wilson",
    username: "@jameswilson",
    body: "Best investment for our business. The website ranks well on Google and converts visitors into customers.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rachel Green",
    username: "@rachelgreen",
    body: "Outstanding support and attention to detail. NobleCrafts is a true partner in our business growth.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Tom Anderson",
    username: "@tomanderson",
    body: "Professional team, professional results. Our website is now our best marketing tool.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Nicole Davis",
    username: "@nicoledavis",
    body: "From concept to launch, NobleCrafts delivered a website that exceeded our expectations.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

import Image from "next/image"

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative w-full max-w-xs overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-[#e78a53]/30 hover:bg-white/[0.05]"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#e78a53]/5 blur-3xl pointer-events-none" />
      
      {/* Quotation mark */}
      <div className="absolute top-6 right-8 text-[#e78a53]/10 text-6xl font-serif pointer-events-none italic select-none">
        "
      </div>

      <div className="text-white/80 leading-relaxed text-base relative z-10 font-medium italic">
        {body}
      </div>

      <div className="mt-8 flex items-center gap-4 relative z-10 border-t border-white/5 pt-6">
        <div className="relative h-12 w-12 shrink-0">
          <Image 
            src={img || "/placeholder.svg"} 
            alt={name} 
            fill
            className="rounded-full border-2 border-[#e78a53]/20 object-cover" 
            sizes="48px"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-white font-bold tracking-tight text-sm uppercase">{name}</div>
          <div className="text-[#e78a53] text-xs font-medium tracking-widest">{username}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden bg-[#000000]">
      {/* Ambient backgrounds removed for pure black focus */}

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#e78a53]" />
            <span className="text-[#e78a53] text-xs font-bold tracking-widest uppercase">Success Stories</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-8xl tracking-tight premium-silver-gradient mb-8 flex flex-col md:flex-row items-center justify-center gap-x-4 font-normal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="">Trusted by</span>
            <span className="font-display italic font-bold">Visionaries.</span>
          </motion.h2>

          <motion.p 
            className="max-w-2xl mx-auto text-white/40 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We've helped hundreds of businesses redefine their digital identity. Here's what they have to say about the NobleCrafts experience.
          </motion.p>
        </div>

        {/* Marquee Grids */}
        <motion.div 
          className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-row gap-6 h-full">
            <Marquee pauseOnHover vertical className="[--duration:40s]">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:35s] hidden md:flex">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="[--duration:45s] hidden lg:flex">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </motion.div>

        {/* Share CTA */}
        <div className="mt-12 flex justify-center relative z-20">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <span>Share Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
