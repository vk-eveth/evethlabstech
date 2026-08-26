import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Eveth Labs Tech — Engineering Tomorrow', description: 'A self-hosted remote engineering laboratory building intelligent systems for technology, science, and society.', generator: 'Eveth Labs Tech', icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' } }
export const viewport: Viewport = { colorScheme: 'dark light', themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#07090d' }, { media: '(prefers-color-scheme: light)', color: '#f5f7fb' }] }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="dark bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
