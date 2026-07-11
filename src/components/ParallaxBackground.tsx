'use client';

import React, { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const lineLeftRef = useRef<HTMLDivElement | null>(null);
  const lineRightRef = useRef<HTMLDivElement | null>(null);
  const lineH1Ref = useRef<HTMLDivElement | null>(null);
  const lineH2Ref = useRef<HTMLDivElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ease = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    function animate() {
      current.x += (mouse.x - current.x) * ease;
      current.y += (mouse.y - current.y) * ease;

      const offsetX = (current.x - window.innerWidth / 2) * 0.025;
      const offsetY = (current.y - window.innerHeight / 2) * 0.025;

      if (lineLeftRef.current) lineLeftRef.current.style.transform = `translateX(${offsetX}px)`;
      if (lineRightRef.current) lineRightRef.current.style.transform = `translateX(${offsetX}px)`;
      if (lineH1Ref.current) lineH1Ref.current.style.transform = `translateY(${offsetY}px)`;
      if (lineH2Ref.current) lineH2Ref.current.style.transform = `translateY(${offsetY}px)`;

      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${-offsetX * 1.8}px, ${-offsetY * 1.8}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-offsetX * 1.8}px, ${-offsetY * 1.8}px)`;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="bg-grid">
        <div ref={lineLeftRef} className="bg-line-left" />
        <div ref={lineRightRef} className="bg-line-right" />
        <div ref={lineH1Ref} className="bg-line-h1" />
        <div ref={lineH2Ref} className="bg-line-h2" />
      </div>

      <div className="blob-container">
        <div className="blob-1-wrapper">
          <div ref={blob1Ref} className="blob-1" />
        </div>
        <div className="blob-2-wrapper">
          <div ref={blob2Ref} className="blob-2" />
        </div>
      </div>
    </>
  );
}
