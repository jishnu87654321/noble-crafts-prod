'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Globe, Trash2, Loader2, User, LogOut } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Registration {
  _id: string
  name: string
  email: string
  phone: string
  websiteType: string
  otherWebsiteType?: string
  createdAt: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'true') {
      router.push('/admin/login')
      return
    }
    fetchRegistrations()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations')
      const result = await response.json()
      if (result.success) {
        setRegistrations(result.data)
      } else {
        toast.error('Failed to fetch registrations')
      }
    } catch (error) {
      toast.error('An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return
    
    try {
      const response = await fetch(`/api/registrations/${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (result.success) {
        setRegistrations(registrations.filter(r => r._id !== id))
        toast.success('Registration deleted')
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Delete operation failed')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e78a53]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-normal tracking-tight premium-silver-gradient mb-4"
            >
              Admin <span className="font-display italic font-bold">Dashboard</span>
            </motion.h1>
            <p className="text-white/40">Manage and view all incoming client registrations from NobleCrafts.</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Registrations', value: registrations.length, icon: User, color: 'text-[#e78a53]' },
            { label: 'New This Week', value: registrations.filter(r => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Calendar, color: 'text-blue-400' },
            { label: 'E-Commerce Leads', value: registrations.filter(r => r.websiteType === 'ecommerce').length, icon: Globe, color: 'text-green-400' },
            { label: 'SaaS Leads', value: registrations.filter(r => r.websiteType === 'saas').length, icon: Globe, color: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-10 h-10 text-[#e78a53] animate-spin" />
              <p className="text-white/40 animate-pulse">Loading registrations...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center px-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <User className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">No registrations found</h3>
              <p className="text-white/40 max-w-xs">Once users start filling out your form, their details will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="p-6 font-bold text-sm uppercase tracking-widest text-white/40">Client</th>
                    <th className="p-6 font-bold text-sm uppercase tracking-widest text-white/40">Contact Info</th>
                    <th className="p-6 font-bold text-sm uppercase tracking-widest text-white/40">Project Type</th>
                    <th className="p-6 font-bold text-sm uppercase tracking-widest text-white/40">Date</th>
                    <th className="p-6 font-bold text-sm uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registrations.map((reg, idx) => (
                    <motion.tr 
                      key={reg._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e78a53] to-blue-500 flex items-center justify-center font-bold text-black text-sm">
                            {reg.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-lg">{reg.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            <Mail className="w-3.5 h-3.5" /> {reg.email}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            <Phone className="w-3.5 h-3.5" /> {reg.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider inline-block w-fit">
                            {reg.websiteType}
                          </span>
                          {reg.otherWebsiteType && (
                            <span className="text-white/40 text-xs italic line-clamp-1 max-w-[200px]">
                              "{reg.otherWebsiteType}"
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(reg.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(reg._id)}
                          className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
