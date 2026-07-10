import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card } from 'flowbite-react'
import { HiPhoto, HiCog6Tooth, HiBriefcase, HiCube, HiEnvelope, HiBellAlert } from 'react-icons/hi2'

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
    { label: 'Hero Slides', count: slideCount, href: '/admin/hero-slides', icon: HiPhoto, color: 'text-blue-600 bg-blue-100' },
    { label: 'Services', count: serviceCount, href: '/admin/services', icon: HiCog6Tooth, color: 'text-green-600 bg-green-100' },
    { label: 'Portfolio', count: portfolioCount, href: '/admin/portfolio', icon: HiBriefcase, color: 'text-purple-600 bg-purple-100' },
    { label: 'Gallery', count: galleryCount, href: '/admin/gallery', icon: HiCube, color: 'text-orange-600 bg-orange-100' },
    { label: 'Contacts', count: contactCount, href: '/admin/contacts', icon: HiEnvelope, color: 'text-teal-600 bg-teal-100' },
    { label: 'Unread', count: unreadCount, href: '/admin/contacts', icon: HiBellAlert, color: unreadCount > 0 ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100' },
  ]

  const recentContacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.count}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Contacts</h2>
          <Link href="/admin/contacts" className="text-sm text-red-600 hover:underline">View All</Link>
        </div>
        {recentContacts.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">No contact submissions yet</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentContacts.map((c) => (
              <div key={c.id} className="py-3 flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {c.name}{!c.read && <span className="ml-2 inline-block w-2 h-2 bg-red rounded-full" />}
                  </p>
                  <p className="text-xs text-gray-500">{c.email} &middot; {c.phone || 'No phone'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{c.message}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
