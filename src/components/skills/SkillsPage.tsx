import React, { useState, useEffect, useRef } from 'react';
import { CURATED_SKILLS, SKILLS_CATEGORIES, type SkillCategory, type SkillItem } from '../../data/skills';
import { TechIcon } from './TechIcon';
import { ArrowRight } from 'lucide-react';
import './SkillsPage.css';

interface SkillsPageProps {
  onNavigateProjects?: () => void;
}

const CATEGORY_META: Record<SkillCategory, { emoji: string; accent: string; desc: string; iconType: string }> = {
  'AI & Intelligence':   { emoji: '🤖', accent: '#059669', desc: 'LLMs, agentic pipelines, reasoning', iconType: 'ai' },
  'Languages':           { emoji: '💻', accent: '#3B82F6', desc: 'Core programming languages',          iconType: 'lang' },
  'Backend':             { emoji: '⚙️', accent: '#8B5CF6', desc: 'APIs, servers, frameworks',           iconType: 'backend' },
  'Frontend':            { emoji: '🎨', accent: '#38BDF8', desc: 'UI frameworks and tooling',           iconType: 'frontend' },
  'Data & Databases':    { emoji: '🗄️', accent: '#F59E0B', desc: 'Storage, retrieval, analytics',      iconType: 'data' },
  'Deployment':          { emoji: '🚀', accent: '#00C7B7', desc: 'Hosting, CI/CD, cloud',              iconType: 'deploy' },
  'Tools':               { emoji: '🛠️', accent: '#94A3B8', desc: 'Version control and utilities',      iconType: 'tools' },
};

