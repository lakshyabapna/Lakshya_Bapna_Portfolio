import React, { useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Sparkles, Code2, GraduationCap, Zap, Cpu } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import './PlayerCard.css';

export interface PlayerCardProps {
  photoUrl?: string | null;
  className?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  photoUrl = PROFILE_DATA.avatarUrl,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = 9;
    const rX = -((y - centerY) / centerY) * maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!shouldReduceMotion) {
      setIsHovered(true);
    }
  }, [shouldReduceMotion]);

  const cardStrengths = [
    { label: 'AI SYSTEMS', icon: <GraduationCap size={13} /> },
    { label: 'FULL STACK', icon: <Code2 size={13} /> },
    { label: 'PROBLEM SOLVING', icon: <Cpu size={13} /> },
    { label: 'BUILDING', icon: <Zap size={13} /> }
  ];

  return (
    <div 
      className={`lb-personal-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Restrained Energy Aura Behind Card */}
      {!shouldReduceMotion && (
        <div className={`lb-personal-card-aura ${isHovered ? 'is-active' : ''}`} aria-hidden="true">
          <div className="personal-aura-wisp wisp-emerald" />
          <div className="personal-aura-wisp wisp-gold" />
        </div>
      )}

      <div 
        ref={cardRef}
        className={`lb-personal-card ${isHovered ? 'lb-personal-card--hovered' : ''}`}
        style={{
          transform: shouldReduceMotion 
            ? 'none' 
            : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
        tabIndex={0}
        role="region"
        aria-label={`Collectible Player Card for ${PROFILE_DATA.name}`}
      >
        {/* Holographic Specular Glare */}
        <div 
          className="lb-personal-card__glare"
          style={{
            '--glare-x': `${glarePosition.x}%`,
            '--glare-y': `${glarePosition.y}%`,
            opacity: isHovered ? 0.35 : 0.08
          } as React.CSSProperties}
          aria-hidden="true"
        />

        {/* Specular Light Sweep */}
        {!shouldReduceMotion && (
          <div className="lb-personal-card__sweep" aria-hidden="true" />
        )}

        {/* Card Gold/Emerald Border Rim */}
        <div className="lb-personal-card__rim" aria-hidden="true" />

        {/* Card Header */}
        <div className="lb-personal-card__header">
          <div className="lb-card-kit">
            <span className="lb-kit-num font-athlete">#10</span>
            <span className="lb-kit-pos font-mono">BUILD PROFILE</span>
          </div>

          <div className="lb-card-edition font-mono">
            <Sparkles size={13} className="lb-card-spark-icon" />
            <span>SIGNATURE EDITION</span>
          </div>
        </div>

        {/* Card Portrait / Monochrome Silhouette */}
        <div className="lb-personal-card__photo-box">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={PROFILE_DATA.name} 
              className="lb-personal-card__photo-img"
              loading="lazy"
            />
          ) : (
            <div className="lb-personal-card__photo-placeholder">
              <div className="lb-photo-frame">
                <div className="lb-photo-monogram font-athlete">LB</div>
                <div className="lb-photo-silhouette" aria-hidden="true">
                  <div className="lb-photo-head" />
                  <div className="lb-photo-torso" />
                </div>
              </div>
              <span className="lb-photo-status font-mono">PLAYER PROFILE</span>
            </div>
          )}
        </div>

        {/* Card Identity */}
        <div className="lb-personal-card__identity">
          <h3 className="lb-personal-card__name font-athlete">LAKSHYA BAPNA</h3>
          <p className="lb-personal-card__role font-mono">AI / FULL-STACK DEVELOPER</p>
          <p className="lb-personal-card__sub font-mono">NEWTON SCHOOL OF TECHNOLOGY</p>
        </div>

        {/* Selected Strengths (Zero fake ratings) */}
        <div className="lb-personal-card__strengths">
          {cardStrengths.map((s, idx) => (
            <div key={idx} className="lb-card-strength-pill font-mono">
              <span className="lb-strength-icon">{s.icon}</span>
              <span className="lb-strength-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Card Footer */}
        <div className="lb-personal-card__footer font-mono">
          <span className="lb-footer-badge">FIRST TEAM</span>
          <span className="lb-footer-season">SEASON 2024–2028</span>
        </div>
      </div>
    </div>
  );
};
