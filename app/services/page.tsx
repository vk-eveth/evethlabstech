import { ArrowUpRight, Check, Compass, Layers3, Sparkles } from 'lucide-react'
import { services } from '@/lib/site-data'
import { PageIntro, Reveal, SiteShell } from '@/components/site-shell'

const outcomes = [
  ['01', 'Clarity before code', 'We translate complex needs into a shared direction, practical scope, and decisions that teams can act on.'],
  ['02', 'Systems that endure', 'We design for maintainability, security, accessibility, and the realities of the people who will use the system.'],
  ['03', 'Impact by intention', 'We keep social value, SDG alignment, research quality, and long-term capability visible throughout delivery.'],
]
const process = [
  ['01', 'Frame', 'Understand the context, stakeholders, constraints, and the outcome that matters.'],
  ['02', 'Shape', 'Map the architecture, experience, research questions, and path from first experiment to useful system.'],
  ['03', 'Build', 'Develop in focused increments with validation, documentation, observability, and honest feedback loops.'],
  ['04', 'Enable', 'Leave behind a stronger foundation: knowledge, infrastructure, and a team ready to continue the work.'],
]

export default function ServicesPage() {
  return <SiteShell><main className="content-page services-page">
    <PageIntro eyebrow="Capabilities / Mission-led practice" title="Technical depth in service of meaningful progress." body="Eveth Labs Tech brings engineering, scientific thinking, and social purpose into the same room. We help organizations, communities, and emerging ventures move from difficult questions to useful systems." />
    <Reveal><section className="services-positioning glass-card"><div><p className="eyebrow">A different kind of partner</p><h2>We do not separate the system from the people it is meant to serve.</h2><p>Our services are a way to make the mission practical: strengthen institutions, widen access, support research, and create technology that can be understood and carried forward.</p></div><div className="services-signal"><Compass size={26} aria-hidden="true" /><span>CONTEXT → SYSTEM → IMPACT</span></div></section></Reveal>
    <section className="services-capabilities"><div className="services-section-heading"><div><p className="eyebrow">01 / Capability map</p><h2>From first principle to working reality.</h2></div><p>Engage us for a focused technical need or bring a broader challenge that needs interdisciplinary thinking.</p></div><div className="services-grid">{services.map(([num,title,copy]) => <Reveal key={num}><article className="glass-card service-detail"><span className="service-number">{num}</span><h3>{title}</h3><p>{copy}</p><ul><li><Check size={14} aria-hidden="true" /> Context-led discovery</li><li><Check size={14} aria-hidden="true" /> Maintainable foundations</li><li><Check size={14} aria-hidden="true" /> Knowledge transfer</li></ul></article></Reveal>)}</div></section>
    <section className="services-outcomes"><div className="services-section-heading"><div><p className="eyebrow">02 / What the work creates</p><h2>More than a deliverable.</h2></div><p>The strongest engagement leaves people, systems, and possibilities in a better position than where they started.</p></div><div className="services-outcome-grid">{outcomes.map(([num,title,copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="services-process"><div className="services-section-heading"><div><p className="eyebrow">03 / Engagement model</p><h2>A clear path through complexity.</h2></div><p>Every project is shaped to its context, but our working rhythm stays transparent and collaborative.</p></div><div className="services-process-grid">{process.map(([num,title,copy]) => <article key={num}><span>{num}</span><Layers3 size={17} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <Reveal><section className="services-cta glass-card"><div><Sparkles size={22} aria-hidden="true" /><p className="eyebrow">04 / Open collaboration</p><h2>Bring the question behind the brief.</h2><p>Whether you need a platform, a research partner, or a thoughtful technical review, start with the problem you are trying to make better.</p></div><a href="/contact" className="inline-link">Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></a></section></Reveal>
  </main></SiteShell>
}
