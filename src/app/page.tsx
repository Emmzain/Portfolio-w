'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ParallaxBackground from '@/components/ParallaxBackground';
import ProjectFolder from '@/components/ProjectFolder';

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
            <div className="hero-content fade-up">
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
                <a href="#work" className="btn btn-primary slide-up">View Work</a>
                <a href="#contact" className="btn btn-secondary slide-up delay-1">Let's Talk</a>
              </div>
            </div>
            <div className="hero-visual fade-up delay-2">
              <div className="browser-preview">
                <div className="browser-header">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="browser-body">
                  <img 
                    src="placeholder-hero.webp" 
                    alt="Project preview" 
                    id="hero-img" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23eae5de%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22300%22%20y%3D%22300%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3EBrowser%20Preview%3C%2Ftext%3E%3C%2Fsvg%3E';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-alt">
          <div className="container about-container fade-up">
            <p className="about-text">
              I design and develop thoughtful digital experiences focused on clarity, usability and performance.
            </p>
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
              <a href="mailto:emmzain222@gmail.com" className="contact-link">Email</a>
              <a href="https://wa.me/923369752816" target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp</a>
              <a href="#" className="contact-link">LinkedIn</a>
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
        <a href="#" className="sidebar-item" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <div className="sidebar-line" />
      </div>
    </>
  );
}
