import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectItem } from '../../data/projects';
import './ScoutingDossier.css';

interface ScoutingDossierProps {
  project: ProjectItem | null;
  onClose: () => void;
  isMobileSheet?: boolean;
}

export const ScoutingDossier: React.FC<ScoutingDossierProps> = ({
  project,
  onClose,
  isMobileSheet = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [erroredImgUrl, setErroredImgUrl] = useState<string | null>(null);

  const hasImgError = Boolean(project?.imageUrl && erroredImgUrl === project.imageUrl);

  // Scroll dossier body to top whenever a new project is selected
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  // Keyboard accessibility: ESC closes dossier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      closeBtnRef.current?.focus({ preventScroll: true });
      if (bodyRef.current) {
        bodyRef.current.scrollTop = 0;
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const renderContent = () => {
    if (!project) {
      return (
        <div className="xi-dossier-panel xi-dossier-panel--idle">
          <div className="xi-dossier-idle-compact">
            <div className="xi-dossier-idle-crest" aria-hidden="true">XI</div>
            <h3 className="xi-dossier-idle-title">PROJECT DOSSIER</h3>
            <p className="xi-dossier-idle-sub">
              Select any project marker on the tactical pitch to inspect its architecture, stack, and live demo.
            </p>
            <div className="xi-dossier-idle-hint">
              <span className="xi-dossier-status-pulse" />
              <span>11 VERIFIED BUILDS READY</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={panelRef}
        className={`xi-dossier-panel has-project${isMobileSheet ? ' xi-dossier-mobile-panel' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-project-name"
      >
        {/* Top Control Bar */}
        <div className="xi-dossier-topbar">
          <div className="xi-dossier-kit-tag">
            <span className="xi-dossier-kit-num">{project.kitNumber}</span>
            <span className="xi-dossier-status-indicator">
              <span className="xi-dossier-status-pulse" aria-hidden="true" />
              {project.isLive ? 'LIVE' : 'VERIFIED REPO'}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="xi-dossier-close-btn"
            onClick={onClose}
            aria-label="Close project dossier"
          >
            <span>✕</span>
            <span>CLOSE</span>
          </button>
        </div>

        {/* Scrollable Image-First Content */}
        <div ref={bodyRef} className="xi-dossier-body">
          {/* 1. Visual Hero Screenshot */}
          <div className="xi-dossier-media">
            {project.imageUrl && !hasImgError ? (
              <img
                key={project.imageUrl}
                src={project.imageUrl}
                alt={`Screenshot of ${project.name}`}
                className="xi-dossier-img"
                onError={() => setErroredImgUrl(project.imageUrl ?? null)}
              />
            ) : (
              <div className="xi-dossier-placeholder" aria-hidden="true">
                <span className="xi-dossier-placeholder-kit">{project.kitNumber}</span>
                <span className="xi-dossier-placeholder-tag">PROJECT PREVIEW</span>
              </div>
            )}
          </div>

          {/* 2. Identity Block */}
          <div className="xi-dossier-id-block">
            <h2 id="dossier-project-name" className="xi-dossier-name">
              {project.name}
            </h2>
            <div className="xi-dossier-role-row">
              <span className="xi-dossier-category">{project.tacticalRole || 'FULL-STACK'}</span>
              {project.isCollaborative && (
                <span className="xi-dossier-collab-badge">COLLABORATIVE</span>
              )}
            </div>
          </div>

          {/* 3. Concise Description (2-4 lines) */}
          <div className="xi-dossier-desc-block">
            <p className="xi-dossier-desc">
              {project.tagline || project.description}
            </p>
          </div>

          {/* 4. Built With (Primary 3-5 Technologies) */}
          {project.technologies.length > 0 && (
            <div className="xi-dossier-tech-block">
              <span className="xi-dossier-section-title">BUILT WITH</span>
              <div className="xi-dossier-tech-grid">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="xi-tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 5. Primary Action Buttons */}
          <div className="xi-dossier-actions">
            {project.isLive && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="xi-cta-primary"
                aria-label={`View live deployment of ${project.name}`}
              >
                <span>VIEW LIVE</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="xi-cta-secondary"
                aria-label={`View source code of ${project.name} on GitHub`}
              >
                <span>GITHUB REPO</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {/* 6. Collaboration Note (verified only) */}
          {project.isCollaborative && project.contributionsNote && (
            <div className="xi-dossier-collab-note">
              <span className="xi-dossier-collab-label">ROLE:</span> {project.contributionsNote}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isMobileSheet) {
    if (!project) return null;
    return createPortal(
      <div
        className="xi-dossier-mobile-sheet"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {renderContent()}
      </div>,
      document.body
    );
  }

  return renderContent();
};
