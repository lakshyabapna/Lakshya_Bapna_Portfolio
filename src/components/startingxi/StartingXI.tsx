import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { FootballPitch } from './FootballPitch';
import { ScoutingDossier } from './ScoutingDossier';
import { MobileFormationList } from './MobileFormationList';
import './StartingXI.css';

interface StartingXIProps {
  id?: string;
}

export const StartingXI: React.FC<StartingXIProps> = ({ id = 'starting-xi' }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [pitchVisible, setPitchVisible] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Grouped editorial entrance sequence (Target: ~850–1050ms total perceived rhythm)
  useEffect(() => {
    // Group 1: Editorial header at 250ms
    const t0 = setTimeout(() => setHeaderVisible(true), 250);
    // Group 2: Tactical pitch & formation at 480ms / 440ms
    const t1 = setTimeout(() => setPitchVisible(true), 480);
    const t2 = setTimeout(() => setMobileVisible(true), 440);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Exact 11 verified Starting XI projects
  const startingXIProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => p.isStartingXI);
  }, []);

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return startingXIProjects.find((p) => p.id === selectedProjectId) ?? null;
  }, [startingXIProjects, selectedProjectId]);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const handleCloseDossier = () => {
    setSelectedProjectId(null);
  };

  return (
    <div id={id} className="lb-xi-root">

      {/* ── 1. FULL-PAGE DAYLIGHT STADIUM BACKGROUND ── */}
      <div className="lb-xi-bg-layer" aria-hidden="true">
        <picture className="lb-xi-bg-picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt=""
            className="lb-xi-bg-img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* ── 2. ATMOSPHERIC OVERLAYS ── */}
      <div className="lb-xi-atmosphere" aria-hidden="true">
        <div className="lb-xi-atm__top" />
        <div className="lb-xi-atm__scrim" />
        <div className="lb-xi-atm__bottom" />
      </div>

      {/* ── 3. AMBIENT EDITORIAL PHRASES ── */}
      <div className="lb-xi-ambient-phrases" aria-hidden="true">
        <span className="lb-xi-phrase lb-xi-phrase--tl">
          Ideas<br />→<br />Products
        </span>
        <span className="lb-xi-phrase lb-xi-phrase--br">
          Build.<br />Ship.<br />Repeat.
        </span>
      </div>

      {/* ── 4. PAGE CONTENT ── */}
      <div className="lb-xi-content">

        {/* Editorial Header */}
        <div className={`lb-xi-header ${headerVisible ? 'lb-xi-header--visible' : ''}`}>
          <div className="lb-xi-eyebrow">
            <span className="lb-xi-eyebrow-dot" aria-hidden="true" />
            <span>STARTING XI</span>
            <span className="lb-xi-eyebrow-divider" aria-hidden="true">·</span>
            <span>4–3–3 FORMATION</span>
          </div>
          <h1 className="lb-xi-title">My Starting XI</h1>
          <p className="lb-xi-subtitle">
            11 projects. One pitch. Full-stack applications and AI agent pipelines built across hackathons, capstones, and personal builds.
          </p>
        </div>

        {/* Desktop & Tablet Composition (Pitch + Dossier Panel) */}
        <div className={`lb-xi-desktop-view lb-xi-desktop-view--${pitchVisible ? 'visible' : 'hidden'}`}>
          <div className="lb-xi-grid">
            <div className="lb-xi-pitch-col">
              <FootballPitch
                projects={startingXIProjects}
                selectedProjectId={selectedProjectId}
                onSelectProject={handleSelectProject}
              />
            </div>
            <div className="lb-xi-dossier-col">
              <ScoutingDossier
                project={selectedProject}
                onClose={handleCloseDossier}
              />
            </div>
          </div>
        </div>

        {/* Mobile View (Tactical Formation List + Bottom Sheet) */}
        <div className={`lb-xi-mobile-view lb-xi-mobile-view--${mobileVisible ? 'visible' : 'hidden'}`}>
          <MobileFormationList
            projects={startingXIProjects}
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
          />
          {isMobile && (
            <ScoutingDossier
              project={selectedProject}
              onClose={handleCloseDossier}
              isMobileSheet={true}
            />
          )}
        </div>

      </div>{/* /lb-xi-content */}
    </div>
  );
};
