'use client'

import { useEffect, useRef } from 'react'

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const particles = Array.from({ length: 46 }, (_, index) => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00022, vy: (Math.random() - 0.5) * 0.00018,
      radius: index % 5 === 0 ? 1.5 : 0.8, hue: index % 3 === 0 ? 24 : 212,
    }))
    let frame = 0
    let scroll = 0
    let pointer = { x: 0.5, y: 0.5 }
    const resize = () => { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0) }
    const move = (event: MouseEvent) => { pointer = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight } }
    const onScroll = () => { scroll = window.scrollY }
    const draw = () => {
      const width = window.innerWidth, height = window.innerHeight
      context.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        particle.x += particle.vx; particle.y += particle.vy
        if (particle.x < -0.05 || particle.x > 1.05) particle.vx *= -1
        if (particle.y < -0.05 || particle.y > 1.05) particle.vy *= -1
        const x = particle.x * width + (pointer.x - 0.5) * 18
        const y = particle.y * height - scroll * 0.035 + (pointer.y - 0.5) * 10
        context.beginPath(); context.arc(x, y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.hue === 24 ? 'rgba(245,158,69,.55)' : 'rgba(79,140,255,.48)'; context.fill()
      })
      particles.forEach((a, index) => particles.slice(index + 1).forEach((b) => { const distance = Math.hypot((a.x - b.x) * width, (a.y - b.y) * height); if (distance < 150) { context.beginPath(); context.moveTo(a.x * width, a.y * height - scroll * 0.035); context.lineTo(b.x * width, b.y * height - scroll * 0.035); context.strokeStyle = `rgba(128,160,220,${(1 - distance / 150) * .08})`; context.stroke() } }))
      frame = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('mousemove', move); window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); window.removeEventListener('scroll', onScroll) }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const update = () => { if (ref.current) ref.current.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)})` }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

export function ScrollSpy() {
  useEffect(() => { const sections = document.querySelectorAll('main > section'); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.16 }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect() }, [])
  return null
}
