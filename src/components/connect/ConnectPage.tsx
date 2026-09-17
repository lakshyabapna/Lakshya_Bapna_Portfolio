import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import playerPhoto from '../../assets/ThePlayer/Theplayercard.jpeg';
import { 
  Mail, 
  FileText, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import './ConnectPage.css';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export const ConnectPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.links.email);
    setCopiedEmail(true);
    setToastMessage('Email address copied to clipboard');
    setTimeout(() => {
      setCopiedEmail(false);
      setToastMessage(null);
    }, 3500);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!PROFILE_DATA.links.resumeUrl) {
      e.preventDefault();
      setToastMessage('Resume PDF attachment will be linked once updated.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="lb-connect-root" id="connect">
      {/* ── 1. FULL-PAGE DAYLIGHT STADIUM BACKGROUND ── */}
      <div className="lb-connect-bg-layer" aria-hidden="true">
        <picture className="lb-connect-bg-picture">
          <source type="image/webp" srcSet="/assets/hero/stadium_daylight_main.webp" />
          <img
            src="/assets/hero/stadium_daylight_main_hd.png"
            alt="Santiago Bernabéu Stadium Atmosphere in Daylight"
            className="lb-connect-bg-img"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* ── 2. ATMOSPHERIC OVERLAYS ── */}
      <div className="lb-connect-atmosphere" aria-hidden="true">
        {/* Top readability gradient for navbar HUD */}
        <div className="lb-connect-atm__top" />
        {/* Subtle content readability scrim */}
        <div className="lb-connect-atm__scrim" />
        {/* Bottom pitch ground haze */}
        <div className="lb-connect-atm__bottom" />
      </div>

      {/* ── 3. AMBIENT EDITORIAL PHRASES ── */}
      <div className="lb-connect-ambient-phrases" aria-hidden="true">
        <span className="lb-ambient-phrase lb-ambient-phrase--tr">
          Good<br />People<br />Build<br />Great<br />Things
        </span>
        <span className="lb-ambient-phrase lb-ambient-phrase--bl">
          Same<br />Game<br />Different<br />Destinations
        </span>
        <span className="lb-ambient-phrase lb-ambient-phrase--br">
          Ideas<br />to<br />Impact
        </span>
      </div>

      {/* ── 4. CONTENT WRAPPER ── */}
      <div className="lb-connect-content-wrap">
        {/* Editorial Header */}
        <header className="lb-connect-header lb-connect-anim-fade-up">
          <div className="lb-connect-eyebrow font-mono">
            <span className="lb-connect-eyebrow-dot" />
            <span>FINAL WHISTLE</span>
          </div>
          <h1 className="lb-connect-title">Let's Connect</h1>
          <p className="lb-connect-subtitle">
            Thank you for exploring my work. Whether you have an opportunity, a project idea, or just want to talk software and AI, I'd love to connect.
          </p>
        </header>

        {/* Main Translucent Stadium Contact Panel */}
        <div className="lb-connect-main-card lb-connect-anim-fade-up lb-connect-anim-delay-1">
          {/* Subtle Top Glow Edge */}
          <div className="lb-connect-card-glow" aria-hidden="true" />

          {/* Two-Column Layout: Photo (Left) + Dossier & Channels (Right) */}
          <div className="lb-connect-card-grid">
            
            {/* Left: Personal Profile Portrait */}
            <div className="lb-connect-photo-col lb-connect-anim-fade-up lb-connect-anim-delay-2">
              <div className="lb-connect-photo-frame">
                <img 
                  src={playerPhoto} 
                  alt="Lakshya Bapna" 
                  className="lb-connect-photo-img"
                  loading="eager"
                  decoding="async"
                />
                <div className="lb-connect-photo-inner-glow" aria-hidden="true" />
              </div>
            </div>

            {/* Right: Personal Identity, Quote, and 2x2 Channels Grid */}
            <div className="lb-connect-details-col lb-connect-anim-fade-up lb-connect-anim-delay-2">
              
              {/* Profile Header */}
              <div className="lb-connect-identity-bar">
                <div className="lb-connect-identity">
                  <div className="lb-connect-crest" aria-hidden="true">
                    <svg
                      className="lb-connect-crest-svg"
                      width="26"
                      height="26"
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
                  <div className="lb-connect-titles">
                    <h2 className="lb-connect-name">LAKSHYA BAPNA</h2>
                    <span className="lb-connect-role font-mono">AI / FULL-STACK DEVELOPER</span>
                  </div>
                </div>

                <div className="lb-connect-status-wrap">
                  <div className="lb-connect-status-pill font-mono">
                    <span className="lb-connect-status-dot" />
                    <span>OPEN TO OPPORTUNITIES</span>
                  </div>
                  <span className="lb-connect-status-sub font-mono">
                    IDEAS / PROJECTS / COLLABORATIONS
                  </span>
                </div>
              </div>

              {/* Personal Statement with Emerald Accent */}
              <blockquote className="lb-connect-statement">
                &ldquo;Passionate about taking ideas from initial concepts to live, working software products. Let's build something impactful together.&rdquo;
              </blockquote>

              {/* Action Channels Grid (2x2 Desktop, 1 Col Mobile) */}
              <div className="lb-connect-channels">
                
                {/* 1. LinkedIn */}
                <a 
                  href={PROFILE_DATA.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="lb-channel-card lb-channel-card--linkedin"
                  aria-label="Connect with Lakshya Bapna on LinkedIn"
                >
                  <div className="lb-channel-icon" aria-hidden="true">
                    <LinkedInIcon />
                  </div>
                  <div className="lb-channel-info">
                    <div className="lb-channel-header">
                      <span className="lb-channel-name">LinkedIn</span>
                      <ArrowUpRight size={17} className="lb-channel-arrow" aria-hidden="true" />
                    </div>
                    <span className="lb-channel-detail">Professional Network &amp; Messages</span>
                  </div>
                </a>

                {/* 2. GitHub */}
                <a 
                  href={PROFILE_DATA.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="lb-channel-card lb-channel-card--github"
                  aria-label="View Lakshya Bapna's GitHub repositories"
                >
                  <div className="lb-channel-icon" aria-hidden="true">
                    <GitHubIcon />
                  </div>
                  <div className="lb-channel-info">
                    <div className="lb-channel-header">
                      <span className="lb-channel-name">GitHub</span>
                      <ArrowUpRight size={17} className="lb-channel-arrow" aria-hidden="true" />
                    </div>
                    <span className="lb-channel-detail">Repositories &amp; Source Code</span>
                  </div>
                </a>

                {/* 3. Direct Email */}
                <a 
                  href={`mailto:${PROFILE_DATA.links.email}`}
                  onClick={handleCopyEmail}
                  className="lb-channel-card lb-channel-card--email"
                  aria-label={`Direct Email: ${PROFILE_DATA.links.email}. Click to open or copy.`}
                >
                  <div className="lb-channel-icon" aria-hidden="true">
                    <Mail size={22} />
                  </div>
                  <div className="lb-channel-info">
                    <div className="lb-channel-header">
                      <span className="lb-channel-name">Direct Email</span>
                      <ArrowUpRight size={17} className="lb-channel-arrow" aria-hidden="true" />
                    </div>
                    <span className="lb-channel-detail font-mono">
                      {copiedEmail ? '✓ Copied to clipboard!' : PROFILE_DATA.links.email}
                    </span>
                  </div>
                </a>

                {/* 4. Resume */}
                <a 
                  href={PROFILE_DATA.links.resumeUrl || '#'} 
                  onClick={handleResumeClick}
                  target={PROFILE_DATA.links.resumeUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="lb-channel-card lb-channel-card--resume"
                  aria-label="View technical resume and credentials"
                >
                  <div className="lb-channel-icon" aria-hidden="true">
                    <FileText size={22} />
                  </div>
                  <div className="lb-channel-info">
                    <div className="lb-channel-header">
                      <span className="lb-channel-name">Resume</span>
                      <ArrowUpRight size={17} className="lb-channel-arrow" aria-hidden="true" />
                    </div>
                    <span className="lb-channel-detail">Technical Resume &amp; Credentials</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          {/* Footer Telemetry */}
          <footer className="lb-connect-footer font-mono">
            <div className="lb-footer-status">
              <span className="lb-footer-dot" />
              <span>OPEN TO OPPORTUNITIES &amp; COLLABORATIONS</span>
            </div>
            <span className="lb-footer-copy">© {new Date().getFullYear()} LAKSHYA BAPNA</span>
          </footer>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="lb-connect-toast" role="status" aria-live="polite">
          <CheckCircle2 size={16} className="lb-toast-icon" />
          <span className="font-mono">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
