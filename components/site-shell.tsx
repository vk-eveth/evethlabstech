'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react'
import { nav } from '@/lib/site-data'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const nextDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    document.documentElement.classList.toggle('light', !nextDark)
  }, [])
  function toggleTheme() {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    document.documentElement.classList.toggle('light', !nextDark)
  }
  return <div className="min-h-screen overflow-hidden bg-background">
    <div className="aurora" aria-hidden="true" /><div className="grid-overlay" aria-hidden="true" />
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"><nav className="glass-nav mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" onClick={() => setOpen(false)}><img src="/images/eveth-labs-logo.png" alt="Eveth Labs Tech" className="brand-logo" /><span>Eveth Labs <span className="text-muted-foreground">Tech</span></span></Link>
      <div className="hidden items-center gap-5 md:flex">{nav.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}<button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button><Link href="/contact" className="nav-cta">Start a conversation <ArrowUpRight size={14} /></Link></div>
      <div className="flex items-center gap-1 md:hidden"><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button><button className="icon-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </nav><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-nav mx-auto mt-2 flex max-w-7xl flex-col gap-2 p-3 md:hidden">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground">{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="nav-cta mt-1 justify-center">Start a conversation <ArrowUpRight size={14} /></Link></motion.div>}</AnimatePresence></header>
    {children}<footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between lg:px-8"><div><Link href="/" className="flex items-center gap-2 font-semibold"><img src="/images/eveth-labs-logo.png" alt="Eveth Labs Tech" className="footer-logo" />Eveth Labs Tech</Link><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Transforming ideas into digital reality. Engineering tomorrow, researching the future.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">{nav.slice(0, 5).map(([label, href]) => <Link key={href} href={href} className="hover:text-foreground">{label}</Link>)}</div><p className="text-xs text-muted-foreground">© 2026 Eveth Labs Tech</p></div></footer></div>
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .6 }}>{children}</motion.div> }
export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1 className="display text-balance">{title}</h1><p className="lead max-w-2xl">{body}</p></section> }
export function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) { return <div className="mb-10 max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="section-title text-balance">{title}</h2>{body && <p className="mt-4 text-muted-foreground leading-7">{body}</p>}</div> }

export default SiteShell
