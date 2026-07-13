'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ParallaxBackground from '@/components/ParallaxBackground';
import ProjectFolder from '@/components/ProjectFolder';
import MinimalCanvas from '@/components/MinimalCanvas';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  title: string;
  img: string;
  desc: string;
}

interface GalleryData {
  [key: string]: GalleryItem[];
}

const galleryData: GalleryData = {
  restaurants: [
    { id: 'bella', title: "Bella's Restaurant", img: 'placeholder-bella.webp', desc: 'Brand Identity & Web Design' },
    { id: 'pizza', title: "Pizza House", img: 'placeholder-pizza.webp', desc: 'App Development' }
  ],
  business: [
    { id: 'landing', title: "SaaS Landing Page", img: 'placeholder-landing.webp', desc: 'Conversion Optimization' },
    { id: 'ai', title: "AI Studio", img: 'placeholder-ai.webp', desc: 'Web Application' }
  ],
  personal: [
    { id: 'portfolio', title: "Previous Portfolio", img: 'placeholder-portfolio.webp', desc: 'Web Design' },
    { id: 'branding', title: "Personal Branding", img: 'placeholder-branding.webp', desc: 'Brand Guidelines' }
  ]
};

export default function Home() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      // Auto-reveal elements on mobile immediately without animations
      document.querySelectorAll('.fade-up, .slide-up').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    // SplitType animations for Hero Title, Subtitle, About Text and Contact Title
    const heroTitle = new SplitType('.hero-title', { types: 'lines,words' });
    const heroSubTitle = new SplitType('.hero-sub-title', { types: 'words' });
    const aboutText = new SplitType('.about-text', { types: 'words,chars' });
    const contactTitle = new SplitType('.contact-title', { types: 'words,chars' });

    // Wrap contact title words in overflow hidden containers
    contactTitle.words?.forEach(word => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper';
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    // Wrap hero title lines in overflow hidden containers for clean masking
    heroTitle.lines?.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'line-wrapper';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Wrap hero subtitle words in inline-block overflow wrappers
    heroSubTitle.words?.forEach(word => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper';
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    // Animate hero title words rising from mask
    gsap.from(heroTitle.words, {
      yPercent: 100,
      stagger: 0.02,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.25,
    });

    // Animate hero subtitle words rising from mask
    gsap.from(heroSubTitle.words, {
      yPercent: 100,
      stagger: 0.04,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.1,
    });

    // Scroll-driven text character paint highlight reveal with section pinning
    gsap.fromTo(aboutText.chars, 
      { color: 'rgba(17, 17, 17, 0.12)' },
      {
        color: 'var(--text)',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      }
    );

    // Scroll reveal animation for Contact Title words rising
    gsap.from(contactTitle.words, {
      yPercent: 120, // starts slightly lower for extra tracking space
      stagger: 0.12, // increased stagger to make word reveals distinct
      duration: 1.8,  // slower animation speed
      ease: 'power3.out', // smoother deceleration transition
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%', // starts a bit later for better focus
        toggleActions: 'play reverse play reverse' // resets and plays every time it enters the viewport
      }
    });

    // Parallax expand + fade out hero mock browser on scroll
    gsap.to('.browser-preview', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      scale: 1.15,
      y: -80,
      opacity: 0.1,
      ease: 'none',
    });

    // Scroll reveal animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .slide-up').forEach(el => observer.observe(el));

    // Initial load check for visible elements
    const handleInitialLoad = () => {
      document.querySelectorAll('.fade-up, .slide-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    };
    
    const timer = setTimeout(handleInitialLoad, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      heroTitle.revert();
      heroSubTitle.revert();
      aboutText.revert();
      contactTitle.revert();
    };
  }, []);

  const handleFolderToggle = (folderId: string) => {
    if (openFolder === folderId) {
      setOpenFolder(null);
      setIsGalleryOpen(false);
    } else {
      setOpenFolder(folderId);
      // Wait for folder lid rotation animation to complete before fanning open gallery
      setTimeout(() => {
        setIsGalleryOpen(true);
      }, 750);
    }
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setOpenFolder(null);
  };

  return (
    <>
      <ParallaxBackground />

      <main>
        {/* Hero Section */}
        <section id="hero" className="section">
          <div className="container hero-container">
            <div className="hero-content fade-up visible">
              <span className="hero-pre-title">Web & Brand Designer</span>
              <span className="hero-sub-title">Programmer — UX/UI — Graphics</span>
              <h1 className="hero-title">
                Crafting <span className="title-accent">websites</span> that <span className="title-accent">businesses</span> remember.
              </h1>
              <div className="hero-subtitle">
                <p>Developer &nbsp;|&nbsp; Designer &nbsp;|&nbsp; Creative Thinker</p>
              </div>
              <div className="hero-line" />
              <div className="hero-actions">
                <a href="#work" className="btn btn-primary slide-up visible">View Work</a>
                <a href="#contact" className="btn btn-secondary slide-up delay-1 visible">Let's Talk</a>
              </div>
            </div>
            <div className="hero-visual fade-up delay-2 visible">
              <MinimalCanvas />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-alt">
          <div className="container about-container fade-up">
            <p className="about-text">
              I Design and Develop Thoughtful Digital Experiences Focused on Clarity, Usability, and Performance.
            </p>
          </div>
        </section>

        {/* Services & Capabilities Section */}
        <section id="services" className="section">
          <div className="container services-container fade-up">
            <div className="services-content">
              <span className="services-pre">How I Help Companies</span>
              <h2 className="services-title">Solving Complex Problems with Design & Code</h2>
              <p className="services-desc">
                I help startups and established brands build memorable digital platforms. By combining clean frontend architecture with intuitive UX/UI design, I deliver websites that convert visitors into customers.
              </p>
              <div className="services-list">
                <div className="service-card">
                  <h3>UX/UI Design</h3>
                  <p>User-centered layouts, mockups, and interactive prototypes built for ultimate conversion.</p>
                  <div className="card-tags">
                    <span className="card-tag">Antigravity</span>
                    <span className="card-tag">UX Research</span>
                    <span className="card-tag">Wireframes</span>
                    <span className="card-tag">Prototypes</span>
                  </div>
                </div>
                <div className="service-card">
                  <h3>Web Development</h3>
                  <p>Modern, responsive, fast-loading React and Next.js applications styled with CSS/Tailwind.</p>
                  <div className="card-tags">
                    <span className="card-tag">HTML5</span>
                    <span className="card-tag">CSS3</span>
                    <span className="card-tag">JavaScript</span>
                    <span className="card-tag">React</span>
                    <span className="card-tag">Next.js</span>
                    <span className="card-tag">Tailwind</span>
                  </div>
                </div>
                <div className="service-card">
                  <h3>Brand Strategy</h3>
                  <p>Developing unique visual identities, logo marks, and visual systems for modern companies.</p>
                  <div className="card-tags">
                    <span className="card-tag">Logo Design</span>
                    <span className="card-tag">Identity</span>
                    <span className="card-tag">Typography</span>
                    <span className="card-tag">Styleguides</span>
                  </div>
                </div>
                <div className="service-card">
                  <h3>Performance & SEO</h3>
                  <p>Ensuring high Lighthouse scores, search rankings, and fast loading speeds out of the box.</p>
                  <div className="card-tags">
                    <span className="card-tag">PageSpeed</span>
                    <span className="card-tag">SEO</span>
                    <span className="card-tag">Analytics</span>
                    <span className="card-tag">Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Gallery Section (Full-bleed Diamond Grid with 0 Gap) */}
        <section id="services-gallery">
          <div className="diamond-grid">
            {/* Row 1 */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/6.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/7.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/8.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/9.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/10.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/13.webp')" }}></div></div>

            {/* Row 2 (Col 3 = 9.webp, Col 5 = 6.webp) */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/1.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/2.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/9.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/13.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/6.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/8.webp')" }}></div></div>

            {/* Row 3 (Col 2 = 10.webp, Col 3 = 3.webp, Col 4 = 8.webp) */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/9.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/10.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/3.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/8.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/2.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/13.webp')" }}></div></div>

            {/* Row 4 */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/2.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/3.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/6.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/7.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/8.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/9.webp')" }}></div></div>

            {/* Row 5 */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/10.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/13.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/1.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/2.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/3.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/6.webp')" }}></div></div>

            {/* Row 6 */}
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/7.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/8.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/9.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/10.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/13.webp')" }}></div></div>
            <div className="d-tile"><div className="d-tile-inner" style={{ backgroundImage: "url('/projects/1.webp')" }}></div></div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="section">
          <div className="container">
            <h2 className="section-title fade-up">Selected Work</h2>
            
            <div className="folders-grid">
              <ProjectFolder 
                folderId="restaurants"
                isOpen={openFolder === 'restaurants'}
                onToggle={() => handleFolderToggle('restaurants')}
                files={[
                  { id: 'bella', title: "Bella's Restaurant", tabLabel: "CASE STUDY" },
                  { id: 'pizza', title: "Pizza House", tabLabel: "02 / DESIGN" }
                ]}
              />

              <ProjectFolder 
                folderId="business"
                isOpen={openFolder === 'business'}
                onToggle={() => handleFolderToggle('business')}
                files={[
                  { id: 'landing', title: "SaaS Landing Page", tabLabel: "CASE STUDY" },
                  { id: 'ai', title: "AI Studio", tabLabel: "02 / INTERACTION" }
                ]}
              />

              <ProjectFolder 
                folderId="personal"
                isOpen={openFolder === 'personal'}
                onToggle={() => handleFolderToggle('personal')}
                files={[
                  { id: 'portfolio', title: "Previous Portfolio", tabLabel: "PORTFOLIO" },
                  { id: 'branding', title: "Personal Branding", tabLabel: "02 / DESIGN" }
                ]}
              />
            </div>
          </div>

          {/* Gallery Overlay */}
          <div 
            className={`gallery-overlay ${isGalleryOpen ? '' : 'hidden'}`} 
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseGallery();
            }}
          >
            <button className="close-btn" onClick={handleCloseGallery} aria-label="Close Gallery">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="gallery-container">
              {openFolder && galleryData[openFolder]?.map((item, index) => (
                <div key={item.id} className="gallery-item visible">
                  <Link href={`/project/${item.id}`}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AInter%2C%20sans-serif%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22140%22%20y%3D%22158%22%3E${item.title.replace(' ','%20')}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`;
                      }}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container fade-up">
            <h2 className="contact-title">Have an idea?<br />Let's build it.</h2>
            <div className="contact-links">
              <a href="mailto:emmzain222@gmail.com" className="contact-link link-email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email
              </a>
              <a href="https://wa.me/923369752816" target="_blank" rel="noopener noreferrer" className="contact-link link-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.004 2c-5.518 0-9.998 4.48-9.998 9.997 0 2.006.592 3.877 1.612 5.453L2.005 22l4.71-1.57c1.517.917 3.284 1.442 5.187 1.442 5.518 0 10-4.48 10-9.997S17.522 2 12.004 2zm5.735 14.42c-.25.7-1.42 1.28-1.95 1.33-.47.04-.94.06-1.42-.08-.3-.09-.61-.19-.92-.32-2.58-1.02-4.24-3.6-4.37-3.77-.13-.17-.98-1.29-.98-2.47 0-1.18.57-1.77.82-2.02.21-.21.46-.32.69-.32.22 0 .39.01.55.02.19.01.38-.02.55.39.2.49.69 1.68.75 1.8.06.12.1.26.01.43-.09.18-.17.29-.3.44-.12.15-.26.34-.37.45-.12.12-.25.26-.1.52.15.25.67 1.11 1.44 1.8 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.56-.06.15-.17.65-.75.82-.99.17-.25.34-.21.56-.12.23.09 1.43.68 1.68.81.25.12.41.19.47.3.06.11.06.64-.19 1.34z"/>
                </svg>
                WhatsApp
              </a>
              <a href="https://x.com/emmzain222" target="_blank" rel="noopener noreferrer" className="contact-link link-x">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </a>
              <a href="/Muhammad_Zain_Qureshi Vercel.pdf" target="_blank" rel="noopener noreferrer" className="contact-link link-resume">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Résumé
              </a>
              <a href="https://github.com/Emmzain" target="_blank" rel="noopener noreferrer" className="contact-link link-github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
                GitHub
              </a>
              <a href="#" className="contact-link link-linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
 
      {/* Floating Sidebar */}
      <div className="floating-sidebar">
        <a href="https://wa.me/923369752816" target="_blank" rel="noopener noreferrer" className="sidebar-item" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a href="mailto:emmzain222@gmail.com" className="sidebar-item" aria-label="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
        <a href="https://github.com/Emmzain" target="_blank" rel="noopener noreferrer" className="sidebar-item" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
          </svg>
        </a>
        <div className="sidebar-line" />
      </div>

      {/* Mobile back-to-top button */}
      <button
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </>
  );
}
