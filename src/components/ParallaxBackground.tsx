'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackground() {
  const lineH1Ref = useRef<HTMLDivElement | null>(null);
  const lineH2Ref = useRef<HTMLDivElement | null>(null);
  const vectorContainerRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    // Mouse Parallax Animation for Grid Elements (Desktop only)
    let animationFrameId: number;
    let handleMouseMove: (e: MouseEvent) => void;

    if (!isMobile) {
      let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const ease = 0.08;

      handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      window.addEventListener('mousemove', handleMouseMove);

      function animate() {
        current.x += (mouse.x - current.x) * ease;
        current.y += (mouse.y - current.y) * ease;

        const offsetX = (current.x - window.innerWidth / 2) * 0.02;
        const offsetY = (current.y - window.innerHeight / 2) * 0.02;

        if (lineH1Ref.current) lineH1Ref.current.style.transform = `translateY(${offsetY}px)`;
        if (lineH2Ref.current) lineH2Ref.current.style.transform = `translateY(${offsetY}px)`;

        if (vectorContainerRef.current) {
          vectorContainerRef.current.style.transform = `translate(${-offsetX * 1.2}px, ${-offsetY * 1.2}px)`;
        }

        if (ambientGlowRef.current) {
          ambientGlowRef.current.style.transform = `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px)`;
        }

        animationFrameId = requestAnimationFrame(animate);
      }

      animate();
    }

    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // 1. Slow Grid Scroll Parallax (Layer 2 - Grid, Speed: 15%) - Desktop only
      if (!isMobile) {
        gsap.to('.blueprint-grid', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
          y: '-10%',
          ease: 'none',
        });

        // 2. Ambient Blobs Scroll Parallax (Layer 3 - Glow, Speed: 30%)
        gsap.to('.ambient-glow-layer', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
          y: '-20%',
          ease: 'none',
        });

        // 3. Wireframes Scroll Parallax (Layer 4 - Objects, Speed: 60%)
        gsap.to('.vector-parallax-layer', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
          y: -300, // Gentle upward shift over the entire page height
          ease: 'none',
        });

        // Staggered assets animation (All Cubes on scroll - start left, drift right)
        gsap.to('[class*="vector-cube"]', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
          y: 220,
          x: '12vw',
          rotationX: 180,
          rotationY: 90,
          ease: 'none',
        });

        // Animate all wireframe browser window cards on scroll (start right, drift left)
        gsap.to('[class*="vector-browser"]', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
          y: -180,
          x: '-12vw',
          rotation: -30,
          scale: 0.95,
          ease: 'none',
        });

        // Animate floating braces 1 & 3 (start right, drift left)
        gsap.to('.vector-braces-1, .vector-braces-3', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
          y: -150,
          x: '-14vw',
          rotation: -45,
          scale: 1.15,
          ease: 'none',
        });

        // Animate floating braces 2 (starts left, drifts right)
        gsap.to('.vector-braces-2', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
          y: -150,
          x: '14vw',
          rotation: 45,
          scale: 1.15,
          ease: 'none',
        });

        // Animate designer crosshairs 1 & 3 (start left, drift right)
        gsap.to('.vector-crosshair-1, .vector-crosshair-3', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          },
          y: 180,
          x: '15vw',
          rotation: 90,
          scale: 1.1,
          ease: 'none',
        });

        // Animate designer crosshair 2 (starts right, drifts left)
        gsap.to('.vector-crosshair-2', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          },
          y: 180,
          x: '-15vw',
          rotation: -90,
          scale: 1.1,
          ease: 'none',
        });

        // Shift horizontal lines horizontally on scroll
        gsap.to('.bg-line-h1', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
          xPercent: 30,
          ease: 'none',
        });

        gsap.to('.bg-line-h2', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
          xPercent: -30,
          ease: 'none',
        });
      }

      // Staggered reveal for section titles and elements (Active on both desktop & mobile)
      gsap.utils.toArray('.section-title').forEach((title: any) => {
        gsap.fromTo(title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Staggered reveal for folder grids/project folders
      gsap.utils.toArray('.folder-grid').forEach((grid: any) => {
        gsap.fromTo(grid.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => {
      if (!isMobile && handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Layer 1: Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Layer 2: Blueprint Grid Background */}
      <div className="blueprint-grid" />

      {/* Layer 3: Ambient Grey Glow Blobs */}
      <div ref={ambientGlowRef} className="ambient-glow-layer">
        <div className="ambient-blob blob-grey-1" />
        <div className="ambient-blob blob-grey-2" />
      </div>

      {/* Horizontal Parallax Lines */}
      <div ref={lineH1Ref} className="bg-line bg-line-horizontal bg-line-h1" />
      <div ref={lineH2Ref} className="bg-line bg-line-horizontal bg-line-h2" />

      {/* Layer 4: Vector Path & Wireframes Layer */}
      <div ref={vectorContainerRef} className="vector-parallax-layer">
        
        {/* Node 1: Browser (Hero - Top Right) */}
        <div className="vector-node vector-browser-1">
          <svg width="150" height="95" viewBox="0 0 150 95" fill="none">
            <rect x="1" y="1" width="148" height="93" rx="6" stroke="rgba(17, 17, 17, 0.25)" strokeWidth="1" />
            <line x1="1" y1="18" x2="149" y2="18" stroke="rgba(17, 17, 17, 0.25)" strokeWidth="1" />
            <circle cx="8" cy="9" r="2.5" fill="rgba(17, 17, 17, 0.35)" />
            <circle cx="16" cy="9" r="2.5" fill="rgba(17, 17, 17, 0.35)" />
            <circle cx="24" cy="9" r="2.5" fill="rgba(17, 17, 17, 0.35)" />
            <rect x="40" y="32" width="70" height="8" rx="2" fill="rgba(17, 17, 17, 0.12)" />
            <rect x="40" y="46" width="50" height="6" rx="1.5" fill="rgba(17, 17, 17, 0.12)" />
            <circle cx="115" cy="50" r="14" stroke="rgba(13, 148, 136, 0.45)" strokeWidth="1.2" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Node 2: Cube (Mid Hero/About - Top Left) */}
        <div className="vector-node vector-cube-1">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 5 L75 22 L75 58 L40 75 L5 58 L5 22 Z" stroke="rgba(17, 17, 17, 0.27)" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M40 5 L40 75" stroke="rgba(17, 17, 17, 0.27)" strokeWidth="1" />
            <path d="M5 22 L40 39 L75 22" stroke="rgba(17, 17, 17, 0.27)" strokeWidth="1" />
            <circle cx="40" cy="39" r="3" fill="var(--accent)" fillOpacity="0.85" />
          </svg>
        </div>

        {/* Node 3: Crosshair (About - Mid Left) */}
        <div className="vector-node vector-crosshair-1">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.8" />
            <circle cx="20" cy="20" r="3.5" fill="var(--accent)" fillOpacity="0.9" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(17, 17, 17, 0.24)" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(17, 17, 17, 0.24)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Node 4: Braces (Mid About/Work - Mid Right) */}
        <div className="vector-node vector-braces-1">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <text x="5" y="40" fontFamily="General Sans" fontSize="38" fontWeight="400" fill="rgba(17, 17, 17, 0.18)" letterSpacing="-0.05em">{"{ }"}</text>
            <circle cx="25" cy="22" r="12" stroke="rgba(13, 148, 136, 0.24)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Node 5: Browser (Work - Mid Right) */}
        <div className="vector-node vector-browser-2">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <rect x="1" y="1" width="118" height="78" rx="4" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
            <line x1="1" y1="15" x2="119" y2="15" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="rgba(17, 17, 17, 0.3)" />
            <circle cx="15" cy="8" r="2" fill="rgba(17, 17, 17, 0.3)" />
            <rect x="30" y="30" width="60" height="6" rx="1.5" fill="rgba(17, 17, 17, 0.09)" />
          </svg>
        </div>

        {/* Node 6: Cube (Mid Work/Contact - Mid Left) */}
        <div className="vector-node vector-cube-2">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 4 L56 18 L56 46 L30 60 L4 46 L4 18 Z" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
            <path d="M30 4 L30 60" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
            <path d="M4 18 L30 32 L56 18" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
          </svg>
        </div>

        {/* Node 7: Braces (Contact - Mid Left) */}
        <div className="vector-node vector-braces-2">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <text x="5" y="40" fontFamily="General Sans" fontSize="38" fontWeight="400" fill="rgba(17, 17, 17, 0.15)" letterSpacing="-0.05em">{"[ ]"}</text>
          </svg>
        </div>

        {/* Node 8: Crosshair (Footer - Bottom Right) */}
        <div className="vector-node vector-crosshair-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="14" stroke="rgba(17, 17, 17, 0.18)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="20" cy="20" r="2.5" fill="rgba(17, 17, 17, 0.45)" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Node 9: Cube (Hero Section - Top Left Outer) */}
        <div className="vector-node vector-cube-3">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
            <path d="M30 4 L56 18 L56 46 L30 60 L4 46 L4 18 Z" stroke="rgba(17, 17, 17, 0.23)" strokeWidth="1" />
            <path d="M30 4 L30 60" stroke="rgba(17, 17, 17, 0.23)" strokeWidth="1" />
            <circle cx="30" cy="32" r="3" fill="var(--accent)" fillOpacity="0.8" />
          </svg>
        </div>

        {/* Node 10: Browser (About Section - Right Outer) */}
        <div className="vector-node vector-browser-3">
          <svg width="100" height="65" viewBox="0 0 120 80" fill="none">
            <rect x="1" y="1" width="118" height="78" rx="4" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="1" />
            <line x1="1" y1="15" x2="119" y2="15" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="rgba(17, 17, 17, 0.25)" />
            <circle cx="15" cy="8" r="2" fill="rgba(17, 17, 17, 0.25)" />
          </svg>
        </div>

        {/* Node 11: Crosshair (Work Section - Center Left) */}
        <div className="vector-node vector-crosshair-3">
          <svg width="35" height="35" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="14" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.65" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Node 12: Braces (Contact Section - Right) */}
        <div className="vector-node vector-braces-3">
          <svg width="45" height="45" viewBox="0 0 50 50" fill="none">
            <text x="5" y="38" fontFamily="General Sans" fontSize="34" fontWeight="400" fill="rgba(17, 17, 17, 0.16)" letterSpacing="-0.05em">{"{ }"}</text>
          </svg>
        </div>

        {/* Node 13: Browser (Footer - Left) */}
        <div className="vector-node vector-browser-4">
          <svg width="100" height="65" viewBox="0 0 120 80" fill="none">
            <rect x="1" y="1" width="118" height="78" rx="4" stroke="rgba(17, 17, 17, 0.22)" strokeWidth="1" />
            <line x1="1" y1="15" x2="119" y2="15" stroke="rgba(17, 17, 17, 0.22)" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="rgba(17, 17, 17, 0.3)" />
          </svg>
        </div>

        {/* Node 14: Cube (Footer - Right) */}
        <div className="vector-node vector-cube-4">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
            <path d="M30 4 L56 18 L56 46 L30 60 L4 46 L4 18 Z" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
            <path d="M30 4 L30 60" stroke="rgba(17, 17, 17, 0.21)" strokeWidth="1" />
          </svg>
        </div>

        {/* Node 15: Crosshair (Footer - Center) */}
        <div className="vector-node vector-crosshair-4">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="12" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.75" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </>
  );
}
