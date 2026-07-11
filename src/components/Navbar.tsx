'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    opacity: 0,
  });

  const navLinksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
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
        <div 
          ref={navLinksRef} 
          className="nav-links"
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-bubble-bg" style={bubbleStyle} id="nav-bubble-bg" />
          <Link href="/#about" className="nav-item" onMouseEnter={handleMouseEnter}>
            About
          </Link>
          <Link href="/#work" className="nav-item" onMouseEnter={handleMouseEnter}>
            Work
          </Link>
          <a href="/Muhammad_Zain_Qureshi Vercel.pdf" target="_blank" rel="noopener noreferrer" className="nav-item" onMouseEnter={handleMouseEnter}>
            CV
          </a>
          <Link href="/#contact" className="nav-item" onMouseEnter={handleMouseEnter}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
