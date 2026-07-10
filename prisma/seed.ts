import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const url = process.env.DATABASE_URL || 'file:./dev.db'
const adapter = new PrismaBetterSqlite3({ url })
const prisma = new PrismaClient({ adapter })

async function main() {
  if (await prisma.heroSlide.count() === 0) {
    for (const src of ['/BRIDAL.png', '/CANDID.png', '/ENGAGEMENT.png', '/WEDDING.png', '/PREWEDDING.png', '/MATERNITY.png', '/HERO.png']) {
      await prisma.heroSlide.create({ data: { imageUrl: src, order: 0 } })
    }
  }

  if (await prisma.service.count() === 0) {
    const services = [
      { title: 'Bridal Photography', description: 'Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.', imageUrl: '/BRIDAL.png' },
      { title: 'Engagement Photography', description: 'Beautiful engagement shoots that tell your love story against stunning backdrops.', imageUrl: '/ENGAGEMENT.png' },
      { title: 'Candid Photography', description: 'Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.', imageUrl: '/CANDID.png' },
      { title: 'Wedding Cinematography', description: 'Cinematic wedding films that bring your most cherished memories to life with stunning visuals.', imageUrl: '/WEDDING.png' },
      { title: 'Pre-Wedding Shoot', description: 'Creative pre-wedding sessions at handpicked locations that capture your unique bond.', imageUrl: '/PREWEDDING.png' },
      { title: 'Event Photography', description: 'Professional coverage for engagements, receptions, and all your special celebrations.', imageUrl: '/CORPERATE.png' },
    ]
    for (const s of services) {
      await prisma.service.create({ data: { ...s, order: 0 } })
    }
  }

  if (await prisma.galleryImage.count() === 0) {
    const gallery = [
      { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
      { src: '/CANDID.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
      { src: '/ENGAGEMENT.png', galleryTitle: 'Engagement Photography', gallerySlug: 'engagement' },
      { src: '/WEDDING.png', galleryTitle: 'Wedding Cinematography', gallerySlug: 'wedding' },
      { src: '/PREWEDDING.png', galleryTitle: 'Pre-Wedding Shoot', gallerySlug: 'prewedding' },
      { src: '/CORPERATE.png', galleryTitle: 'Event Photography', gallerySlug: 'events' },
      { src: '/HERO.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
      { src: '/MATERNITY.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
      { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
    ]
    for (const g of gallery) {
      await prisma.galleryImage.create({ data: { ...g, order: 0 } })
    }
  }

  if (await prisma.award.count() === 0) {
    const awards = [
      { year: '2010', title: 'Wedding Photographer of the Year', org: 'Kodak', description: 'Recognized as the top wedding photographer in India for exceptional candid wedding photography and storytelling through the lens.' },
      { year: '2009', title: 'National Award — Wedding Photography', org: 'Government of India', description: 'Prestigious national recognition for outstanding contribution to wedding photography and cinematography.' },
      { year: '2015', title: '15 Years of Excellence', org: 'VIP Studio', description: 'Celebrating a decade and a half of capturing beautiful wedding stories across Nellore and Andhra Pradesh.' },
      { year: '2020', title: '20+ Years of Service Excellence', org: 'VIP Studio', description: 'Two decades of trusted wedding photography services, earning the reputation as the best photographer in Nellore.' },
      { year: '2024', title: 'Top Rated Photographer Nellore', org: 'Google Reviews', description: 'Consistently rated 4.9 stars by couples and families for exceptional wedding photography and cinematography.' },
    ]
    for (const a of awards) {
      await prisma.award.create({ data: { ...a, order: 0 } })
    }
  }

  if (await prisma.stat.count() === 0) {
    const stats = [
      { number: '25+', label: 'Years of Experience', desc: 'Serving Nellore since 2000' },
      { number: '500+', label: 'Weddings Captured', desc: 'Trusted by families across Andhra' },
      { number: '4.9', label: 'Google Rating', desc: '180+ 5-star reviews' },
      { number: '15+', label: 'Award Wins', desc: 'National & industry recognition' },
    ]
    for (const s of stats) {
      await prisma.stat.create({ data: { ...s, order: 0 } })
    }
  }

  if (await prisma.popupVideo.count() === 0) {
    await prisma.popupVideo.create({ data: { videoUrl: '/POPUP.mp4', enabled: true, delay: 10 } })
  }

  if (await prisma.siteSetting.count() === 0) {
    const settings = [
      { key: 'whatsapp', value: '919299950999' },
      { key: 'phone', value: '+919299950999' },
      { key: 'address', value: '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003' },
      { key: 'instagram', value: 'https://www.instagram.com/vipevents_nellore/' },
      { key: 'facebook', value: 'https://www.facebook.com/VIPweddingsnellore' },
      { key: 'youtube', value: 'https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7' },
      { key: 'google_maps', value: 'https://maps.app.goo.gl/VEJbmw21SPY4QaDY9' },
      { key: 'email', value: 'contact@vipstudio.com' },
    ]
    for (const s of settings) {
      await prisma.siteSetting.create({ data: s })
    }
  }

  console.log('Seed completed successfully')
}

main().catch(console.error)
