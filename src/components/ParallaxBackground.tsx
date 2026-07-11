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
      {/* Premium Minimal Background Elements matching CSS tokens exactly */}
      <div ref={lineLeftRef} className="bg-line bg-line-left" />
      <div ref={lineRightRef} className="bg-line bg-line-right" />
      <div ref={lineH1Ref} className="bg-line bg-line-horizontal bg-line-h1" />
      <div ref={lineH2Ref} className="bg-line bg-line-horizontal bg-line-h2" />

      {/* Animated Organic Blobs */}
      <div ref={blob1Ref} className="bg-blob-container blob-1">
        <div className="bg-blob" />
      </div>
      <div ref={blob2Ref} className="bg-blob-container blob-2">
        <div className="bg-blob" />
      </div>
    </>
  );
}
