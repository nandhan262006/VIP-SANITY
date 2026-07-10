import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const [contactCount, unreadCount, portfolioCount, slideCount, serviceCount, galleryCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.portfolioItem.count(),
    prisma.heroSlide.count(),
    prisma.service.count(),
    prisma.galleryImage.count(),
  ])

  const stats = [
    { label: 'Hero Slides', count: slideCount, href: '/admin/hero-slides' },
    { label: 'Services', count: serviceCount, href: '/admin/services' },
    { label: 'Portfolio Items', count: portfolioCount, href: '/admin/portfolio' },
    { label: 'Gallery Images', count: galleryCount, href: '/admin/gallery' },
    { label: 'Total Contacts', count: contactCount, href: '/admin/contacts' },
    { label: 'Unread', count: unreadCount, href: '/admin/contacts', highlight: unreadCount > 0 },
  ]

  const recentContacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-red/30 transition">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.highlight ? 'text-red' : 'text-gray-900'}`}>{s.count}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Contact Submissions</h2>
          <Link href="/admin/contacts" className="text-sm text-red hover:text-red-dark transition">View All</Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">No contact submissions yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentContacts.map((c) => (
              <div key={c.id} className="px-6 py-4 flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {c.name}{!c.read && <span className="ml-2 inline-block w-2 h-2 bg-red rounded-full" />}
                  </p>
                  <p className="text-xs text-gray-500">{c.email} &middot; {c.phone || 'No phone'}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.message}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
