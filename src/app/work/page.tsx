'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  img: string;
  liveLink: string;
  githubLink: string;
}

const projectsList: Project[] = [
  { 
    id: 'desi-mehfil', 
    title: "Desi Mehfil", 
    category: 'Restaurant', 
    desc: 'Complete brand guidelines and digital presence for a premium Pakistani Cuisine restaurant.', 
    img: '/projects/desi-mehfil_1.webp',
    liveLink: "https://desimehfil.vercel.app/",
    githubLink: "https://github.com/Emmzain"
  },
  { 
    id: 'zenith', 
    title: " Zenith Studio", 
    category: 'Landing Page', 
    desc: 'Corporate brand architecture and identity design package for Zenith Studio.', 
    img: '/projects/zenith.webp',
    liveLink: "https://zenithv1.vercel.app/",
    githubLink: "https://github.com/Emmzain"
  },
  { 
    id: 'bite-me', 
    title: "Bite Me Fast Food", 
    category: 'Restaurant', 
    desc: ' Modern, single-page progressive web application (PWA) built for a premium burger joint..', 
    img: '/projects/bite_me_1.webp',
    liveLink: "https://biteme-pi.vercel.app/",
    githubLink: "https://github.com/Emmzain"
  },
  { 
    id: 'lumiere', 
    title: "Lumière Studio", 
    category: 'E-store / Spotify Style', 
    desc: 'Premium, fully responsive, and visually engaginge-commerce landing page interface. Built with React and Vite.', 
    img: '/projects/lumiere.webp',
    liveLink: "https://lumierebeautyui.netlify.app/",
    githubLink: "https://github.com/Emmzain"
  },
  { 
    id: 'patch-ai', 
    title: "Patch Ai", 
    category: 'AI Code Playground & Live Fixing', 
    desc: 'An interactive code playground and browser-based AI patching utility.', 
    img: '/projects/patch_ai.webp',
    liveLink: "https://zainzai.netlify.app/patch%20ai/",
    githubLink: "https://github.com/Emmzain"
  },
  { 
    id: 'shelf-stash', 
    title: "Shelf Stash", 
    category: 'Web & Mobile App ', 
    desc: 'A comprehensive developer-focused Bookmarking Platform and resource management shelf app.', 
    img: '/projects/app_shelf_stash.webp',
    liveLink: "https://stashwebtry.netlify.app/",
    githubLink: "https://github.com/Emmzain"
  }
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
                {/* Main Link wrap image */}
                <Link href={`/project/${project.id}`} style={{ display: 'block', overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
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
                  />
                </Link>
                
                <span className="card-tag" style={{ display: 'inline-block', marginBottom: '0.75rem', alignSelf: 'flex-start' }}>{project.category}</span>
                
                {/* Title and Quick Links row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Link href={`/project/${project.id}`} style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>
                    {project.title}
                  </Link>
                  
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Visit Live Site" 
                      style={{ color: 'var(--text)', opacity: 0.6, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="View GitHub" 
                      style={{ color: 'var(--text)', opacity: 0.6, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <Link href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
                  <p style={{ color: 'var(--grey)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>{project.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
