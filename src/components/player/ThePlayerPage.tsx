import React from 'react';
import { PlayerCard } from './PlayerCard';
import { PROFILE_DATA } from '../../data/profile';
import playerPhoto from '../../assets/ThePlayer/Theplayercard.jpeg';
import { 
  GraduationCap, 
  MapPin, 
  ArrowRight,
  Target
} from 'lucide-react';
import './ThePlayerPage.css';

interface ThePlayerPageProps {
  onNavigateProjects?: () => void;
  onNavigateConnect?: () => void;
}

export const ThePlayerPage: React.FC<ThePlayerPageProps> = ({
  onNavigateProjects,
  onNavigateConnect
}) => {
  const handleProjectsClick = () => {
    if (onNavigateProjects) {
      onNavigateProjects();
    } else {
      window.location.hash = '#starting-xi';
    }
  };

  const handleConnectClick = () => {
    if (onNavigateConnect) {
      onNavigateConnect();
    } else {
      window.location.hash = '#connect';
    }
  };

  return (
    <div className="lb-player-page-root" id="the-player">
      {/* 1. Full-Page Cinematic Daylight Stadium Background Layer */}
      <div className="lb-player-bg-layer" aria-hidden="true">
        <picture className="lb-player-bg-picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt="Santiago Bernabéu Stadium Atmosphere in Daylight"
            className="lb-player-bg-img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* 2. Atmospheric Overlays (Preserves blue sky, warm sunlight & green pitch) */}
      <div className="lb-player-atmosphere" aria-hidden="true">
        <div className="lb-player-atmosphere__sky-readability" />
        <div className="lb-player-atmosphere__floodlights" />
        <div className="lb-player-atmosphere__pitch-haze" />
        <div className="lb-player-atmosphere__vignette" />
      </div>

      {/* 3. Main Transparent Content Container */}
      <div className="lb-player-content-wrapper">
        
        {/* Editorial Header */}
        <div className="lb-player-header lb-anim-fade-up">
          <div className="lb-player-eyebrow">
            <span className="lb-player-eyebrow-text">THE PLAYER</span>
          </div>
          <h1 className="lb-player-title">About Me</h1>
          <p className="lb-player-subtitle">
            {PROFILE_DATA.shortTagline}
          </p>
        </div>

        {/* Two-Column Grid: Left Collectible Card | Right Frosted About Panel */}
        <div className="lb-player-layout-grid">
          
          {/* Left Column: Signature FC Player Card */}
          <div className="lb-player-card-col lb-anim-fade-up lb-anim-delay-1">
            <PlayerCard photoUrl={playerPhoto || PROFILE_DATA.avatarUrl} />
            <p className="lb-player-card-caption font-mono">
              Hover to experience 3D tilt &amp; holographic sheen
            </p>
          </div>

          {/* Right Column: "A Little More About Me" Translucent Glass Panel */}
          <div className="lb-player-bio-col lb-anim-fade-up lb-anim-delay-2">
            <div className="lb-player-bio-panel">
              <h2 className="lb-player-bio-heading">A Little More About Me</h2>

              {/* 4 Personal, Human First-Person Paragraphs */}
              <div className="lb-player-bio-body">
                {PROFILE_DATA.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Info Tiles Strip (Education, Primary Focus, Location & Status) */}
              <div className="lb-player-info-grid">
                
                {/* 1. Education */}
                <div className="lb-player-info-tile">
                  <div className="lb-info-icon-wrap lb-info-icon-wrap--emerald">
                    <GraduationCap size={17} />
                  </div>
                  <div className="lb-info-tile-content">
                    <span className="lb-info-tile-label font-mono">EDUCATION</span>
                    <span className="lb-info-tile-val">{PROFILE_DATA.education}</span>
                    <span className="lb-info-tile-sub font-mono">(2024 – 2028)</span>
                  </div>
                </div>

                {/* 2. Primary Focus */}
                <div className="lb-player-info-tile">
                  <div className="lb-info-icon-wrap lb-info-icon-wrap--teal">
                    <Target size={17} />
                  </div>
                  <div className="lb-info-tile-content">
                    <span className="lb-info-tile-label font-mono">PRIMARY FOCUS</span>
                    <span className="lb-info-tile-val">{PROFILE_DATA.currentFocus}</span>
                  </div>
                </div>

                {/* 3. Location & Status */}
                <div className="lb-player-info-tile">
                  <div className="lb-info-icon-wrap lb-info-icon-wrap--emerald">
                    <MapPin size={17} />
                  </div>
                  <div className="lb-info-tile-content">
                    <span className="lb-info-tile-label font-mono">LOCATION &amp; STATUS</span>
                    <span className="lb-info-tile-val">{PROFILE_DATA.location}</span>
                    <div className="lb-info-status-bullets font-mono">
                      <span className="lb-status-bullet lb-status-bullet--green">
                        <span className="lb-bullet-dot lb-bullet-dot--green" /> Open to Opportunities
                      </span>
                      <span className="lb-status-bullet lb-status-bullet--gold">
                        <span className="lb-bullet-dot lb-bullet-dot--gold" /> Loves Sports &amp; Travel
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="lb-player-bio-actions">
                <button 
                  type="button" 
                  className="lb-player-btn-primary"
                  onClick={handleProjectsClick}
                >
                  <span>View Starting XI Projects</span>
                  <ArrowRight size={15} className="lb-player-btn-arrow" />
                </button>

                <button 
                  type="button" 
                  className="lb-player-btn-secondary"
                  onClick={handleConnectClick}
                >
                  <span>Get In Touch</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4. Core Competencies Section */}
        <div className="lb-player-competencies-section lb-anim-fade-up lb-anim-delay-3">
          <div className="lb-competencies-header-bar">
            <h3 className="lb-competencies-title">Core Competencies</h3>
            <div className="lb-competencies-seam" aria-hidden="true" />
            <span className="lb-competencies-tag font-mono">SKILLS THAT DRIVE MY GAME</span>
          </div>

          <div className="lb-competencies-grid">
            {PROFILE_DATA.coreStrengths.map((item, idx) => (
              <div key={idx} className="lb-competency-card">
                <div className="lb-competency-top">
                  <span className="lb-competency-idx font-mono">0{idx + 1}</span>
                  <h4 className="lb-competency-name">{item.name}</h4>
                </div>
                <p className="lb-competency-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
