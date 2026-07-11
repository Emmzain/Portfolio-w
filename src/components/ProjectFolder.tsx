'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FileItem {
  id: string;
  title: string;
  tabLabel: string;
}

interface ProjectFolderProps {
  folderId: string;
  files: FileItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProjectFolder({ folderId, files, isOpen, onToggle }: ProjectFolderProps) {
  return (
    <div className="folder-wrapper fade-up" data-folder={folderId}>
      <div 
        className={`folder ${isOpen ? 'open' : ''}`} 
        tabIndex={0}
        onClick={(e) => {
          // If click was inside a link, don't trigger folder toggle
          if ((e.target as HTMLElement).closest('.file-item')) {
            return;
          }
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onToggle();
          }
        }}
      >
        <div className="folder-back" />
        
        <div className="folder-content">
          {files.map((file, index) => (
            <div key={file.id} className="file-item">
              <span className="file-tab-label">{file.tabLabel}</span>
              <Link href={`/project/${file.id}`}>
                {file.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="folder-front">
          <div className="folder-icon">
            <div className="logo-crop-wrapper">
              <img src="/Logo.png" className="ez-folder-logo" alt="EZ Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
