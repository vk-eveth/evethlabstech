import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://www.evethlabstech.com/sitemap.xml', host: 'https://www.evethlabstech.com' }
}
