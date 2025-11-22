import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Animations
document.addEventListener('DOMContentLoaded', () => {

  // Hero Animations
  const heroTimeline = gsap.timeline()

  heroTimeline
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      }
    )
    .to('.line-inner', {
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    }, '-=0.5')
    .fromTo('.hero-description',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      },
      '-=1'
    )
    .fromTo('.hero-description-en',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      },
      '-=0.8'
    )

  // Scroll Animations for Sections
  const revealElements = document.querySelectorAll('.reveal-text')

  revealElements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })

  // Parallax for Works Images
  const workImages = document.querySelectorAll('.work-image')

  workImages.forEach((image) => {
    gsap.to(image, {
      scrollTrigger: {
        trigger: image.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -50,
      ease: 'none'
    })
  })

  // Navigation Scroll Effect
  const nav = document.querySelector('.nav')
  let lastScroll = 0

  lenis.on('scroll', ({ scroll }) => {
    if (scroll > 100) {
      nav.style.background = 'rgba(5, 5, 5, 0.8)'
      nav.style.backdropFilter = 'blur(10px)'
      nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)'

      if (scroll > lastScroll) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)'
      } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)'
      }
    } else {
      nav.style.background = 'transparent'
      nav.style.backdropFilter = 'none'
      nav.style.borderBottom = 'none'
      nav.style.transform = 'translateY(0)'
    }
    lastScroll = scroll
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle')
  const navMenu = document.querySelector('.nav-menu')

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex'
      if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column'
        navMenu.style.position = 'absolute'
        navMenu.style.top = '100%'
        navMenu.style.left = '0'
        navMenu.style.width = '100%'
        navMenu.style.background = '#050505'
        navMenu.style.padding = '2rem'
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)'
      }
    })
  }
})
