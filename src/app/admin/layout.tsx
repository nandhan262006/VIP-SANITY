'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem, Navbar, Button } from 'flowbite-react'
import {
  HiHome, HiPhoto, HiCog6Tooth, HiCog8Tooth, HiBriefcase, HiHeart,
  HiChartBar, HiCube, HiVideoCamera, HiEnvelope, HiArrowRightOnRectangle,
  HiBars3, HiXMark, HiEye
} from 'react-icons/hi2'


const navItems = [
  { heading: 'Dashboard' },
  { label: 'Dashboard', href: '/admin', icon: HiHome },
  { heading: 'Content' },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: HiPhoto },
  { label: 'Services', href: '/admin/services', icon: HiCog6Tooth },
  { label: 'Portfolio', href: '/admin/portfolio', icon: HiBriefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: HiCube },
  { heading: 'Site' },
  { label: 'Awards', href: '/admin/awards', icon: HiHeart },
  { label: 'Stats', href: '/admin/stats', icon: HiChartBar },
  { label: 'Popup Video', href: '/admin/popup-video', icon: HiVideoCamera },
  { label: 'Settings', href: '/admin/settings', icon: HiCog8Tooth },
  { heading: 'Messages' },
  { label: 'Contacts', href: '/admin/contacts', icon: HiEnvelope },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'w-[72px]' : 'w-64'}`}>
          <Sidebar className="h-full border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-4">
              {!collapsed && (
                <Link href="/admin" className="text-lg font-bold text-gray-900 dark:text-white">
                  VIP Studio
                </Link>
              )}
              <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiBars3 className="h-5 w-5 text-gray-500" />
              </button>
              <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 rounded hover:bg-gray-100">
                <HiXMark className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <SidebarItems className="px-2">
              <SidebarItemGroup>
                {navItems.map((item, i) => {
                  if ('heading' in item) {
                    return !collapsed ? (
                      <li key={i} className="mt-4 mb-1 px-3 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
                        {item.heading}
                      </li>
                    ) : <li key={i} className="my-2 border-t border-gray-200 dark:border-gray-700" />
                  }
                  const isActive = pathname === item.href
                  return (
                    <SidebarItem
                      key={item.href}
                      as={Link}
                      href={item.href}
                      icon={item.icon}
                      active={isActive}
                      className={isActive ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : ''}
                    >
                      {!collapsed && item.label}
                    </SidebarItem>
                  )
                })}
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </aside>

        {/* Main content */}
        <div className={`transition-all ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
          {/* Top navbar */}
          <Navbar fluid className="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                color="gray"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <HiBars3 className="h-5 w-5" />
              </Button>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Admin Panel</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" target="_blank">
                <Button size="sm" color="gray">
                  <HiEye className="mr-1 h-4 w-4" />
                  View Site
                </Button>
              </Link>
              <form action="/api/auth/logout" method="POST">
                <Button size="sm" color="gray" type="submit">
                  <HiArrowRightOnRectangle className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </div>
          </Navbar>

          {/* Page content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
