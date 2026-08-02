'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Wrench,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  Users,
  Heart,
  Zap,
  Droplet,
  Wind,
  Toolbox,
  AlertCircle,
  Clock,
  TrendingUp,
  Award,
  Shield,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

interface User {
  id: string
  role: 'customer' | 'technician' | 'admin'
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null)
  const [isClient, setIsClient] = useState(false)

      const pathname=usePathname()
     const hiddenPaths = ["/auth/login", "/auth/register"];
   
     if (hiddenPaths.some((path) => pathname.startsWith(path))) {
       return null;
     }

  // useEffect(() => {
  //   setIsClient(true)
  //   // Simulate checking auth state
  //   const userRole = localStorage.getItem('userRole')
  //   if (userRole) {
  //     setUser({
  //       id: 'user-123',
  //       role: userRole as any,
  //     })
  //   }
  // }, [])

  // if (!isClient) return null

  const currentYear = new Date().getFullYear()

 

  // Dynamic links based on user role
  const getFooterLinks = () => {
    const baseLinks = [
      { category: 'Platform', links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Technicians', href: '/technicians' },
        { label: 'About Us', href: '/about' },
      ]},
      { category: 'Support', links: [
        { label: 'Help Center', href: '/faq' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
      ]},
    ]

    if (user?.role === 'customer') {
      return [
        ...baseLinks,
        { category: 'Customer', links: [
          { label: 'Dashboard', href: '/dashboard/customer' },
          { label: 'My Bookings', href: '/dashboard/customer/bookings' },
          { label: 'My Reviews', href: '/dashboard/customer/reviews' },
        ]}
      ]
    }

    if (user?.role === 'technician') {
      return [
        ...baseLinks,
        { category: 'Technician', links: [
          { label: 'Dashboard', href: '/dashboard/technician' },
          { label: 'My Services', href: '/dashboard/technician/services' },
          { label: 'Earnings', href: '/dashboard/technician/earnings' },
        ]}
      ]
    }

    if (user?.role === 'admin') {
      return [
        ...baseLinks,
        { category: 'Admin', links: [
          { label: 'Admin Panel', href: '/dashboard/admin' },
          { label: 'Statistics', href: '/dashboard/admin/statistics' },
          { label: 'User Management', href: '/dashboard/admin/users' },
        ]}
      ]
    }

    return baseLinks
  }

  const footerLinks = getFooterLinks()

  return (
    <footer className="relative mt-20 backdrop-blur-md bg-gradient-to-t from-slate-900/80 via-slate-900/60 to-transparent border-t border-white/10">
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                FixItNow
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Connect with trusted technicians for all your service needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@fixitnow.com" className="text-sm hover:underline">
                  support@fixitnow.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <a href="tel:+1-800-FIX-NOW" className="text-sm hover:underline">
                  +1-800-FIX-NOW
                </a>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  123 Main St, Service City<br />
                  SC 12345, USA
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links - Dynamic based on user role */}
          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 flex items-start gap-4 group">
            <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
              <AlertCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Emergency Available</p>
              <p className="text-xs text-gray-400">24/7 emergency services</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 flex items-start gap-4 group">
            <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Verified Pros</p>
              <p className="text-xs text-gray-400">All technicians certified</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 flex items-start gap-4 group">
            <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Guaranteed</p>
              <p className="text-xs text-gray-400">Work satisfaction assured</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 flex items-start gap-4 group">
            <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
              <Heart className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Customer Loved</p>
              <p className="text-xs text-gray-400">Join thousands happy</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8">
          {/* Copyright & Status */}
          <div className="flex flex-col sm:flex-row gap-4 items-center text-gray-400 text-sm">
            <span>© {currentYear} FixItNow. All rights reserved.</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-all duration-300 group"
              aria-label="Newsletter"
              title="Subscribe to newsletter"
            >
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-all duration-300 group"
              aria-label="Reviews"
              title="Read reviews"
            >
              <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
              aria-label="Community"
              title="Join community"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-pink-400 transition-all duration-300 group"
              aria-label="Support Us"
              title="Support us"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* User Role Indicator Badge (for demo) */}
      {user && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-xs font-medium text-blue-300">
          Logged in as {user.role}
        </div>
      )}
    </footer>
  )
}
