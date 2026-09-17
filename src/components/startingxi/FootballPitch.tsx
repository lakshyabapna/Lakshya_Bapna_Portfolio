import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { ProjectItem } from '../../data/projects';
import { STARTING_XI_FORMATION, FORMATION_CONNECTIONS, type PitchPosition } from '../../data/startingXI';
import { PlayerCard } from './PlayerCard';
import './FootballPitch.css';

interface FootballPitchProps {
  projects: ProjectItem[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export const FootballPitch: React.FC<FootballPitchProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasEnteredAll, setHasEnteredAll] = useState(false);
  const [isIlluminating, setIsIlluminating] = useState(false);
  const [enteredNodeIds, setEnteredNodeIds] = useState<Set<string>>(new Set());

  // Map project ID to project item
  const projectMap = useMemo(() => {
    const map = new Map<string, ProjectItem>();
    projects.forEach((p) => map.set(p.id, p));
    return map;
  }, [projects]);

  // Map project ID to formation position
  const positionMap = useMemo(() => {
    const map = new Map<string, PitchPosition>();
    STARTING_XI_FORMATION.forEach((pos) => map.set(pos.projectId, pos));
    return map;
  }, []);

  // Intersection observer for pitch entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Broadcast-style zone-by-zone formation reveal
  useEffect(() => {
    if (!isInView) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        setEnteredNodeIds(new Set(STARTING_XI_FORMATION.map((p) => p.projectId)));
        setHasEnteredAll(true);
      }, 0);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Zone-by-zone reveal timing:
    // GK: 350ms
    // DEF: 750ms - 1290ms (RB, RCB, LCB, LB)
    // MID: 1550ms - 1950ms (RCM, CM, LCM)
    // FWD: 2200ms - 2640ms (RW, CF, LW)
    // All illuminate together: 2950ms - 3650ms
    const getNodeDelay = (formationIndex: number): number => {
      if (formationIndex === 1) return 350;
      if (formationIndex <= 5) return 750 + (formationIndex - 2) * 180;
      if (formationIndex <= 8) return 1550 + (formationIndex - 6) * 200;
      return 2200 + (formationIndex - 9) * 220;
    };

    STARTING_XI_FORMATION.forEach((node) => {
      const delay = getNodeDelay(node.formationIndex);
      const t = setTimeout(() => {
        setEnteredNodeIds((prev) => new Set([...prev, node.projectId]));
      }, delay);
      timers.push(t);
    });

    // Phase 6: All 11 players briefly illuminate together
    const illuminationTimer = setTimeout(() => {
      setIsIlluminating(true);
    }, 2950);
    timers.push(illuminationTimer);

