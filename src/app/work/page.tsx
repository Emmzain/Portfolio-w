'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  img: string;
}

const projectsList: Project[] = [
  { id: 'bella', title: "Bella's Restaurant", category: 'Brand Identity & Web Design', desc: 'A modern design and development project creating a unique identity.', img: '/projects/6.webp' },
  { id: 'pizza', title: "Pizza House", category: 'App Development', desc: 'An intuitive, fast mobile app built for seamless pizza ordering.', img: '/projects/2.webp' },
  { id: 'landing', title: "SaaS Landing Page", category: 'Conversion Optimization', desc: 'High-performance landing page design optimized for conversion rate.', img: '/projects/1.webp' },
  { id: 'ai', title: "AI Studio", category: 'Web Application', desc: 'A sophisticated dashboard and web application for AI analytics.', img: '/projects/3.webp' },
  { id: 'portfolio', title: "Previous Portfolio", category: 'Web Design', desc: 'A clean, typography-driven portfolio website exploring layout space.', img: '/projects/9.webp' },
  { id: 'branding', title: "Personal Branding", category: 'Brand Guidelines', desc: 'Visual identity research, logo systems, and brand consultation.', img: '/projects/8.webp' }
];

export default function WorkPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <span className="services-pre" style={{ display: 'block', marginBottom: '1rem' }}>Portfolio</span>
          <h1 className="section-title" style={{ marginBottom: '4rem' }}>Selected Work & Case Studies</h1>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {projectsList.map((project) => (
              <div 
                key={project.id} 
                className="gallery-item visible"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  height: '100%',
                }}
              >
                <Link href={`/project/${project.id}`} style={{ display: 'block', height: '100%' }}>
                  <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                      className="d-tile-inner-hover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eee%22%3E%3C/rect%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                  <span className="card-tag" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>{project.category}</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>{project.title}</h3>
                  <p style={{ color: 'var(--grey)', fontSize: '0.95rem', lineHeight: 1.5 }}>{project.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
