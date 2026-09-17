import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import './MatchTransition.css';

// Intro overlay phases (relative to mount):
//   0.0–1.4s  : approach  — exterior aerial
//   1.4–3.2s  : tunnel    — walkout tunnel
//   3.2–5.2s  : reveal    — pitch bowl + title card
//   5.2–6.0s  : dissolve  — crossfade into hero (CSS driven)

export interface MatchTransitionProps {
  isOpen: boolean;
  /** Ms from mount at which the dissolve CSS class is applied */
  dissolveAt?: number;
}

export type IntroPhase =
  | 'approach'
  | 'tunnel'
  | 'reveal'
  | 'dissolve';

export const MatchTransition: React.FC<MatchTransitionProps> = ({
  isOpen,
  dissolveAt = 5200,
}) => {
  const [phase, setPhase] = useState<IntroPhase>('approach');
  const [step, setStep] = useState<number>(0);
  // step 0: no text | 1: ENTERING | 2: LAKSHYA BAPNA | 3: PORTFOLIO
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    if (shouldReduceMotion) {
      return;
    }

    const startTime = Date.now();
    const TICK = 16;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed < 1400) {
        setPhase('approach');
      } else if (elapsed < 3200) {
        setPhase('tunnel');
      } else if (elapsed < dissolveAt) {
        setPhase('reveal');
      } else {
        setPhase('dissolve');
      }

      // Title card steps during reveal (3.2–5.2s)
      if (elapsed >= 4700) {
        setStep(3);
      } else if (elapsed >= 4100) {
        setStep(2);
      } else if (elapsed >= 3500) {
        setStep(1);
      } else {
        setStep(0);
      }
    }, TICK);

    return () => clearInterval(timer);
  }, [isOpen, dissolveAt, shouldReduceMotion]);

  if (!isOpen) return null;

  return (
    <aside
      className={`lb-stadium-intro lb-stadium-intro--${phase} lb-stadium-intro--step-${step}${shouldReduceMotion ? ' is-reduced-motion' : ''}`}
      role="status"
      aria-label="Entering Lakshya Bapna Portfolio Stadium"
    >
      <div className="lb-stadium-intro__viewport" aria-hidden="true">
        <div className="lb-stadium-intro__layer lb-stadium-intro__layer--approach">
          <picture className="lb-stadium-intro__pic">
            <source type="image/webp" srcSet="/assets/hero/stadium_aerial_approach.webp" />
            <img
              src="/assets/hero/stadium_aerial_approach_hd.png"
              alt="Stadium Approach Atmosphere"
              className="lb-stadium-intro__img"
              loading="eager"
            />
          </picture>
        </div>

        <div className="lb-stadium-intro__layer lb-stadium-intro__layer--tunnel">
          <picture className="lb-stadium-intro__pic">
            <source type="image/webp" srcSet="/assets/hero/stadium_tunnel_walkout.webp" />
            <img
              src="/assets/hero/stadium_tunnel_walkout_hd.png"
              alt="Player Tunnel Walkout"
              className="lb-stadium-intro__img"
              loading="eager"
            />
          </picture>
        </div>

        <div className="lb-stadium-intro__layer lb-stadium-intro__layer--reveal">
          <picture className="lb-stadium-intro__pic">
            <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
            <img
              src="/assets/hero/stadium_daylight_main_hd.png"
              alt="Daylight Stadium Pitch Reveal"
              className="lb-stadium-intro__img"
              loading="eager"
            />
          </picture>
        </div>

        <div className="lb-stadium-intro__lighting" />
        <div className="lb-stadium-intro__sweep" />
      </div>

      <div className="lb-stadium-intro__veil" aria-hidden="true" />

      <div className="lb-stadium-intro__title-card" aria-hidden="true">
        <span className="lb-stadium-intro__eyebrow">ENTERING</span>
        <h1 className="lb-stadium-intro__name">LAKSHYA BAPNA</h1>
        <span className="lb-stadium-intro__sub">PORTFOLIO</span>
      </div>
    </aside>
  );
};
