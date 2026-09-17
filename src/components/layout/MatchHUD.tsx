import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ROUTES } from '../../data/navigation';
import './MatchHUD.css';

interface MatchHUDProps {
  activeRoute: string;
  onNavigate: (routeId: string) => void;
  isHeroActive?: boolean;
}

export const MatchHUD: React.FC<MatchHUDProps> = ({
  activeRoute,
  onNavigate,
  isHeroActive = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, routeId: string) => {
    e.preventDefault();
    onNavigate(routeId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hudClass = [
    'lb-hud',
    isHeroActive ? 'lb-hud--hero' : '',
    !isHeroActive && isScrolled ? 'lb-hud--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={hudClass}>
      <div className="lb-hud__container">
        {/* Refined Minimalist Monogram & Identity */}
        <a
          href="#home"
          className="lb-hud__brand"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="Lakshya Bapna Home"
        >
          <div className="lb-hud__monogram-wrap" aria-hidden="true">
            <svg
              className="lb-hud__monogram-svg"
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6V26H17"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H20.5C22.433 8 24 9.567 24 11.5C24 13.433 22.433 15 20.5 15H14M14 15H21.5C23.433 15 25 16.567 25 18.5C25 20.433 23.433 22 21.5 22H14V8Z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="21" cy="5.5" r="2.2" fill="#10B981" />
            </svg>
          </div>
          <div className="lb-hud__brand-text">
            <span className="lb-hud__name">LAKSHYA BAPNA</span>
            <span className="lb-hud__role">AI / FULL-STACK</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="lb-hud__nav" aria-label="Main Navigation">
          {NAV_ROUTES.map((route) => {
            const isActive = activeRoute === route.id;
            return (
              <a
                key={route.id}
                href={route.hash}
                onClick={(e) => handleLinkClick(e, route.id)}
                className={`lb-hud__nav-link ${isActive ? 'lb-hud__nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="lb-hud__nav-label">{route.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="lb-hud__actions">
          {/* Live status badge matching reference */}
          <div className="lb-hud__live-badge" title="Open to Opportunities">
            <span className="lb-hud__live-dot" />
            <span className="lb-hud__live-text">Available for Opportunities</span>
          </div>

          <a
            href="https://github.com/lakshyabapna"
            target="_blank"
            rel="noopener noreferrer"
            className="lb-hud__btn-action"
            aria-label="GitHub Profile"
          >
            GitHub
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lb-hud__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lb-hud__mobile-drawer">
          <nav className="lb-hud__mobile-nav" aria-label="Mobile Navigation">
            {NAV_ROUTES.map((route) => {
              const isActive = activeRoute === route.id;
              return (
                <a
                  key={route.id}
                  href={route.hash}
                  onClick={(e) => handleLinkClick(e, route.id)}
                  className={`lb-hud__mobile-link ${isActive ? 'lb-hud__mobile-link--active' : ''}`}
                >
                  <span className="lb-hud__mobile-label">{route.label.toUpperCase()}</span>
                </a>
              );
            })}
            <div className="lb-hud__mobile-footer">
              <a
                href="https://github.com/lakshyabapna"
                target="_blank"
                rel="noopener noreferrer"
                className="lb-hud__mobile-ext"
              >
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/lakshya-bapna-73bb50323/"
                target="_blank"
                rel="noopener noreferrer"
                className="lb-hud__mobile-ext"
              >
                LinkedIn Profile
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
