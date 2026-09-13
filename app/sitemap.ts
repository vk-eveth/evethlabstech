import type { MetadataRoute } from 'next'
import { projects } from '@/lib/site-data'

const baseUrl = 'https://www.evethlabstech.com'
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{ path: '', priority: 1, changeFrequency: 'weekly' as const }, { path: '/about', priority: .9, changeFrequency: 'monthly' as const }, { path: '/services', priority: .85, changeFrequency: 'monthly' as const }, { path: '/projects', priority: .9, changeFrequency: 'weekly' as const }, { path: '/research', priority: .9, changeFrequency: 'weekly' as const }, { path: '/team', priority: .8, changeFrequency: 'monthly' as const }, { path: '/contact', priority: .75, changeFrequency: 'monthly' as const }]
  const projectPages = projects.filter((project) => !project.externalUrl).map((project) => ({ path: `/projects/${project.slug}`, priority: .7, changeFrequency: 'monthly' as const }))
  const lastModified = new Date('2026-09-14T00:00:00.000Z')
  return [...pages, ...projectPages].map(({ path, priority, changeFrequency }) => ({ url: `${baseUrl}${path}`, lastModified, changeFrequency, priority }))
}