    // Phase 7: Formation becomes still & settles into idle float
    const finishTimer = setTimeout(() => {
      setIsIlluminating(false);
      setHasEnteredAll(true);
    }, 3650);
    timers.push(finishTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="xi-pitch-container"
      style={{ minHeight: '660px', height: '100%' }}
    >
      {/* Top telemetry bar */}
      <div className="xi-pitch-telemetry">
        <div className="xi-pitch-telemetry-left">
          <span className="xi-telemetry-live" aria-hidden="true" />
          <span>STARTING XI // 4-3-3 FORMATION</span>
        </div>
        <div className="xi-pitch-telemetry-right">
          <span>11 PROJECTS</span>
        </div>
      </div>

      {/* Pitch markings SVG */}
      <svg
        className={`xi-pitch-svg${isInView ? ' is-drawing' : ''}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="xiCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pitch Boundary */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="1.5"
          className="xi-pitch-line"
        />

        {/* Center Glow */}
        <circle cx="50" cy="50" r="16" className="xi-pitch-center-glow" />

        {/* Halfway Line */}
        <line x1="3" y1="50" x2="97" y2="50" className="xi-pitch-line" />

        {/* Center Circle & Spot */}
        <circle cx="50" cy="50" r="11" className="xi-pitch-line" />
        <circle cx="50" cy="50" r="0.6" className="xi-pitch-spot" />

        {/* Opponent Penalty Box (Top) */}
        <rect x="24" y="3" width="52" height="18" className="xi-pitch-line" />
        {/* Opponent Goal Box (Top) */}
        <rect x="36" y="3" width="28" height="7" className="xi-pitch-line" />
        {/* Opponent Penalty Arc */}
        <path
          d="M 41 21 A 10 10 0 0 0 59 21"
          className="xi-pitch-line"
        />
        <circle cx="50" cy="14" r="0.6" className="xi-pitch-spot" />

        {/* Own Penalty Box (Bottom) */}
        <rect x="24" y="79" width="52" height="18" className="xi-pitch-line" />
        {/* Own Goal Box (Bottom) */}
        <rect x="36" y="90" width="28" height="7" className="xi-pitch-line" />
        {/* Own Penalty Arc */}
        <path
          d="M 41 79 A 10 10 0 0 1 59 79"
          className="xi-pitch-line"
        />
        <circle cx="50" cy="86" r="0.6" className="xi-pitch-spot" />

        {/* Corner Arcs */}
        <path d="M 3 6 A 3 3 0 0 0 6 3" className="xi-pitch-line" />
        <path d="M 94 3 A 3 3 0 0 0 97 6" className="xi-pitch-line" />
        <path d="M 3 94 A 3 3 0 0 1 6 97" className="xi-pitch-line" />
        <path d="M 94 97 A 3 3 0 0 1 97 94" className="xi-pitch-line" />

        {/* Tactical Connection Vectors */}
        {FORMATION_CONNECTIONS.map(([p1Id, p2Id]) => {
          const pos1 = positionMap.get(p1Id);
          const pos2 = positionMap.get(p2Id);
          if (!pos1 || !pos2) return null;

          const isConnectedToSelected =
            selectedProjectId !== null &&
            (p1Id === selectedProjectId || p2Id === selectedProjectId);
          const isSelectedActive = selectedProjectId !== null;

          let lineClass = 'xi-vector-idle';
          if (isConnectedToSelected) {
            lineClass = 'xi-vector-active';
          } else if (isSelectedActive) {
            lineClass = 'xi-vector-faded';
          }

          return (
            <line
              key={`${p1Id}-${p2Id}`}
              x1={pos1.xPercent}
              y1={pos1.yPercent}
              x2={pos2.xPercent}
              y2={pos2.yPercent}
              className={lineClass}
            />
          );
        })}
      </svg>

      {/* Zone Orientation Labels */}
      <div className="xi-pitch-zone-label xi-pitch-zone-label--forward" aria-hidden="true">
        FORWARDS
      </div>
      <div className="xi-pitch-zone-label xi-pitch-zone-label--midfield" aria-hidden="true">
        MIDFIELD
      </div>
      <div className="xi-pitch-zone-label xi-pitch-zone-label--defence" aria-hidden="true">
        DEFENCE
      </div>
      <div className="xi-pitch-zone-label xi-pitch-zone-label--gk" aria-hidden="true">
        GOALKEEPER
      </div>

      {/* Positioned Project Cards Layer */}
      <div className="xi-pitch-nodes">
        {STARTING_XI_FORMATION.map((pos) => {
          const project = projectMap.get(pos.projectId);
          if (!project) return null;

          const isSelected = selectedProjectId === project.id;
          const isDimmed =
            selectedProjectId !== null && !isSelected;
          const hasEntered = enteredNodeIds.has(project.id) || hasEnteredAll;

          return (
            <PlayerCard
              key={project.id}
              project={project}
              position={pos}
              isSelected={isSelected}
              isDimmed={isDimmed}
              hasEntered={hasEntered}
              isIlluminating={isIlluminating}
              onSelect={() => onSelectProject(project.id)}
            />
          );
        })}
      </div>

      {/* Pitch Footer Instruction */}
      <div className="xi-pitch-footer">
        Click any project card to view full details
      </div>
    </div>
  );
};
