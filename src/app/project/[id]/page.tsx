import React from 'react';
import Link from 'next/link';

interface ProjectDetail {
  title: string;
  category: string;
  client: string;
  role: string;
  year: string;
  problem: string;
  research: string;
  techStack: string;
  liveLink: string;
  githubLink: string;
  coverImg: string;
  wireframeImg: string;
  finalImg: string;
}

const projects: Record<string, ProjectDetail> = {
  'royal-chef': {
    title: "Royal Chef Haripur",
    category: "Client Work — Fast Food & Authentic Chinese PWA",
    client: "Royal Chef Restaurant",
    role: "Full-Stack Web Developer & Designer",
    year: "2026",
    problem: "A high-volume fast food and Chinese restaurant required a modern Progressive Web Application (PWA) with installable mobile/desktop support, real-time cart calculations, instant WhatsApp order checkout, dynamic table reservation modals, and a secure admin management portal without relying on commission-heavy third-party food delivery apps.",
    research: "Architected a full-stack PWA using Next.js 16 (App Router), Bun runtime, and Tailwind CSS v4. Designed category-based menu filtering (Fast Food, Chinese Mains, Chowmein, Soups, Beverages, Family Deals), integrated custom WhatsApp message generators, added session-persisted admin authentication context with token checksum verification, and integrated Lenis smooth scrolling with GSAP scroll-triggered animations.",
    techStack: "Next.js 16, TypeScript 5, Bun, Tailwind CSS v4, Framer Motion, GSAP, Lenis, Supabase, Lucide React",
    liveLink: "https://royalchef.vercel.app/",
    githubLink: "",
    coverImg: "/projects/royal_chef_1.webp",
    wireframeImg: "/projects/royal_chef_2.webp",
    finalImg: "/projects/royal_chef_3.webp"
  },
  'desi-mehfil': {
    title: "Desi Mehfil",
    category: "Brand Identity & Gourmet Experience",
    client: "Mehfil Hospitality Group",
    role: "Creative Director & Frontend Developer",
    year: "2025",
    problem: "A high-end gourmet restaurant required a premium, visually striking digital menu and brand presence. Standard food templates lacked the editorial feel, custom culinary identity, and micro-interactions necessary to reflect a fine-dining experience.",
    research: "Conducted brand workshops to define typography pairs blending classic South Asian motifs with modern typography. Structured smooth scrolling behaviors using AOS animations to elegantly reveal signature dishes as the user scrolls.",
    techStack: "HTML5, CSS3, JavaScript, AOS Animations, Responsive CSS Layouts",
    liveLink: "https://desimehfil.vercel.app/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/desi-mehfil_1.webp",
    wireframeImg: "/projects/desi-mehfil_2.webp",
    finalImg: "/projects/desi-mehfil_3.webp"
  },
  'zenith': {
    title: "Zenith Identity",
    category: "Corporate Brand Guidelines",
    client: "Zenith Corp",
    role: "Graphic Designer & Brand Architect",
    year: "2025",
    problem: "Zenith Group needed a unified, highly aesthetic brand architecture guidelines page. The challenge was displaying complex corporate structures, logo geometry, and color palettes without cluttering the interface or boring the users.",
    research: "Developed a geometric layout featuring color theory modules and typography sheets. Implemented GSAP ScrollTriggers paired with Lenis smooth scrolling to guide users step-by-step through brand geometry and visual guidelines.",
    techStack: "HTML5, CSS3, JavaScript, GSAP, Lenis Smooth Scroll",
    liveLink: "https://zenithv1.vercel.app/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/zenith.webp",
    wireframeImg: "/projects/zenith.webp",
    finalImg: "/projects/zenith.webp"
  },
  'bite-me': {
    title: "Bite Me Fast Food",
    category: "Visual Identity & Digital Menu",
    client: "Bite Me Diner",
    role: "Lead Web Designer",
    year: "2025",
    problem: "A fast-paced gourmet diner needed a vibrant, conversion-focused online ordering menu. The website had to look energetic, load fast, and make the food selection process intuitive and visually engaging on all screens.",
    research: "Utilized bold contrasting colors and dynamic hover scales on meal cards to make options pop. Implemented Splide.js for high-performance mobile-friendly swipe carousels and created clean, interactive item counters.",
    techStack: "HTML5, CSS3, JavaScript, Splide.js, Custom Web Animations",
    liveLink: "https://biteme-pi.vercel.app/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/bite_me_1.webp",
    wireframeImg: "/projects/bite_me_2.webp",
    finalImg: "/projects/bite_me_1.webp"
  },
  'lumiere': {
    title: "Lumière Studio",
    category: "Editorial & Creative Direction",
    client: "Lumière Agency",
    role: "UI/UX Designer & Branding Lead",
    year: "2026",
    problem: "A luxury editorial and creative studio needed a minimalist portfolio to showcase photography, branding mockups, and client galleries. The interface had to remain secondary, allowing the high-end visuals to command attention.",
    research: "Crafted a spacious, grid-focused editorial theme featuring clean borders, ample negative space, and smooth CSS transitions. Deployed the interface on Netlify and integrated responsive image optimizations for high-density photography.",
    techStack: "HTML5, CSS3, JavaScript, Netlify Deployment, CSS Transitions",
    liveLink: "https://lumierebeautyui.netlify.app/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/lumiere.webp",
    wireframeImg: "/projects/lumiere_2.webp",
    finalImg: "/projects/lumiere_3.webp"
  },
  'patch-ai': {
    title: "Patch Ai",
    category: "AI Code Playground & Live Patching",
    client: "Patch AI Lab",
    role: "Front-end Architect & UI Designer",
    year: "2026",
    problem: "Developers lacked a lightweight, in-browser visual sandbox to inspect and live-edit static HTML templates, zoom/pan layouts, edit text content on double-click, and download patched code packages directly without installing local packages.",
    research: "Designed a client-side iframe sandbox wrapper that intercepts keyboard events and context clicks. Integrated JSZip and FileSaver.js to bundle edited documents and trigger instant HTML/ZIP package downloads entirely inside the browser.",
    techStack: "HTML5, CSS3, JavaScript, ZipJS, FileSaver.js, JSZip Compilers",
    liveLink: "https://zainzai.netlify.app/patch%20ai/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/patch_ai.webp",
    wireframeImg: "/projects/patch_ai_logo.webp",
    finalImg: "/projects/patch_ai.webp"
  },
  'shelf-stash': {
    title: "Shelf Stash",
    category: "Web & Mobile Bookmarking Platform",
    client: "Shelf Stash Co",
    role: "Lead Fullstack Dev & Designer",
    year: "2026",
    problem: "Developers and designers struggle to organize code snippets, design references, and bookmarks. Standard browser bookmarks lack search capabilities, tag matching, code previews, and visual category separation.",
    research: "Designed a unified workspace interface featuring double-panel layouts and LocalStorage caching. Built instant search queries, custom tag filters, code snippet copy shortcuts, and a clean responsive shelf representation.",
    techStack: "HTML5, CSS3, JavaScript, LocalStorage, Custom UI Frameworks",
    liveLink: "https://stashwebtry.netlify.app/",
    githubLink: "https://github.com/Emmzain",
    coverImg: "/projects/app_shelf_stash.webp",
    wireframeImg: "/projects/web_shelf_stash.webp",
    finalImg: "/projects/web_shelf_stash_1.webp"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects[id];
  return {
    title: project ? `${project.title} | Zain.` : 'Project Details | Zain.',
    description: project ? `Case study for ${project.title}` : 'Case study details.',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects[id] || {
    title: "Project Case Study",
    category: "Design & Development",
    client: "Client Name",
    role: "Lead Creator",
    year: "2026",
    problem: "Describe the core problem that this project solves. Keep it minimal and focused on the user's pain points.",
    research: "Outline the steps taken to understand the problem. Mention user interviews or data points that informed direction.",
    techStack: "HTML5, CSS3, JavaScript",
    liveLink: "https://github.com/Emmzain",
    githubLink: "",
    coverImg: "/placeholder-cover.webp",
    wireframeImg: "/placeholder-wireframe.webp",
    finalImg: "/placeholder-final.webp"
  };

  return (
    <main>
      <section className="section project-hero" style={{ paddingTop: '120px' }}>
        <div className="container fade-up visible">
          <span className="project-category" style={{ display: 'block', fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
            <h1 className="project-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>{project.title}</h1>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem', borderRadius: '100px' }}>
                Live Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              {Boolean(project.githubLink) && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem', borderRadius: '100px' }}>
                  GitHub
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '6px' }}>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          <div className="project-meta" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '1.5rem', marginBottom: '3rem' }}>
            <span className="meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--grey)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Tech Stack</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {project.techStack.split(',').map((tech) => (
                <span key={tech} className="card-tag" style={{ fontSize: '0.85rem', padding: '0.4rem 1.1rem', textTransform: 'none', fontWeight: 500 }}>
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container fade-up delay-1 visible">
          <img 
            src={project.coverImg} 
            alt="Project Cover" 
            className="project-cover" 
            style={{ width: '100%', borderRadius: 'var(--radius)', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid rgba(17,17,17,0.05)' }}
          />
        </div>
      </section>

      <section className="section bg-alt" style={{ padding: '6rem 0', background: 'rgba(17,17,17,0.02)', borderTop: '1px solid rgba(17,17,17,0.04)', borderBottom: '1px solid rgba(17,17,17,0.04)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div className="content-block fade-up visible">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>The Challenge</h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.65, fontSize: '1.05rem' }}>{project.problem}</p>
          </div>
          
          <div className="content-block fade-up visible">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>Research & Strategy</h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.65, fontSize: '1.05rem' }}>{project.research}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div className="content-block fade-up visible" style={{ maxWidth: '700px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Wireframes & Prototyping</h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.6, fontSize: '1.05rem' }}>Low-fidelity explorations and layouts mapping out structural and user flows before establishing high-fidelity components.</p>
          </div>
          <img 
            src={project.wireframeImg} 
            alt="Wireframe" 
            className="content-image fade-up visible" 
            style={{ width: '100%', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid rgba(17,17,17,0.06)' }}
          />
        </div>
      </section>

      <section className="section bg-alt" style={{ padding: '8rem 0', background: 'rgba(17,17,17,0.02)' }}>
        <div className="container">
          <div className="content-block fade-up visible" style={{ maxWidth: '700px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Final Interface Design</h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.6, fontSize: '1.05rem' }}>Polished high-fidelity mockups focusing on typography, layout space, color accents, and modern digital interfaces.</p>
          </div>
          <img 
            src={project.finalImg} 
            alt="Final Design" 
            className="content-image fade-up visible" 
            style={{ width: '100%', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid rgba(17,17,17,0.06)' }}
          />
        </div>
      </section>

      <section className="section" style={{ padding: '8rem 0' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div className="content-block fade-up visible">
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.25rem' }}>Result & Impact</h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.7, fontSize: '1.05rem' }}>The product launched successfully with exceptional user feedback, delivering optimized digital interfaces, elevated brand presence, and scalable frontend architectures.</p>
          </div>
        </div>
      </section>

      <section className="next-project fade-up visible" style={{ padding: '6rem 0', borderTop: '1px solid rgba(17,17,17,0.08)', textAlign: 'center' }}>
        <div className="container">
          <span className="meta-label" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--grey)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Next Project</span>
          <Link href="/work" className="next-title" style={{ fontSize: '2.5rem', fontWeight: 500, color: 'var(--text)', transition: 'color 0.25s ease', borderBottom: '1px solid currentColor' }}>
            Explore More Work
          </Link>
        </div>
      </section>
    </main>
  );
}
