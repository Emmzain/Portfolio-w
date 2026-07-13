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
  coverImg: string;
  wireframeImg: string;
  finalImg: string;
}

const projects: Record<string, ProjectDetail> = {
  'shelf-stash': {
    title: "Shelf Stash",
    category: "Web & Mobile Bookmarking Platform",
    client: "Shelf Stash Co",
    role: "Lead Fullstack Dev & Designer",
    year: "2026",
    problem: "Developers and designers struggle to organize code snippets, design assets, and bookmarks. Standard browser bookmarks lack search capabilities, tag matching, and code previews.",
    research: "Conducted interviews with 20 developers to understand workflow fragmentation. Added live rendering previews, tag matching, and keyboard shortcuts.",
    coverImg: "/projects/app_shelf_stash.webp",
    wireframeImg: "/projects/web_shelf_stash.webp",
    finalImg: "/projects/web_shelf_stash_1.webp"
  },
  'patch-ai': {
    title: "Patch Ai",
    category: "AI Code Playground & Live Patching",
    client: "Patch AI Lab",
    role: "Front-end Architect & UI Designer",
    year: "2026",
    problem: "Developers find it tedious to copy-paste AI code suggestions into local files. There was no visual code differential patcher tool running entirely in the browser.",
    research: "Engineered web-based zip and code saving tools, file differential viewers, and high-fidelity panel states.",
    coverImg: "/projects/patch_ai.webp",
    wireframeImg: "/projects/patch_ai_logo.webp",
    finalImg: "/projects/patch_ai.webp"
  },
  'desi-mehfil': {
    title: "Desi Mehfil",
    category: "Brand Identity & Gourmet Experience",
    client: "Mehfil Hospitality Group",
    role: "Creative Director",
    year: "2025",
    problem: "A premium culinary restaurant needed complete digital rebranding and interactive menus to stand out from local competitors.",
    research: "Studied traditional South Asian visual elements and combined them with modern editorial typography layouts.",
    coverImg: "/projects/desi-mehfil_1.webp",
    wireframeImg: "/projects/desi-mehfil_2.webp",
    finalImg: "/projects/desi-mehfil_3.webp"
  },
  'bite-me': {
    title: "Bite Me Fast Food",
    category: "Visual Identity & Digital Menu",
    client: "Bite Me Diner",
    role: "Lead Web Designer",
    year: "2025",
    problem: "A fast-paced gourmet diner required an energetic website layout to boost online deliveries and display their menu.",
    research: "Applied dynamic hover scales, vibrant palettes, and clean user-focused cart interactions.",
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
    problem: "A creative agency needed a high-end minimalist web showcase that emphasized photography and visual layouts.",
    research: "Implemented fullscreen sliders, dynamic grid offsets, and luxury editorial type scales.",
    coverImg: "/projects/lumiere.webp",
    wireframeImg: "/projects/lumiere_2.webp",
    finalImg: "/projects/lumiere_3.webp"
  },
  'zenith': {
    title: "Zenith Identity",
    category: "Corporate Brand Guidelines",
    client: "Zenith Corp",
    role: "Graphic Designer & Brand Architect",
    year: "2025",
    problem: "Zenith Group needed a visual system and asset pack guidelines to keep their corporate communications unified.",
    research: "Generated brand books, color architectures, logo constructions, and grid frameworks.",
    coverImg: "/projects/zenith.webp",
    wireframeImg: "/projects/zenith.webp",
    finalImg: "/projects/zenith.webp"
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
    coverImg: "/placeholder-cover.webp",
    wireframeImg: "/placeholder-wireframe.webp",
    finalImg: "/placeholder-final.webp"
  };

  return (
    <main>
      <section className="section project-hero" style={{ paddingTop: '120px' }}>
        <div className="container fade-up visible">
          <span className="project-category" style={{ display: 'block', fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
          <h1 className="project-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>{project.title}</h1>
          
          <div className="project-meta" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '1.5rem', marginBottom: '3rem' }}>
            <div className="meta-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--grey)', fontWeight: 600, letterSpacing: '0.05em' }}>Client</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{project.client}</span>
            </div>
            <div className="meta-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--grey)', fontWeight: 600, letterSpacing: '0.05em' }}>Role</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{project.role}</span>
            </div>
            <div className="meta-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="meta-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--grey)', fontWeight: 600, letterSpacing: '0.05em' }}>Year</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{project.year}</span>
            </div>
          </div>
        </div>
        
        <div className="container fade-up delay-1 visible">
          <img 
            src={project.coverImg} 
            alt="Project Cover" 
            className="project-cover" 
            style={{ width: '100%', borderRadius: 'var(--radius)', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid rgba(17,17,17,0.05)' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22600%22%20fill%3D%22%23eae5de%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22550%22%20y%3D%22300%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3ECover%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23f5f5f5%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22520%22%20y%3D%22400%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3EWireframe%20Screenshots%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23eae5de%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22520%22%20y%3D%22400%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3EFinal%20Design%20Screenshots%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
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
