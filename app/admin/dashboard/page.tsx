"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  Download, 
  RefreshCcw, 
  Search, 
  LogOut, 
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  Layout
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  otherWebsiteType?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchRegistrations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/registrations")
      const result = await response.json()
      if (result.success) {
        setRegistrations(result.data)
        setFilteredRegistrations(result.data)
      } else {
        toast.error("Failed to fetch registrations")
        if (response.status === 401) router.push("/admin")
      }
    } catch (error) {
      toast.error("An error occurred while fetching data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  useEffect(() => {
    const filtered = registrations.filter(reg => 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      reg.websiteType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRegistrations(filtered)
  }, [searchTerm, registrations])

  const handleLogout = async () => {
    // Simple logout: we can't easily clear httpOnly cookies from client without another API route
    // but for this prototype, we'll just redirect and the server will block if cookie is invalid
    // Better: call a logout API
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Website Type", "Notes", "Date"]
    const csvData = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.websiteType,
      reg.otherWebsiteType || "N/A",
      new Date(reg.createdAt).toLocaleDateString()
    ])
    
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e78a53]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </button>
            <h1 className="text-4xl font-bold premium-silver-gradient">Registrations</h1>
            <p className="text-white/40 mt-2">Manage and view all incoming project requests.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button 
              variant="outline" 
              onClick={fetchRegistrations}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={exportToCSV}
              className="bg-white text-black hover:bg-white/90 rounded-xl font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Registrations", value: registrations.length, icon: Users, color: "text-[#e78a53]" },
            { label: "New Today", value: registrations.filter(r => new Date(r.createdAt).toDateString() === new Date().toDateString()).length, icon: Calendar, color: "text-blue-400" },
            { label: "Project Types", value: new Set(registrations.map(r => r.websiteType)).size, icon: Layout, color: "text-purple-400" },
          ].map((stat, i) => (stat && 
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-white/40 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-4xl font-bold mt-2">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border-white/10 h-12 pl-12 rounded-2xl text-white placeholder:text-white/20 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
              />
            </div>
            <div className="text-sm text-white/40 font-medium">
              Showing {filteredRegistrations.length} registrations
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-white/40">Client</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-white/40">Contact</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-white/40">Project Type</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-white/40">Date</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredRegistrations.map((reg, i) => (
                    <motion.tr
                      key={reg._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-lg text-white group-hover:text-[#e78a53] transition-colors">
                          {reg.name}
                        </div>
                        <div className="text-white/30 text-sm mt-1">{reg._id.slice(-8).toUpperCase()}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-white/60">
                            <Mail className="w-4 h-4 text-[#e78a53]/60" />
                            <span>{reg.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <Phone className="w-4 h-4 text-[#e78a53]/60" />
                            <span>{reg.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e78a53]/10 text-[#e78a53] text-xs font-bold uppercase tracking-widest border border-[#e78a53]/20">
                          {reg.websiteType}
                        </span>
                        {reg.otherWebsiteType && (
                          <p className="text-white/30 text-xs mt-2 max-w-[200px] truncate" title={reg.otherWebsiteType}>
                            {reg.otherWebsiteType}
                          </p>
                        )}
                      </td>
                      <td className="px-8 py-6 text-white/60 font-medium">
                        {new Date(reg.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-8 py-6">
                        <Button 
                          variant="ghost" 
                          className="h-10 w-10 p-0 rounded-xl hover:bg-white/5 text-white/40 hover:text-white"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(reg, null, 2))
                            toast.success("Details copied to clipboard")
                          }}
                        >
                          <Search className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredRegistrations.length === 0 && (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No registrations found</h3>
                <p className="text-white/40">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
