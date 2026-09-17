import React from 'react';
import './StadiumAtmosphere.css';

export interface StadiumAtmosphereProps {
  activeRoute?: 'home' | 'the-player' | 'skills' | 'starting-xi' | 'timeline' | 'connect';
  className?: string;
}

/**
 * Unified Stadium Environment (Santiago Bernabéu Daylight)
 * 
 * Shared across all 6 pages (Home, The Player, Skills, Starting XI, Timeline, Connect).
 * Sits persistently at z-index 0 so page navigations NEVER reload the background asset,
 * reset camera drift, or cause visual jumping.
 */
export const StadiumAtmosphere: React.FC<StadiumAtmosphereProps> = ({
  activeRoute = 'home',
  className = '',
}) => {
  return (
    <div
      className={`lb-stadium-atm lb-stadium-atm--${activeRoute} ${className}`.trim()}
      aria-hidden="true"
    >
      {/* 1. Cinematic Daylight Stadium Image Layer */}
      <div className="lb-stadium-atm__bg-layer">
        <picture className="lb-stadium-atm__picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt=""
            className="lb-stadium-atm__img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* 2. Universal Atmospheric Overlays (Lighting, Scrims & Depth) */}
      <div className="lb-stadium-atm__lighting">
        {/* Top readability gradient for fixed Broadcast HUD */}
        <div className="lb-stadium-atm__hud-scrim" />

        {/* Volumetric Sunlight Burst aligned to sun at 82% 16% */}
        <div className="lb-stadium-atm__sunburst" />

        {/* Emerald pitch grass haze at bottom */}
        <div className="lb-stadium-atm__pitch-haze" />

        {/* Edge vignette for visual focus */}
        <div className="lb-stadium-atm__vignette" />

        {/* Route-Specific Readability Scrim (transitions smoothly via CSS) */}
        <div className="lb-stadium-atm__route-scrim" />
      </div>
    </div>
  );
};
