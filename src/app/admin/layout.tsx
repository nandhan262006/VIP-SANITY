import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin Dashboard | VIP Studio',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-gray-900 text-sm">
              VIP Studio Admin
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-gray-500 hover:text-red transition">View Site</Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto flex">
        <aside className="w-56 shrink-0 hidden md:block bg-white border-r border-gray-200 min-h-[calc(100vh-3.5rem)]">
          <nav className="p-4 space-y-1 text-sm">
            <Link href="/admin" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition font-medium">Dashboard</Link>
            <Link href="/admin/hero-slides" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Hero Slides</Link>
            <Link href="/admin/services" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Services</Link>
            <Link href="/admin/portfolio" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Portfolio</Link>
            <Link href="/admin/gallery" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Gallery</Link>
            <Link href="/admin/awards" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Awards</Link>
            <Link href="/admin/stats" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Stats</Link>
            <Link href="/admin/popup-video" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Popup Video</Link>
            <Link href="/admin/settings" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Site Settings</Link>
            <Link href="/admin/contacts" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">Contacts</Link>
          </nav>
        </aside>
        <main className="flex-1 px-4 py-8 min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        className="text-xs text-gray-500 hover:text-red transition"
      >
        Logout
      </button>
    </form>
  )
}
