import { prisma } from '@/lib/prisma'

export async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
    return slides.length > 0 ? slides.map(s => ({ imageUrl: s.imageUrl })) : fallbackSlides
  } catch { return fallbackSlides }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
    return services.length > 0 ? services.map(s => ({
      _id: String(s.id),
      title: s.title,
      description: s.description,
      imageUrl: s.imageUrl,
    })) : fallbackServices
  } catch { return fallbackServices }
}

export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    return images.length > 0 ? images.map(g => ({
      src: g.src,
      galleryTitle: g.galleryTitle,
      gallerySlug: g.gallerySlug,
    })) : []
  } catch { return [] }
}

export async function getAwards() {
  try {
    const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } })
    return awards.length > 0 ? awards.map(a => ({
      year: a.year,
      title: a.title,
      org: a.org,
      description: a.description,
    })) : fallbackAwards
  } catch { return fallbackAwards }
}

export async function getStats() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })
    return stats.length > 0 ? stats.map(s => ({
      number: s.number,
      label: s.label,
      desc: s.desc,
    })) : fallbackStats
  } catch { return fallbackStats }
}

export async function getPopupVideo() {
  try {
    const popup = await prisma.popupVideo.findFirst()
    return popup ? { videoUrl: popup.videoUrl, enabled: popup.enabled, delay: popup.delay } : null
  } catch { return null }
}

export async function getSiteSetting(key: string) {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } })
    return setting?.value || null
  } catch { return null }
}

const fallbackSlides = [
  { imageUrl: '/HERO.png' },
  { imageUrl: '/BRIDAL.png' },
  { imageUrl: '/CANDID.png' },
]

const fallbackServices = [
  { _id: '1', title: 'Bridal Photography', description: 'Elegant bridal portraits that capture every detail.', imageUrl: '/BRIDAL.png' },
  { _id: '2', title: 'Candid Photography', description: 'Natural, unposed moments that reflect genuine emotions.', imageUrl: '/CANDID.png' },
  { _id: '3', title: 'Wedding Cinematography', description: 'Cinematic wedding films that bring memories to life.', imageUrl: '/WEDDING.png' },
]

const fallbackAwards = [
  { year: 'National Award', title: 'Wedding Photography', org: 'Government of India', description: '' },
  { year: '2010', title: 'Wedding Photographer of the Year', org: 'Kodak', description: '' },
  { year: '15+ Years', title: 'Award-Winning Excellence', org: 'VIP Studio, Nellore', description: '' },
]

const fallbackStats = [
  { number: '25+', label: 'Years', desc: 'Of Experience' },
  { number: '1500+', label: 'Weddings', desc: 'Captured' },
  { number: 'Award', label: 'Winner', desc: 'National Award' },
]
