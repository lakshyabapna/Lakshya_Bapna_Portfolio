import React, { useState, useEffect, useRef } from 'react';
import { TIMELINE_DATA, type TimelineEvent } from '../../data/timeline';
import { FootballIcon } from '../ui/FootballIcon';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Trophy
} from 'lucide-react';
import './TimelinePage.css';

interface TimelinePageProps {
  onNavigateConnect?: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigateConnect }) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Grouped editorial entrance sequence (Target: ~850–1050ms total perceived rhythm)
  useEffect(() => {
    // Group 1: Header reveals first at 250ms (transition 0.55s -> settles by ~800ms)
    const t0 = setTimeout(() => setHeaderVisible(true), 250);

    // Group 2: Primary content (Timeline cards)
    // Grouped reveal in pairs so elements settle naturally without endless single-item staggering
    const timers: ReturnType<typeof setTimeout>[] = [];
    TIMELINE_DATA.forEach((_, idx) => {
      const group = Math.floor(idx / 2);
      const delay = 450 + group * 90;
      const t = setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, idx]));
      }, delay);
      timers.push(t);
    });

    // Group 3: Secondary details (Closing CTA footer settles by ~1.05s)
    const tCta = setTimeout(() => {
      setCtaVisible(true);
    }, 750);

    return () => {
      clearTimeout(t0);
      clearTimeout(tCta);
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleConnectClick = () => {
    if (onNavigateConnect) {
      onNavigateConnect();
    } else {
      window.location.hash = '#connect';
    }
  };

  return (
    <div className="lb-timeline-root" id="timeline" ref={sectionRef}>
      
      {/* ── 1. AMBIENT EDITORIAL PHRASES ── */}
      <div className="lb-timeline-ambient-phrases" aria-hidden="true">
        <span className="lb-ambient-phrase lb-ambient-phrase--tl">
          Every Season.<br />Every Match.<br />Every Lesson.
        </span>
        <span className="lb-ambient-phrase lb-ambient-phrase--br">
          Built with<br />Discipline &amp; Grit.
        </span>
      </div>

      {/* ── 2. CONTENT WRAPPER (Transparent over Stadium Atmosphere) ── */}
      <div className="lb-timeline-content-wrap">

        {/* Editorial Header */}
        <header className={`lb-timeline-header ${headerVisible ? 'lb-timeline-header--visible' : ''}`}>
          <div className="lb-timeline-eyebrow">
            <span className="lb-timeline-eyebrow-dot" />
            <span className="font-mono">CAREER JOURNEY</span>
            <span className="lb-timeline-eyebrow-sep font-mono">//</span>
            <span className="lb-timeline-eyebrow-season font-mono">2021 — PRESENT</span>
          </div>
          <h1 className="lb-timeline-title">My Journey</h1>
          <p className="lb-timeline-subtitle">
            From school foundations to building AI systems, full-stack products, and everything I've learned along the way.
          </p>
        </header>

        {/* Central Vertical Timeline */}
        <div className="lb-timeline-track">
          
          {/* Central Pitch Touchline Spine */}
          <div className="lb-timeline-spine" aria-hidden="true">
            <div className="lb-spine-line" />
          </div>

          <div className="lb-timeline-events">
            {TIMELINE_DATA.map((event: TimelineEvent, idx: number) => {
              const isLeft = idx % 2 === 0;
              const isVisible = visibleCards.has(idx);

              return (
                <div 
                  key={event.id} 
                  className={`lb-timeline-row ${isLeft ? 'lb-timeline-row--left' : 'lb-timeline-row--right'} ${event.isCurrent ? 'lb-timeline-row--current' : ''} ${isVisible ? 'lb-timeline-row--visible' : ''}`}
                >
                  {/* Spine Ball Marker */}
                  <div className="lb-timeline-node" aria-hidden="true">
                    <div className={`lb-node-ball ${event.isCurrent ? 'lb-node-ball--current' : ''}`}>
                      <FootballIcon size={18} glow={event.isCurrent} />
                    </div>
                  </div>

                  {/* Translucent Stadium Card */}
                  <article className="lb-timeline-card">
                    {/* Top Glow Accent Bar */}
                    <div className="lb-card-glow-edge" aria-hidden="true" />

                    {/* Card Header */}
                    <div className="lb-card-top">
                      <div className="lb-card-meta">
                        {event.seasonLabel && (
                          <span className="lb-card-season-badge font-mono">
                            {event.seasonLabel}
                          </span>
                        )}
                        <div className="lb-card-period font-mono">
                          <Calendar size={13} className="lb-card-icon" />
                          <span>{event.period}</span>
                        </div>
                      </div>
                      {event.badge && (
                        <span className={`lb-card-badge font-mono ${event.isCurrent ? 'lb-card-badge--current' : ''}`}>
                          {event.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="lb-card-title">{event.title}</h2>
                    
                    <div className="lb-card-inst font-mono">
                      <MapPin size={13} className="lb-card-icon" />
                      <span>{event.institutionOrEvent}</span>
                    </div>

                    <p className="lb-card-summary">{event.summary}</p>

                    {/* Media Slot — rendered only when an actual image URL exists */}
                    {event.imageUrl && (
                      <div className="lb-timeline-photo-container">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="lb-timeline-photo-img" 
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Key Highlights / Achievements */}
                    {event.achievements && event.achievements.length > 0 && (
                      <div className="lb-card-achievements">
                        <div className="lb-achievements-label font-mono">
                          <Trophy size={13} className="lb-trophy-icon" />
                          <span>KEY HIGHLIGHTS:</span>
                        </div>
                        <ul className="lb-achievements-list">
                          {event.achievements.map((ach, achIdx) => (
                            <li key={achIdx} className="lb-achievement-item">
                              <span className="lb-item-dot" aria-hidden="true" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── 3. FINAL CLOSING CTA ── */}
        <footer className={`lb-timeline-footer-wrap ${ctaVisible ? 'lb-timeline-footer--visible' : ''}`}>
          <div className="lb-timeline-footer-card">
            <div className="lb-footer-badge font-mono">
              <Sparkles size={13} />
              <span>NEXT FIXTURE</span>
            </div>
            <div className="lb-timeline-footer-text">
              <h3 className="lb-timeline-footer-title">Ready For The Next Fixture</h3>
              <p className="lb-timeline-footer-desc">
                Still building, still learning, and always looking for the next thing worth working on.
              </p>
            </div>
            <button 
              type="button" 
              className="lb-timeline-cta-btn"
              onClick={handleConnectClick}
            >
              <span>Connect With Me</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </footer>

      </div>

    </div>
  );
};
