import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '@/lib/site-data'
import { PageIntro, Reveal, SiteShell } from '@/components/site-shell'

export default function ProjectsPage() {
  return (
    <SiteShell>
      <main className="content-page">
        <PageIntro eyebrow="Selected work" title="Building production-ready systems." body="A selection of platforms, infrastructure, research, and prototypes built from first principles." />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const href = project.externalUrl ?? `/projects/${project.slug}`
            const isExternal = Boolean(project.externalUrl)
            return (
              <Reveal key={project.slug}>
                <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined} className={`project-card tall accent-${project.accent}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="project-type">{project.type}</span>
                    {isExternal ? <ExternalLink size={17} className="text-muted-foreground" aria-hidden="true" /> : <ArrowUpRight size={17} className="text-muted-foreground" aria-hidden="true" />}
                  </div>
                  <h2 className="mt-16 flex items-center gap-3 text-2xl font-medium tracking-tight">
                    {project.title}
                    {project.logo ? <img src={project.logo} alt={`${project.title} logo`} className="project-logo" /> : null}
                  </h2>
                  <p className="mt-4 max-w-lg leading-7 text-muted-foreground">{project.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <p className="mt-8 text-xs uppercase tracking-[.15em] text-muted-foreground">{project.status} · {project.sdg}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">{isExternal ? 'Visit project' : 'Explore project'} <ArrowUpRight size={15} aria-hidden="true" /></span>
                </a>
              </Reveal>
            )
          })}
        </div>
      </main>
    </SiteShell>
  )
}
