import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check, Code2 } from 'lucide-react'
import { projects } from '@/lib/site-data'
import { Reveal, SiteShell } from '@/components/site-shell'

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })) }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()
  const isPayment = project.slug === 'modular-payment-gateway'

  return <SiteShell><main className="content-page">
    <Link href="/projects" className="inline-link"><ArrowLeft size={15} /> All projects</Link>
    <Reveal><section className={`project-hero accent-${project.accent}`}><div className="flex flex-wrap items-center gap-4"><p className="eyebrow">{project.type}</p>{project.logo && <img src={project.logo} alt={`${project.title} logo`} className="project-logo" />}</div><h1 className="display mt-5 max-w-4xl text-balance">{project.title}</h1><p className="lead mt-7 max-w-2xl">{project.description}</p><div className="mt-9 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></section></Reveal>
    <div className="grid gap-12 border-t border-white/10 pt-10 lg:grid-cols-[1fr_.55fr]"><div><p className="eyebrow">The brief</p><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{isPayment ? 'NoQueue brings the full university fee lifecycle into one secure, API-first platform: from fee configuration and student records to payment orchestration, receipts, loans, and audit-ready reporting.' : 'This project reflects our belief that technical depth and human context belong in the same room. We worked from first principles to shape a system that can operate reliably beyond the prototype.'}</p></div><div className="space-y-6"><div><p className="eyebrow">Status</p><p className="mt-2">{project.status}</p></div><div><p className="eyebrow">Impact alignment</p><p className="mt-2">{project.sdg}</p></div><div className="flex flex-wrap gap-5"><Link href="/contact" className="inline-link">Discuss a similar brief <ArrowUpRight size={15} /></Link>{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-link">View on GitHub <ArrowUpRight size={15} /></a>}</div></div></div>
    {project.features && <section className="mt-16 grid gap-12 border-t border-white/10 pt-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">{isPayment ? 'Capabilities' : 'Platform stack'}</p><h2 className="section-title mt-3 max-w-md">{isPayment ? 'A complete financial operating layer for universities.' : 'Everything needed to ship with confidence.'}</h2></div><div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{project.features.map((feature) => <div className="flex gap-3" key={feature}><Check className="mt-1 shrink-0 text-primary" size={17} /><p className="text-muted-foreground leading-7">{feature}</p></div>)}</div></section>}
    {project.stack && <section className="mt-16 border-t border-white/10 pt-10"><div className="mb-8 flex items-center gap-3"><Code2 className="text-primary" size={18} /><p className="eyebrow">Technical foundation</p></div><div className="grid gap-4 sm:grid-cols-2">{project.stack.map((item) => <div className="glass-card p-5" key={item.label}><p className="text-sm font-medium">{item.label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.value}</p></div>)}</div></section>}
    {project.modules && <section className="mt-16 border-t border-white/10 pt-10"><p className="eyebrow">System modules</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{project.modules.map((module) => <div className="glass-card p-6" key={module.title}><h3 className="text-lg font-medium">{module.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{module.description}</p></div>)}</div></section>}
    {project.api && <section className="mt-16 border-t border-white/10 pt-10"><p className="eyebrow">API surface</p><div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5 font-mono text-xs leading-7 text-muted-foreground">{project.api.map((endpoint) => <p key={endpoint}>{endpoint}</p>)}</div></section>}
    {project.details && <section className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">{project.details.map((detail) => <div key={detail.label}><p className="eyebrow">{detail.label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{detail.value}</p></div>)}</section>}
    <section className="mt-20 border-t border-white/10 pt-10"><p className="eyebrow">Next step</p><h2 className="section-title mt-3 max-w-xl">Have a complex system to make real?</h2><Link href="/contact" className="nav-cta mt-7 inline-flex">Start a conversation <ArrowUpRight size={14} /></Link></section>
  </main></SiteShell>
}

