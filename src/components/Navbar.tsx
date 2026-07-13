'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isWorkPage = pathname === '/work';
  const isProjectPage = pathname?.startsWith('/project/');
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    opacity: 0,
  });

  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar on mobile when contact section is visible
  useEffect(() => {
    if (window.innerWidth > 768) return;
    const contactEl = document.querySelector('#contact');
    if (!contactEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const navLinks = navLinksRef.current;
    if (!target || !navLinks) return;

    const rect = target.getBoundingClientRect();
    const containerRect = navLinks.getBoundingClientRect();

    setBubbleStyle({
      width: rect.width,
      height: rect.height,
      left: rect.left - containerRect.left + navLinks.scrollLeft,
      top: rect.top - containerRect.top + navLinks.scrollTop,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setBubbleStyle(prev => ({ ...prev, opacity: 0 }));
  };

  // Nav split logo characters logic
  const logoText = "Muhammad Zain Qureshi";
  
  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isContactVisible ? 'nav-hidden-mobile' : ''}`} id="navbar">
        <div className="nav-container">
        <div className="logo-wrapper">
          <span className="handwritten-intro">Hey, I'm</span>
          <Link href="/" className="logo-brand">
            <span className="brand-bold">
              {"Muhammad Zain".split('').map((char, index) => (
                <span key={index} className="char-wrapper">
                  <span className="char-item">{char === ' ' ? '\u00A0' : char}</span>
                  <span className="char-hover">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
            <span className="brand-light">Qureshi</span>
          </Link>
        </div>

        {/* Conditional Navigation Links based on page type */}
        {isWorkPage ? (
          <div className="nav-links">
            <Link href="/" className="nav-item" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
              Home
            </Link>
          </div>
        ) : isProjectPage ? (
          <div className="nav-links">
            <Link href="/work" className="nav-item" style={{ fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Nav Links */}
            <div 
              ref={navLinksRef} 
              className="nav-links desktop-only"
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-bubble-bg" style={bubbleStyle} id="nav-bubble-bg" />
              <Link href="/#about" className="nav-item" onMouseEnter={handleMouseEnter}>
                About
              </Link>
              <Link href="/work" className="nav-item" onMouseEnter={handleMouseEnter}>
                Work
              </Link>
              <Link href="/#contact" className="nav-item" onMouseEnter={handleMouseEnter}>
                Contact
              </Link>
            </div>

            {/* Hamburger Trigger for Mobile (No background circle) */}
            <button 
              className={`mob-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              <div className="hb-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </>
        )}
      </div>
    </nav>

    {/* Full Screen Mobile Overlay Menu */}
    <div className={`mob-overlay-menu ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Close button X (No background circle, clean) */}
      <button className="mob-menu-close-btn" onClick={closeMobileMenu} aria-label="Close Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="mob-overlay-content">
        <Link href="/#about" className="mob-nav-item" onClick={closeMobileMenu}>
          About
        </Link>
        <Link href="/work" className="mob-nav-item" onClick={closeMobileMenu}>
          Work
        </Link>
        <Link href="/#contact" className="mob-nav-item" onClick={closeMobileMenu}>
          Contact
        </Link>
        
        {/* Social Icons in horizontal row (Left to Right) */}
        <div className="mob-socials-horizontal-container">
          <a href="https://wa.me/923369752816" target="_blank" rel="noopener noreferrer" className="mob-social-link-icon" onClick={closeMobileMenu} aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <a href="mailto:emmzain222@gmail.com" className="mob-social-link-icon" onClick={closeMobileMenu} aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a href="https://github.com/Emmzain" target="_blank" rel="noopener noreferrer" className="mob-social-link-icon" onClick={closeMobileMenu} aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </>
  );
}
