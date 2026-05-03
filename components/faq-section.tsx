"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer:
        "Most premium projects take 2-4 weeks depending on complexity. We focus on quality over speed, ensuring every pixel is perfect and performance is optimized for a 99+ score.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes! We don't just launch and leave. All our packages include dedicated support, security monitoring, and regular performance audits to keep your site at peak performance.",
    },
    {
      question: "Is my website SEO-friendly?",
      answer:
        "Absolutely. Every NobleCrafts site is built with SEO in mind from day one. We implement semantic HTML, schema markup, and lightning-fast core web vitals for maximum ranking potential.",
    },
    {
      question: "Can you help with e-commerce?",
      answer:
        "We build high-converting, custom e-commerce experiences. From seamless payment integrations to complex inventory management, we create shops that drive revenue.",
    },
    {
      question: "What if I need changes after launch?",
      answer:
        "We offer flexible maintenance plans. Whether you need a quick text change or a new feature, our team is ready to scale your website as your business grows.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden py-32 md:py-48 bg-[#000000] px-6">
      <div className="max-w-[1250px] mx-auto">
        {/* Header - Aligned toward upper-left of the section */}
        <motion.div
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl tracking-tight leading-[1.1] flex flex-col items-center font-normal">
            <span className="block faq-silver-gradient">Common <span className="font-bold">Questions</span></span>
            <span className="font-display italic faq-peach-gradient">About Our Services</span>
          </h2>
        </motion.div>

        {/* FAQ Items Stack - Centered */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-[900px] space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openItems.includes(index)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="relative"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left relative z-10 overflow-hidden group rounded-[24px] transition-all duration-500"
                    style={{
                      background: "linear-gradient(90deg, #050708 0%, #071012 25%, #0c1719 50%, #102326 75%, #050708 100%)",
                      border: "1px solid rgba(160, 220, 220, 0.12)",
                      boxShadow: isOpen 
                        ? "0 0 0 1px rgba(160,220,220,0.1), 0 12px 40px rgba(0, 40, 40, 0.3)" 
                        : "0 0 0 1px rgba(160,220,220,0.06), 0 8px 30px rgba(0, 40, 40, 0.2)",
                    }}
                  >
                    {/* Top Edge Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    
                    <div className="p-6 md:p-8 flex items-center justify-between gap-6 min-h-[78px] md:min-h-[84px]">
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#eadfce] transition-colors duration-300">
                        {faq.question}
                      </h3>
                      
                      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Plus className="w-6 h-6 text-[#ff9f43] stroke-[1.5]" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-white/5">
                            <p className="text-white/40 text-lg leading-relaxed max-w-3xl">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover state overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 pointer-events-none" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
