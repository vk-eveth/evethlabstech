import type { MetadataRoute } from 'next'
import { projects } from '@/lib/site-data'

const baseUrl = 'https://www.evethlabstech.com'
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/services', '/projects', '/research', '/team', '/contact']
  const projectPages = projects.filter((project) => !project.externalUrl).map((project) => `/projects/${project.slug}`)
  return [...pages, ...projectPages].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .7 }))
}
