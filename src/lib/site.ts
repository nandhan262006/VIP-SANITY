import { prisma } from '@/lib/prisma'

export async function getHeroSlides() {
  const slides = await prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  return slides.length > 0 ? slides.map(s => ({ imageUrl: s.imageUrl })) : []
}

export async function getServices() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  return services.length > 0 ? services.map(s => ({
    _id: String(s.id),
    title: s.title,
    description: s.description,
    imageUrl: s.imageUrl,
  })) : []
}

export async function getGalleryImages() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
  return images.length > 0 ? images.map(g => ({
    src: g.src,
    galleryTitle: g.galleryTitle,
    gallerySlug: g.gallerySlug,
  })) : []
}

export async function getAwards() {
  const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } })
  return awards.length > 0 ? awards.map(a => ({
    year: a.year,
    title: a.title,
    org: a.org,
    description: a.description,
  })) : []
}

export async function getStats() {
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })
  return stats.length > 0 ? stats.map(s => ({
    number: s.number,
    label: s.label,
    desc: s.desc,
  })) : []
}

export async function getPopupVideo() {
  const popup = await prisma.popupVideo.findFirst()
  return popup ? { videoUrl: popup.videoUrl, enabled: popup.enabled, delay: popup.delay } : null
}

export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({ where: { key } })
  return setting?.value || null
}
