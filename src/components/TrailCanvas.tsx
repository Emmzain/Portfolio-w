'use client';

import React, { useEffect, useRef } from 'react';

export default function TrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number }[] = [];
    const maxPoints = 12; // Shortened tail
    let mouse = { x: 0, y: 0 };
    let isMoving = false;

    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMoving) {
        points.push({ x: mouse.x, y: mouse.y });
        if (points.length > maxPoints) {
          points.shift();
        }
      }

      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
          points[points.length - 1].x,
          points[points.length - 1].y,
          points[points.length - 1].x,
          points[points.length - 1].y
        );

        ctx.strokeStyle = 'rgba(17, 17, 17, 0.16)';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      if (points.length > 0 && !isMoving) {
        points.splice(0, 2);
      }

      isMoving = false;
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseLeave = () => {
      points = [];
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="trail-canvas" className="trail-canvas" />;
}
