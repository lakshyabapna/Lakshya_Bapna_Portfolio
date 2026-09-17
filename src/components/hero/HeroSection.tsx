import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import { ArrowDownRight, FileText, CheckCircle2 } from 'lucide-react';
import './HeroSection.css';

export interface HeroSectionProps {
  onExploreProjects?: () => void;
  onOpenResume?: () => void;
  forcePosterFallback?: boolean;
  isIntroActive?: boolean;
}

const EASE_BROADCAST = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenResume,
  forcePosterFallback: _forcePosterFallback = false,
  isIntroActive = false,
}) => {
  const [resumeToast, setResumeToast] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const animationStarted = !isIntroActive;
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Compact Overlapping Choreography ──────────────────────────────────
  // Delays are relative to when isIntroActive flips false (4.0s from load).
  // Stagger: ~120–150ms between elements. Total assembly: ~1.05s.
  // Elements overlap intentionally — cinematic edit, not sequential load.
  //
  // From first paint:
  //  4.00s: eyebrow
  //  4.12s: name       (+120ms)
  //  4.26s: role       (+140ms)
  //  4.42s: desc       (+160ms)
  //  4.56s: btn1       (+140ms)
  //  4.70s: btn2       (+140ms)
  //  4.90s: telemetryL (+200ms)
  //  5.05s: telemetryR (+150ms)
  //  5.05s: fully settled
  const delays = shouldReduceMotion
    ? {
        eyebrow: 0,
        name: 0,
        role: 0,
        desc: 0,
        btn1: 0,
        btn2: 0,
        telemetryLeft: 0,
        telemetryRight: 0,
      }
    : isMobile
    ? {
        eyebrow: 0.0,
        name: 0.10,
        role: 0.22,
        desc: 0.34,
        btn1: 0.46,
        btn2: 0.57,
        telemetryLeft: 0.72,
        telemetryRight: 0.85,
      }
    : {
        eyebrow: 0.0,
        name: 0.12,
        role: 0.26,
        desc: 0.42,
        btn1: 0.56,
        btn2: 0.70,
        telemetryLeft: 0.90,
        telemetryRight: 1.05,
      };

  const handleProjectsClick = () => {
    if (onExploreProjects) {
      onExploreProjects();
    } else {
      window.location.hash = '#starting-xi';
    }
  };

  const handleResumeClick = () => {
    if (onOpenResume) {
      onOpenResume();
      return;
    }

    if (PROFILE_DATA.links.resumeUrl) {
      window.open(PROFILE_DATA.links.resumeUrl, '_blank', 'noopener,noreferrer');
    } else {
      setResumeToast('Resume PDF attachment will be linked once updated.');
      setTimeout(() => setResumeToast(null), 3500);
    }
  };

  return (
    <header className="lb-hero-root" id="home" role="banner">
      {/* Crisp Daylight Stadium Image Layer */}
      <div className="lb-hero-bg-layer" aria-hidden="true">
        <picture className="lb-hero-bg-picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt="Santiago Bernabéu Stadium Atmosphere in Daylight"
            className="lb-hero-bg-img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Atmospheric Overlays & Lighting */}
      <div className="lb-hero-atmosphere" aria-hidden="true">
        <div className="lb-hero-atmosphere__dark-grade" />
        <div className="lb-hero-atmosphere__floodlights" />
        <div className="lb-hero-atmosphere__pitch-haze" />
        <div className="lb-hero-atmosphere__vignette" />
      </div>

      {/* Subtle Pitch Geometry (minimal & non-intrusive) */}
      <div className="lb-hero-pitch-geometry" aria-hidden="true">
        <svg className="lb-pitch-svg" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <line x1="0" y1="849" x2="1440" y2="849" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
        </svg>
      </div>

      {/* Editorial Content */}
      <div className="lb-hero-content-wrapper">
        <div className="lb-hero-editorial-layout">
          <div className="lb-hero-primary-col">
            
            {/* 2.5–3.3s: Eyebrow (BUILD · LEARN · PLAY · CREATE) */}
            <motion.div 
              className="lb-hero-eyebrow"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: delays.eyebrow, ease: EASE_BROADCAST }}
            >
              <span className="lb-hero-eyebrow-text">BUILD &nbsp;·&nbsp; LEARN &nbsp;·&nbsp; PLAY &nbsp;·&nbsp; CREATE</span>
            </motion.div>

            {/* Headline */}
            <div className="lb-hero-editorial-title">
              {/* 3.3–4.3s: Name Reveal (Hero Moment) */}
              <motion.h1 
                className="lb-hero-name"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.85, delay: delays.name, ease: EASE_BROADCAST }}
              >
                <span className="lb-hero-name-row">LAKSHYA</span>
                <span className="lb-hero-name-row">BAPNA</span>
              </motion.h1>

              {/* 4.3–5.1s: Role Lockup with Accent */}
              <motion.div 
                className="lb-hero-role-lockup"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.65, delay: delays.role, ease: EASE_BROADCAST }}
              >
                <span className="lb-hero-role-text">AI / Full-Stack Developer</span>
                <span className="lb-hero-role-line" aria-hidden="true" />
              </motion.div>

              {/* 5.1–5.9s: Description / Tagline */}
              <motion.p 
                className="lb-hero-statement"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.7, delay: delays.desc, ease: EASE_BROADCAST }}
              >
                Building intelligent products from ideas to execution.
              </motion.p>
            </div>

            {/* 5.9–6.8s: CTAs (Subtly staggered) */}
            <div className="lb-hero-cta-group">
              <motion.button
                type="button"
                className="lb-hero-btn lb-hero-btn--primary"
                onClick={handleProjectsClick}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: delays.btn1, ease: EASE_BROADCAST }}
              >
                <ArrowDownRight size={17} className="lb-hero-btn-icon" />
                <span>Explore Projects</span>
              </motion.button>

              <motion.button
                type="button"
                className="lb-hero-btn lb-hero-btn--secondary"
                onClick={handleResumeClick}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: delays.btn2, ease: EASE_BROADCAST }}
              >
                <FileText size={16} className="lb-hero-btn-icon" />
                <span>View Resume</span>
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* 6.8–7.8s: Bottom Telemetry Bars */}
      <div className="lb-hero-bottom-telemetry" aria-label="Portfolio status metadata">
        <motion.div 
          className="lb-hero-telemetry-left"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.75, delay: delays.telemetryLeft, ease: EASE_BROADCAST }}
        >
          <div className="lb-telemetry-opp-label">
            <span className="lb-telemetry-live-dot" />
            <span className="lb-telemetry-opp-text">OPEN TO OPPORTUNITIES</span>
          </div>
          <span className="lb-telemetry-school font-mono">Newton School of Technology &apos;28</span>
        </motion.div>

        <motion.div 
          className="lb-hero-telemetry-right"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.75, delay: delays.telemetryRight, ease: EASE_BROADCAST }}
        >
          <span className="lb-telemetry-tagline-top">FOOTBALL INSPIRES</span>
          <span className="lb-telemetry-tagline-main">BETTER BUILDERS</span>
        </motion.div>
      </div>

      {resumeToast && (
        <div className="lb-hero-toast" role="status" aria-live="polite">
          <CheckCircle2 size={16} className="lb-toast-check" />
          <span className="font-mono">{resumeToast}</span>
        </div>
      )}

      {/* Subtle light transition seam */}
      <div className="lb-hero-bottom-seam" aria-hidden="true" />
    </header>
  );
};
