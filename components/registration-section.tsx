"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, Github, Twitter, Linkedin, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteType: "",
    otherWebsiteType: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === "phone") {
      const cleanedValue = value.replace(/\s/g, "").replace(/[^0-9+]/g, "")
      setFormData(prev => ({ ...prev, [name]: cleanedValue }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Registration successful! We will contact you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          websiteType: "",
          otherWebsiteType: "",
        })
      } else {
        toast.error(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="register" className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: Brand Image and Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative min-h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group"
          >
            {/* Side Pic (Brand Image) */}
            <div className="absolute inset-0 z-0">
              <img
                src="/video/custom-design.png"
                alt="Brand Asset"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Details overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 z-10 flex flex-col h-full justify-end">
              <div className="mb-10">
                <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-white mb-2 leading-tight">
                  Ready to <span className="font-display italic font-bold block md:inline">Join Us?</span>
                </h2>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-5 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-green-500/50 transition-colors duration-500">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-4 h-4 text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">WhatsApp</span>
                    <span className="text-white text-xl font-medium">9113201968 / 9778578199</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-blue-500/50 transition-colors duration-500">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Email Address</span>
                    <span className="text-white text-xl font-medium">noblecrafts05@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 p-10 md:p-14 bg-zinc-950 rounded-[3rem] border border-white/10 flex flex-col justify-center shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold text-white ml-1">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 text-lg h-auto"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold text-white ml-1">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 text-lg h-auto"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-bold text-white ml-1">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 text-lg h-auto"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="websiteType" className="text-sm font-bold text-white ml-1">What type of website are you looking for?</Label>
                <select
                  id="websiteType"
                  name="websiteType"
                  value={formData.websiteType}
                  onChange={handleChange}
                  className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all cursor-pointer appearance-none text-lg"
                  required
                >
                  <option value="" disabled className="bg-zinc-900">Select website type</option>
                  <option value="ecommerce" className="bg-zinc-900">E-Commerce</option>
                  <option value="saas" className="bg-zinc-900">SaaS Platform</option>
                  <option value="portfolio" className="bg-zinc-900">Portfolio / Brand</option>
                  <option value="corporate" className="bg-zinc-900">Corporate Website</option>
                  <option value="other" className="bg-zinc-900">Other Custom Project</option>
                </select>
              </div>

              <AnimatePresence>
                {formData.websiteType === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <Label htmlFor="otherWebsiteType" className="text-sm font-bold text-[#e78a53] ml-1">Please specify "Other"</Label>
                    <textarea
                      id="otherWebsiteType"
                      name="otherWebsiteType"
                      placeholder="Tell us more about your specific needs..."
                      value={formData.otherWebsiteType}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 min-h-[120px] resize-none text-lg"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 text-white py-5 px-8 rounded-3xl font-bold text-xl shadow-xl shadow-[#e78a53]/20 transition-all hover:-translate-y-1 active:scale-[0.98] mt-4 flex items-center justify-center gap-3 group h-auto"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <span>Register Now</span>
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-white/30 text-xs mt-6">
                By clicking Register, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
