'use client'

import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; hue: 'warm' | 'cool' }

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const particles: Particle[] = Array.from({ length: 58 }, (_, index) => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00018, vy: (Math.random() - .5) * .00014, radius: index % 7 === 0 ? 1.8 : .85, hue: index % 3 === 0 ? 'warm' : 'cool' }))
    const stars = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), size: Math.random() * 1.4 + .25, depth: Math.random() * .8 + .2 }))
    const streams = Array.from({ length: 14 }, (_, index) => ({ x: (index + Math.random()) / 14, y: Math.random(), speed: Math.random() * .0008 + .00035, length: Math.random() * 90 + 30 }))
    let width = 0, height = 0, dpr = 1, frame = 0, scroll = 0, time = 0
    let pointer = { x: .5, y: .5 }
    const resize = () => { width = window.innerWidth; height = window.innerHeight; dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const move = (event: MouseEvent) => { pointer = { x: event.clientX / width, y: event.clientY / height } }
    const onScroll = () => { scroll = window.scrollY }
    const drawGrid = (dark: boolean) => { context.save(); context.globalAlpha = dark ? .055 : .075; context.strokeStyle = dark ? '#a9c8ff' : '#274878'; context.lineWidth = .5; const step = 72; const drift = (scroll * .035) % step; for (let x = -step; x < width + step; x += step) { context.beginPath(); context.moveTo(x + (pointer.x - .5) * 10, 0); context.lineTo(x + (pointer.x - .5) * 10, height); context.stroke() } for (let y = -step; y < height + step; y += step) { context.beginPath(); context.moveTo(0, y + drift + (pointer.y - .5) * 8); context.lineTo(width, y + drift + (pointer.y - .5) * 8); context.stroke() } context.restore() }
    const drawCircuit = (dark: boolean) => { context.save(); context.globalAlpha = dark ? .12 : .1; context.strokeStyle = dark ? '#4f8cff' : '#235fd5'; context.lineWidth = 1; for (let i = 0; i < 7; i++) { const y = ((i + 1) / 8) * height - (scroll * .08) % 110; const start = (i * 173 + pointer.x * 30) % width; context.beginPath(); context.moveTo(start, y); context.lineTo(start + 70, y); context.lineTo(start + 92, y - 22); context.lineTo(start + 150, y - 22); context.stroke(); context.beginPath(); context.arc(start + 150, y - 22, 2.5, 0, Math.PI * 2); context.fillStyle = dark ? '#f59e45' : '#d96c2f'; context.fill() } context.restore() }
    const draw = () => { time += reduced.matches ? .002 : .012; const dark = document.documentElement.classList.contains('dark') || (!document.documentElement.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches); context.clearRect(0, 0, width, height)
      const mesh = context.createRadialGradient(width * (.24 + Math.sin(time) * .08), height * .16, 10, width * .24, height * .16, width * .7); mesh.addColorStop(0, dark ? 'rgba(245,158,69,.11)' : 'rgba(245,158,69,.16)'); mesh.addColorStop(.5, dark ? 'rgba(111,92,255,.07)' : 'rgba(111,92,255,.1)'); mesh.addColorStop(1, 'transparent'); context.fillStyle = mesh; context.fillRect(0, 0, width, height)
      drawGrid(dark); drawCircuit(dark)
      context.save(); context.globalAlpha = dark ? .32 : .2; stars.forEach((star) => { const x = star.x * width + (pointer.x - .5) * star.depth * 24; const y = (star.y * height - scroll * star.depth * .018) % height; context.fillStyle = dark ? '#d9e8ff' : '#49628b'; context.beginPath(); context.arc(x, y < 0 ? y + height : y, star.size, 0, Math.PI * 2); context.fill() }); context.restore()
      streams.forEach((stream) => { stream.y = (stream.y + stream.speed * (reduced.matches ? .15 : 1)) % 1; const x = stream.x * width + (pointer.x - .5) * 20; context.save(); context.globalAlpha = dark ? .11 : .065; context.strokeStyle = dark ? '#4f8cff' : '#235fd5'; context.lineWidth = .7; context.beginPath(); context.moveTo(x, stream.y * height); context.lineTo(x, stream.y * height + stream.length); context.stroke(); context.restore() })
      particles.forEach((particle) => { particle.x += particle.vx; particle.y += particle.vy; if (particle.x < -.05 || particle.x > 1.05) particle.vx *= -1; if (particle.y < -.05 || particle.y > 1.05) particle.vy *= -1; const x = particle.x * width + (pointer.x - .5) * 24; const y = particle.y * height - scroll * .035 + (pointer.y - .5) * 14; context.beginPath(); context.arc(x, y, particle.radius, 0, Math.PI * 2); context.fillStyle = particle.hue === 'warm' ? (dark ? 'rgba(245,158,69,.75)' : 'rgba(217,108,47,.62)') : (dark ? 'rgba(79,140,255,.72)' : 'rgba(35,95,213,.55)'); context.fill() })
      particles.forEach((a, index) => particles.slice(index + 1).forEach((b) => { const distance = Math.hypot((a.x - b.x) * width, (a.y - b.y) * height); if (distance < 155) { context.beginPath(); context.moveTo(a.x * width, a.y * height - scroll * .035); context.lineTo(b.x * width, b.y * height - scroll * .035); context.strokeStyle = dark ? `rgba(128,160,220,${(1 - distance / 155) * .12})` : `rgba(44,91,150,${(1 - distance / 155) * .1})`; context.stroke() } }))
      const orb = (x: number, y: number, radius: number, color: string) => { const gradient = context.createRadialGradient(x, y, 0, x, y, radius); gradient.addColorStop(0, color); gradient.addColorStop(1, 'transparent'); context.fillStyle = gradient; context.fillRect(x - radius, y - radius, radius * 2, radius * 2) }; orb(width * (.16 + Math.sin(time * .7) * .03), height * .36 - scroll * .02, 130, dark ? 'rgba(245,158,69,.1)' : 'rgba(245,158,69,.14)'); orb(width * (.85 + Math.cos(time * .5) * .025), height * .63 - scroll * .03, 170, dark ? 'rgba(79,140,255,.1)' : 'rgba(35,95,213,.1)')
      context.save(); context.translate(width * .82 + (pointer.x - .5) * 35, height * .26 - scroll * .06); context.rotate(time * .08); context.strokeStyle = dark ? 'rgba(103,232,249,.18)' : 'rgba(35,95,213,.18)'; context.lineWidth = 1; context.beginPath(); context.moveTo(0, -62); context.lineTo(52, 28); context.lineTo(-52, 28); context.closePath(); context.stroke(); context.beginPath(); context.moveTo(0, 62); context.lineTo(52, -28); context.lineTo(-52, -28); context.closePath(); context.stroke(); context.restore()
      const beam = context.createLinearGradient(0, 0, width * .45, height * .55); beam.addColorStop(0, dark ? 'rgba(245,158,69,.13)' : 'rgba(245,158,69,.1)'); beam.addColorStop(1, 'transparent'); context.fillStyle = beam; context.beginPath(); context.moveTo(0, 0); context.lineTo(width * .6, 0); context.lineTo(0, height * .5); context.fill(); context.restore?.(); frame = requestAnimationFrame(draw) }
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('mousemove', move); window.addEventListener('scroll', onScroll, { passive: true }); return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); window.removeEventListener('scroll', onScroll) }
  }, [])
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

export function ScrollProgress() { const ref = useRef<HTMLDivElement>(null); useEffect(() => { const update = () => { if (ref.current) ref.current.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)})` }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, []); return <div ref={ref} className="scroll-progress" aria-hidden="true" /> }
export function ScrollSpy() { useEffect(() => { const sections = document.querySelectorAll('main > section'); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .16 }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect() }, []); return null }

export default LiquidBackground
