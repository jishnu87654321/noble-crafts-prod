'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Admin credentials requested by user
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('admin_auth', 'true')
      toast.success('Access Granted. Welcome back, Admin.')
      setTimeout(() => {
        router.push('/admin')
      }, 1000)
    } else {
      toast.error('Invalid Credentials')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e78a53]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl text-center">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-[#e78a53]" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Admin Portal</h1>
          <p className="text-white/40 mb-10">Access restricted to authorized personnel only.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-[#e78a53] outline-none transition-all placeholder:text-white/10 text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-[#e78a53]/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              {isLoading ? "Verifying..." : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <button 
            onClick={() => router.push('/')}
            className="mt-8 text-white/20 text-sm hover:text-white transition-colors"
          >
            Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  )
}
