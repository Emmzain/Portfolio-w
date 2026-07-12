import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrailCanvas from '@/components/TrailCanvas';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Muhammad Zain Qureshi | Portfolio',
  description: 'I design and develop thoughtful digital experiences focused on clarity, usability and performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          <TrailCanvas />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
