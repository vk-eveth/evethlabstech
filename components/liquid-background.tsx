'use client'

import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; warm: boolean }

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const particles: Particle[] = Array.from({ length: 86 }, (_, i) => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0002, vy: (Math.random() - .5) * .00016, radius: i % 9 === 0 ? 2.5 : 1, warm: i % 3 === 0 }))
    const stars = Array.from({ length: 120 }, () => ({ x: Math.random(), y: Math.random(), size: Math.random() * 1.6 + .3, depth: Math.random() * .8 + .2 }))
    const streams = Array.from({ length: 15 }, (_, i) => ({ x: (i + Math.random()) / 15, y: Math.random(), speed: Math.random() * .0008 + .0003, label: ['0101', 'NODE', 'EVETH', 'SYNC'][i % 4] }))
    let width = 0, height = 0, dpr = 1, raf = 0, scroll = 0, time = 0, px = .5, py = .5
    const resize = () => { width = innerWidth; height = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const draw = () => {
      const dark = document.documentElement.classList.contains('dark') || (!document.documentElement.classList.contains('light') && matchMedia('(prefers-color-scheme: dark)').matches)
      time += matchMedia('(prefers-reduced-motion: reduce)').matches ? .002 : .012
      ctx.clearRect(0, 0, width, height)
      const mesh = ctx.createLinearGradient(width * (.05 + Math.sin(time * .4) * .2), 0, width * (.95 + Math.cos(time * .3) * .1), height)
      mesh.addColorStop(0, dark ? 'rgba(245,158,69,.2)' : 'rgba(245,158,69,.22)'); mesh.addColorStop(.42, dark ? 'rgba(95,90,255,.14)' : 'rgba(95,90,255,.15)'); mesh.addColorStop(.72, dark ? 'rgba(35,95,213,.17)' : 'rgba(35,95,213,.14)'); mesh.addColorStop(1, 'transparent'); ctx.fillStyle = mesh; ctx.fillRect(0, 0, width, height)
      const wave = ctx.createRadialGradient(width * (.5 + Math.sin(time) * .3), height * (.42 + Math.cos(time * .7) * .2), 0, width * .5, height * .5, width * .85); wave.addColorStop(0, dark ? 'rgba(79,140,255,.13)' : 'rgba(79,140,255,.1)'); wave.addColorStop(1, 'transparent'); ctx.fillStyle = wave; ctx.fillRect(0, 0, width, height)
      ctx.save(); ctx.strokeStyle = dark ? 'rgba(150,181,240,.15)' : 'rgba(55,84,135,.18)'; ctx.lineWidth = .6; for (let x = 0; x < width; x += 64) { ctx.beginPath(); ctx.moveTo(x + (px - .5) * 16, 0); ctx.lineTo(x + (px - .5) * 16, height); ctx.stroke() } for (let y = -(scroll * .05 % 64); y < height; y += 64) { ctx.beginPath(); ctx.moveTo(0, y + (py - .5) * 12); ctx.lineTo(width, y + (py - .5) * 12); ctx.stroke() } ctx.restore()
      ctx.save(); ctx.globalAlpha = dark ? .55 : .3; stars.forEach(s => { const y = (s.y * height - scroll * s.depth * .026) % height; ctx.fillStyle = dark ? '#d9e8ff' : '#3d5684'; ctx.beginPath(); ctx.arc(s.x * width + (px - .5) * 34 * s.depth, y < 0 ? y + height : y, s.size, 0, Math.PI * 2); ctx.fill() }); ctx.restore()
      streams.forEach(s => { s.y = (s.y + s.speed) % 1; const x = s.x * width + (px - .5) * 26, y = s.y * height; ctx.save(); ctx.globalAlpha = dark ? .28 : .15; ctx.strokeStyle = dark ? '#4f8cff' : '#235fd5'; ctx.fillStyle = ctx.strokeStyle; ctx.font = '9px monospace'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 120); ctx.stroke(); ctx.fillText(s.label, x + 5, y + 18); ctx.restore() })
      particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < -.04 || p.x > 1.04) p.vx *= -1; if (p.y < -.04 || p.y > 1.04) p.vy *= -1; const x = p.x * width + (px - .5) * 30, y = p.y * height - scroll * .035 + (py - .5) * 18; ctx.fillStyle = p.warm ? (dark ? 'rgba(245,158,69,.95)' : 'rgba(217,108,47,.85)') : (dark ? 'rgba(79,140,255,.9)' : 'rgba(35,95,213,.75)'); ctx.shadowBlur = 14; ctx.shadowColor = ctx.fillStyle; ctx.beginPath(); ctx.arc(x, y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0 })
      particles.forEach((a, i) => particles.slice(i + 1).forEach(b => { const d = Math.hypot((a.x - b.x) * width, (a.y - b.y) * height); if (d < 180) { ctx.strokeStyle = dark ? `rgba(128,160,220,${(1 - d / 180) * .22})` : `rgba(44,91,150,${(1 - d / 180) * .18})`; ctx.beginPath(); ctx.moveTo(a.x * width + (px - .5) * 30, a.y * height - scroll * .035); ctx.lineTo(b.x * width + (px - .5) * 30, b.y * height - scroll * .035); ctx.stroke() } }))
      const orb = (x: number, y: number, r: number, color: string) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, color); g.addColorStop(1, 'transparent'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2) }; orb(width * (.14 + Math.sin(time * .7) * .05), height * .34 - scroll * .02, 190, dark ? 'rgba(245,158,69,.24)' : 'rgba(245,158,69,.2)'); orb(width * (.86 + Math.cos(time * .5) * .03), height * .65 - scroll * .03, 220, dark ? 'rgba(79,140,255,.22)' : 'rgba(35,95,213,.18)')
      ctx.save(); ctx.translate(width * (.82 + (px - .5) * .05), height * .28 - scroll * .0002); ctx.rotate(time * .08); ctx.strokeStyle = dark ? 'rgba(103,232,249,.5)' : 'rgba(35,95,213,.38)'; ctx.lineWidth = 1.5; [80, 52].forEach((r, i) => { ctx.beginPath(); for (let n = 0; n <= (i ? 3 : 6); n++) { const a = time * (i ? 1 : 0) + Math.PI * 2 * n / (i ? 3 : 6); n ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) } ctx.stroke() }); ctx.restore()
      const beam = ctx.createLinearGradient(0, 0, width * .65, height * .6); beam.addColorStop(0, dark ? 'rgba(245,158,69,.24)' : 'rgba(245,158,69,.18)'); beam.addColorStop(.35, dark ? 'rgba(79,140,255,.08)' : 'rgba(79,140,255,.08)'); beam.addColorStop(1, 'transparent'); ctx.fillStyle = beam; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(width * .78, 0); ctx.lineTo(0, height * .7); ctx.fill()
      raf = requestAnimationFrame(draw)
    }
    resize(); draw(); const onMove = (e: MouseEvent) => { px = e.clientX / width; py = e.clientY / height }; const onScroll = () => { scroll = scrollY }; addEventListener('resize', resize); addEventListener('mousemove', onMove); addEventListener('scroll', onScroll, { passive: true }); return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', onMove); removeEventListener('scroll', onScroll) }
  }, [])
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

export function ScrollProgress() { const ref = useRef<HTMLDivElement>(null); useEffect(() => { const update = () => { if (ref.current) ref.current.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})` }; update(); addEventListener('scroll', update, { passive: true }); return () => removeEventListener('scroll', update) }, []); return <div ref={ref} className="scroll-progress" aria-hidden="true" /> }
export function ScrollSpy() { useEffect(() => { const sections = document.querySelectorAll('main > section'); const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .16 }); sections.forEach(section => observer.observe(section)); return () => observer.disconnect() }, []); return null }
export default LiquidBackground
