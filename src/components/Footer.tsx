'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          &copy; {currentYear} Zain Qureshi. Built with focus.
        </p>
        <div className="social-links">
          <a href="https://github.com/Emmzain" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:emmzain222@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
