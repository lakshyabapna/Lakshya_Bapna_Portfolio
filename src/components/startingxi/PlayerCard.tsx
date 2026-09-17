import React, { useRef, useCallback, useState } from 'react';
import type { ProjectItem } from '../../data/projects';
import type { PitchPosition } from '../../data/startingXI';
import './PlayerCard.css';

interface PlayerCardProps {
  project: ProjectItem;
  position: PitchPosition;
  isSelected: boolean;
  isDimmed: boolean;
  hasEntered: boolean;
  isIlluminating?: boolean;
  onSelect: () => void;
}

/** Derive a display-friendly short category string */
function getCategory(project: ProjectItem): string {
  const techs = project.technologies;
  if (techs.includes('BM25Plus') || techs.includes('AI Agents')) return 'AI / AGENTS';
  if (techs.includes('Whisper STT') || (techs.includes('LangGraph') && techs.includes('FastAPI'))) return 'AI / FULL-STACK';
  if (techs.includes('PyTorch') || techs.includes('PyTorch (GANs)')) return 'HEALTHCARE AI';
  if (techs.includes('Gemini Vision') || techs.includes('Google Gemini Vision') || techs.includes('OpenCV')) return 'VISION / AI';
  if (techs.includes('Streamlit') || techs.includes('Gensim') || techs.includes('Gensim (LDA)')) return 'GENAI / NLP';
  if (techs.includes('Tableau') || techs.includes('Tableau Public') || techs.includes('Pandas')) return 'DATA / ANALYTICS';
  if (techs.includes('MongoDB') || techs.includes('MongoDB Atlas') || techs.includes('Express') || techs.includes('Express 5')) return 'FULL-STACK';
  if (techs.includes('Context API') || techs.includes('E-Commerce')) return 'REACT / E-COM';
  if (techs.includes('React Scroll') || techs.includes('React-Scroll')) return 'REACT / WEB';
  if (techs.includes('React') || techs.includes('React 19') || techs.includes('React 18')) return 'REACT / WEB';
  return 'SOFTWARE';
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  project,
  position,
  isSelected,
  isDimmed,
  hasEntered,
  isIlluminating = false,
  onSelect,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Unique float timing per card to avoid synchrony
  const floatDuration = 4.2 + (position.formationIndex % 5) * 0.38;
  const floatDelay = -(position.formationIndex * 0.37);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxTilt = 8;
    setTilt({
      rx: -((y - cy) / cy) * maxTilt,
      ry: ((x - cx) / cx) * maxTilt,
    });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const category = getCategory(project);

  // Restrained broadcast energy accent: emerald, gold, frost, warm-white
  const getEnergyType = () => {
    const kit = project.kitNumber;
    if (kit === '#10' || kit === '#09' || kit === '#07') return 'energy-emerald';
    if (kit === '#08' || kit === '#11' || kit === '#06') return 'energy-gold';
    if (kit === '#05' || kit === '#04' || kit === '#03' || kit === '#15') return 'energy-frost';
    return 'energy-warm';
  };

  const energyClass = getEnergyType();

  const positionStyle: React.CSSProperties = {
    left: `${position.xPercent}%`,
    top: `${position.yPercent}%`,
  };

  return (
    <div
      className={`xi-player-wrap ${hasEntered ? 'has-entered' : 'is-entering'} ${isIlluminating ? 'is-illuminating' : ''} ${energyClass}${isHovered ? ' is-hovered' : ''}`}
      style={positionStyle}
    >
      <button
        ref={btnRef}
        type="button"
        className={`xi-player-btn${isSelected ? ' is-selected' : ''}${isDimmed ? ' is-dimmed' : ''}${isHovered ? ' is-hovered' : ''}`}
        aria-label={`Project: ${project.name} — ${project.tagline ?? ''}. Press to open full project details.`}
        aria-pressed={isSelected}
        onClick={onSelect}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`xi-card xi-card--${energyClass}`}
          style={{
            '--xi-float-duration': `${floatDuration}s`,
            '--xi-float-delay': `${floatDelay}s`,
            transform: isHovered && (tilt.rx !== 0 || tilt.ry !== 0)
              ? `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
              : undefined,
          } as React.CSSProperties}
        >
          {/* Holographic glare */}
          <div
            className="xi-card__glare"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(212,175,55,0.14) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />

          <span className="xi-card__kit">{project.kitNumber}</span>
          <span className="xi-card__name">{project.name}</span>
          <span className="xi-card__category">{category}</span>

          <div className="xi-card__status-row">
            {project.isLive && (
              <span className="xi-card__live-dot" aria-hidden="true" title="Live deployed" />
            )}
            {project.isCollaborative && (
              <span className="xi-card__collab" aria-label="Collaborative project">COLLAB</span>
            )}
          </div>
        </div>

        <span className="xi-card__tactical" aria-hidden="true">{position.tacticalLabel}</span>
        <div className="xi-player-aura" aria-hidden="true" />
      </button>
    </div>
  );
};