export const SkillsPage: React.FC<SkillsPageProps> = ({ onNavigateProjects }) => {
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Staggered entrance sequence on mount
  useEffect(() => {
    // Header first
    const t0 = setTimeout(() => setHeaderVisible(true), 200);

    // Cards with stagger
    const timers: ReturnType<typeof setTimeout>[] = [];
    SKILLS_CATEGORIES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCategories(prev => new Set([...prev, i]));
      }, 500 + i * 110);
      timers.push(t);
    });

    // CTA last
    const tCta = setTimeout(() => setCtaVisible(true), 500 + SKILLS_CATEGORIES.length * 110 + 200);

    return () => {
      clearTimeout(t0);
      clearTimeout(tCta);
      timers.forEach(clearTimeout);
    };
  }, []);

  // IntersectionObserver fallback if navigating back
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lb-skills-root" id="skills">

      {/* ── 1. FULL-PAGE DAYLIGHT STADIUM BACKGROUND ── */}
      <div className="lb-skills-bg-layer" aria-hidden="true">
        <picture className="lb-skills-bg-picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt=""
            className="lb-skills-bg-img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* ── 2. ATMOSPHERIC OVERLAYS ── */}
      <div className="lb-skills-atmosphere" aria-hidden="true">
        {/* Top readability gradient for navbar */}
        <div className="lb-skills-atm__top" />
        {/* Center content readability scrim */}
        <div className="lb-skills-atm__content-scrim" />
        {/* Bottom pitch haze */}
        <div className="lb-skills-atm__bottom" />
      </div>

      {/* ── 3. FOOTBALL PITCH GEOMETRY SVG (tactical grid) ── */}
      <div className="lb-skills-pitch-geo" aria-hidden="true">
        <svg
          className="lb-pitch-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center circle */}
          <circle cx="720" cy="490" r="72" stroke="rgba(16,185,129,0.06)" strokeWidth="1" />
          <circle cx="720" cy="490" r="4" fill="rgba(16,185,129,0.08)" />
          {/* Center line */}
          <line x1="120" y1="490" x2="1320" y2="490" stroke="rgba(16,185,129,0.05)" strokeWidth="1" />
          {/* Vertical center line */}
          <line x1="720" y1="340" x2="720" y2="640" stroke="rgba(16,185,129,0.05)" strokeWidth="1" />
          {/* Left penalty box */}
          <rect x="120" y="408" width="160" height="164" stroke="rgba(16,185,129,0.05)" strokeWidth="1" />
          <rect x="120" y="440" width="70" height="100" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
          {/* Right penalty box */}
          <rect x="1160" y="408" width="160" height="164" stroke="rgba(16,185,129,0.05)" strokeWidth="1" />
          <rect x="1250" y="440" width="70" height="100" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
          {/* Corner arcs — subtle */}
          <path d="M120 340 Q135 355 150 340" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
          <path d="M1320 340 Q1305 355 1290 340" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
          {/* Diagonal tactical lines */}
          <line x1="300" y1="350" x2="550" y2="620" stroke="rgba(16,185,129,0.025)" strokeWidth="0.8" strokeDasharray="8 12" />
          <line x1="1140" y1="350" x2="890" y2="620" stroke="rgba(16,185,129,0.025)" strokeWidth="0.8" strokeDasharray="8 12" />
          {/* Passing arc motif */}
          <path d="M400 500 Q720 350 1040 500" stroke="rgba(16,185,129,0.04)" strokeWidth="0.8" strokeDasharray="6 14" />
          {/* Positional dots */}
          <circle cx="300" cy="430" r="2.5" fill="rgba(16,185,129,0.07)" />
          <circle cx="1140" cy="430" r="2.5" fill="rgba(16,185,129,0.07)" />
          <circle cx="500" cy="560" r="2.5" fill="rgba(16,185,129,0.06)" />
          <circle cx="940" cy="560" r="2.5" fill="rgba(16,185,129,0.06)" />
          <circle cx="720" cy="440" r="2.5" fill="rgba(16,185,129,0.07)" />
        </svg>
      </div>

      {/* ── 4. EDITORIAL ENVIRONMENT PHRASES ── */}
      <div className="lb-skills-ambient-phrases" aria-hidden="true">
        <span className="lb-ambient-phrase lb-ambient-phrase--tl">
          Build.<br />Learn.<br />Play.<br />Create.
        </span>
        <span className="lb-ambient-phrase lb-ambient-phrase--br">
          Build with<br />Purpose.
        </span>
      </div>

      {/* ── 5. PAGE CONTENT ── */}
      <div className="lb-skills-content">

        {/* Header */}
        <div className={`lb-skills-header ${headerVisible ? 'lb-skills-header--visible' : ''}`}>
          <div className="lb-skills-eyebrow">
            <span className="lb-skills-eyebrow-dot" aria-hidden="true" />
            <span>SKILLS</span>
          </div>
          <h1 className="lb-skills-title">My Toolkit</h1>
          <p className="lb-skills-subtitle">
            These are the tools I use to turn ideas into working products.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={sectionRef}
          className="lb-skills-grid"
          role="list"
          aria-label="Technical skill categories"
        >
          {SKILLS_CATEGORIES.map((category, catIdx) => {
            const meta = CATEGORY_META[category];
            const categorySkills = CURATED_SKILLS.filter(s => s.category === category);
            const isVisible = visibleCategories.has(catIdx);

            return (
              <div
                key={category}
                className={`lb-skill-zone ${isVisible ? 'lb-skill-zone--visible' : ''}`}
                style={{ '--zone-accent': meta.accent, '--zone-delay': `${catIdx * 90}ms` } as React.CSSProperties}
                role="listitem"
              >
                {/* Top accent rule */}
                <div className="lb-zone-accent-line" aria-hidden="true" />

                {/* Zone Header */}
                <div className="lb-zone-header">
                  <span className="lb-zone-emoji" aria-hidden="true">{meta.emoji}</span>
                  <div className="lb-zone-title-block">
                    <h2 className="lb-zone-title">{category}</h2>
                    <span className="lb-zone-desc">{meta.desc}</span>
                  </div>
                  <span className="lb-zone-count">{categorySkills.length}</span>
                </div>

                {/* Skill chips */}
                <div className="lb-zone-chips">
                  {categorySkills.map((skill: SkillItem, i) => (
                    <button
                      key={skill.id}
                      type="button"
                      className={[
                        'lb-skill-chip',
                        skill.highlight ? 'lb-skill-chip--highlight' : '',
                        hoveredSkill === skill.id ? 'lb-skill-chip--active' : '',
                      ].filter(Boolean).join(' ')}
                      style={{ '--chip-delay': `${catIdx * 90 + i * 45}ms` } as React.CSSProperties}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(skill.id)}
                      onBlur={() => setHoveredSkill(null)}
                      title={skill.description}
                      aria-label={`${skill.name}: ${skill.description}`}
                    >
                      <span className="lb-chip-icon" aria-hidden="true">
                        <TechIcon name={skill.iconType} size={16} />
                      </span>
                      <span className="lb-chip-name">{skill.name}</span>
                      {skill.highlight && <span className="lb-chip-star" aria-hidden="true">★</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className={`lb-skills-cta ${ctaVisible ? 'lb-skills-cta--visible' : ''}`}>
          <div className="lb-skills-cta-pitch-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="12" width="56" height="40" rx="3" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" />
              <line x1="32" y1="12" x2="32" y2="52" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="8" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" />
              <rect x="4" y="22" width="12" height="20" rx="1" stroke="rgba(16,185,129,0.5)" strokeWidth="1" />
              <rect x="48" y="22" width="12" height="20" rx="1" stroke="rgba(16,185,129,0.5)" strokeWidth="1" />
            </svg>
          </div>
          <div className="lb-skills-cta-text">
            <p className="lb-skills-cta-heading">See every technology above in action</p>
            <p className="lb-skills-cta-sub">11 production projects on the pitch</p>
          </div>
          <button
            type="button"
            id="skills-explore-starting-xi-btn"
            className="lb-skills-cta-btn"
            onClick={onNavigateProjects}
            aria-label="Explore Starting XI projects"
          >
            <span>Explore Starting XI</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>{/* /lb-skills-content */}
    </div>
  );
};
