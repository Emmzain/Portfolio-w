import React from 'react';
import Link from 'next/link';

interface ProjectDetail {
  title: string;
  category: string;
  client: string;
  role: string;
  year: string;
}

const projects: Record<string, ProjectDetail> = {
  bella: { title: "Bella's Restaurant", category: "Web Design", client: "Bella's Ltd", role: "UX/UI Designer & Dev", year: "2025" },
  pizza: { title: "Pizza House App", category: "Mobile App Development", client: "Pizza House Corp", role: "Fullstack Developer", year: "2026" },
  landing: { title: "SaaS Landing Page", category: "Conversion Optimization", client: "SaaS Startups", role: "Growth Designer", year: "2025" },
  ai: { title: "AI Studio Suite", category: "Web Application Design", client: "AI Studio LLC", role: "Product UI Architect", year: "2026" },
  portfolio: { title: "Previous Minimal Portfolio", category: "Branding & Web Dev", client: "Personal Brand", role: "Front-end Architect", year: "2024" },
  branding: { title: "Brand Identity Guidelines", category: "Brand Consultation", client: "Emm Zain", role: "Identity Designer", year: "2025" }
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
    year: "2026"
  };

  return (
    <main>
      <section className="section project-hero">
        <div className="container fade-up visible">
          <span className="project-category">{project.category}</span>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta">
            <div className="meta-item">
              <span className="meta-label">Client</span>
              <span>{project.client}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span>{project.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
        
        <div className="container fade-up delay-1 visible">
          <img 
            src="/placeholder-cover.webp" 
            alt="Project Cover" 
            className="project-cover" 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22600%22%20fill%3D%22%23eae5de%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22550%22%20y%3D%22300%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3ECover%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="content-block fade-up visible">
            <h2>The Problem</h2>
            <p>Describe the core problem that this project solves. Keep it minimal and focused on the user's pain points. A brief paragraph explaining the context of the challenge.</p>
          </div>
          
          <div className="content-block fade-up visible">
            <h2>Research & Strategy</h2>
            <p>Outline the steps taken to understand the problem. Mention user interviews, competitive analysis, or data points that informed the design direction.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block fade-up visible">
            <h2>Wireframes</h2>
            <p>Low-fidelity explorations that define the structure and flow before committing to visual design.</p>
          </div>
          <img 
            src="/placeholder-wireframe.webp" 
            alt="Wireframe" 
            className="content-image fade-up visible" 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23f5f5f5%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22520%22%20y%3D%22400%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3EWireframe%20Screenshots%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="content-block fade-up visible">
            <h2>Final Design</h2>
            <p>The polished visual interface. Focus on typography, spacing, and micro-interactions that elevate the experience.</p>
          </div>
          <img 
            src="/placeholder-final.webp" 
            alt="Final Design" 
            className="content-image fade-up visible" 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23eae5de%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22520%22%20y%3D%22400%22%20fill%3D%22%23999%22%20font-family%3D%22Inter%22%20font-size%3D%2224%22%3EFinal%20Design%20Screenshots%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block fade-up visible">
            <h2>The Result</h2>
            <p>Summarize the impact of the project. Mention metrics, client satisfaction, or how it solved the initial problem effectively.</p>
          </div>
        </div>
      </section>

      <section className="next-project fade-up visible">
        <div className="container">
          <span className="meta-label">Next Project</span>
          <Link href="/#work" className="next-title">
            Explore More Work
          </Link>
        </div>
      </section>
    </main>
  );
}
