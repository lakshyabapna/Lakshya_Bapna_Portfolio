import React from 'react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

/* Inline SVG icon library — all icons are self-contained, no external deps */
export const TechIcon: React.FC<TechIconProps> = ({ name, size = 28, className = '' }) => {
  const p = { width: size, height: size, className };

  switch (name) {

    // ── Python ──────────────────────────────────────────────
    case 'python':
      return (
        <svg viewBox="0 0 128 128" {...p}>
          <path fill="#3776AB" d="M63.7 3.1c-16.1 0-25.2 7-25.2 20.7v15.2h25.6v5.2H23.5C9.4 44.2 0 54.4 0 71.9c0 17.1 8.3 27.6 22.8 27.6h13.2v-12.8c0-11.4 9.6-20.9 21.2-20.9h25.4c11.9 0 21.2-9.6 21.2-21.2V23.8C103.8 9.9 94.4 3.1 63.7 3.1zm-13.8 9.8a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8z"/>
          <path fill="#FFD43B" d="M64.3 124.9c16.1 0 25.2-7 25.2-20.7V89H63.9v-5.2h40.6c14.1 0 23.5-10.2 23.5-27.7 0-17.1-8.3-27.6-22.8-27.6H92v12.8c0 11.4-9.6 20.9-21.2 20.9H45.4c-11.9 0-21.2 9.6-21.2 21.2v20.8c0 13.9 9.4 20.7 40.1 20.7zm13.8-9.8a4.9 4.9 0 1 1 0-9.8 4.9 4.9 0 0 1 0 9.8z"/>
        </svg>
      );

    // ── GenAI / LLMs ────────────────────────────────────────
    case 'genai':
    case 'llm':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <circle cx="12" cy="12" r="3.5" fill="#059669"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="7" stroke="#059669" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.4"/>
        </svg>
      );

    // ── RAG ─────────────────────────────────────────────────
    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#059669" strokeWidth="1.6" fill="#ECFDF5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#059669" strokeWidth="1.6" fill="none"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#6B7280" strokeWidth="1.6" fill="none"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#6B7280" strokeWidth="1.6" fill="none"/>
          <path d="M10 6.5h4M17.5 10v4M10 17.5h4M6.5 10v4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );

    // ── LangGraph ───────────────────────────────────────────
    case 'langgraph':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <circle cx="4" cy="12" r="2.5" fill="#059669"/>
          <circle cx="12" cy="4" r="2.5" fill="#059669"/>
          <circle cx="20" cy="12" r="2.5" fill="#059669"/>
          <circle cx="12" cy="20" r="2.5" fill="#10B981"/>
          <path d="M6.5 12H9.5M14.5 12H17.5M12 6.5V9.5M12 14.5V17.5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M6.5 9.5L9.5 6.5M14.5 6.5L17.5 9.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      );

    // ── Agentic Workflows ───────────────────────────────────
    case 'agentic':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M3 7h4l2 4h6l2-4h4" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12h18" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 1.5"/>
          <path d="M3 17h4l2-4h6l2 4h4" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ── LLM Evaluation ──────────────────────────────────────
    case 'eval':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M9 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="#059669" strokeWidth="1.6"/>
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );

    // ── JavaScript ──────────────────────────────────────────
    case 'javascript':
      return (
        <svg viewBox="0 0 630 630" {...p}>
          <rect width="630" height="630" fill="#F7DF1E" rx="32"/>
          <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.4-38.1-25.4-17.34 0-28.3 11-28.3 25.4 0 17.8 11 24.9 36.4 36l14.8 6.3c50.3 21.6 78.7 43.6 78.7 93 0 53.3-41.9 84.2-98.1 84.2-54.6 0-90.1-28.3-106.2-66zm-209.98 5.5c8.9 15.2 16.5 28 35.1 28 18.2 0 29.6-7.2 29.6-35.1v-223.7h59.2v224.5c0 59.2-34.7 86.3-86.7 86.3-46.95 0-74.02-24.5-88-54.6z"/>
        </svg>
      );

    // ── TypeScript ──────────────────────────────────────────
    case 'typescript':
      return (
        <svg viewBox="0 0 400 400" {...p}>
          <rect width="400" height="400" fill="#3178C6" rx="24"/>
          <path fill="#fff" d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5-.2-.2-32.1-.3-70.8-.3l-70.5.1v16.4zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8.1.6-17.3 12.3-27.8 18.9-.4.2-1.9-1.4-3.6-3.8-5.1-7.4-10.5-10.6-18.7-11.1-12-.8-19.8 5.5-19.7 16 0 3.1.5 5 1.8 7.6 2.7 5.6 7.7 9 22.1 15.9 27.3 11.7 39 19.4 46.4 30.4 8.3 12.3 10.1 31.9 4.3 46.5-6.4 15.9-22.3 26.7-44.6 30.3-6.9 1.2-23.3 1-30.5-.3-16-3-31.3-11-40.7-21.3-3.7-4-10.8-14.8-10.4-15.6.2-.2 1.8-1.2 3.6-2.2l14.5-8.4 11.3-6.6 2.4 3.4c3.3 5.1 10.5 12 14.9 14.3 12.5 6.6 29.7 5.7 38.2-1.9 3.7-3.2 5.3-6.5 5.3-11.2 0-4.3-.7-6.2-3.6-9.5-3.7-4.2-11.3-7.8-32.7-17-24.6-10.5-35.1-17-44.7-27.4-5.6-6.2-10.9-16.1-13.1-24.3-1.8-6.8-2.2-23.9-.7-30.8 4.9-22.9 22.2-39 46.9-44 8-1.7 26.8-1.3 34.7.5z"/>
        </svg>
      );

    // ── SQL ─────────────────────────────────────────────────
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#0EA5E9" strokeWidth="1.6" fill="#EFF6FF"/>
          <path d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#0EA5E9" strokeWidth="1.6"/>
          <path d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#0EA5E9" strokeWidth="1.6"/>
        </svg>
      );

    // ── HTML / CSS ──────────────────────────────────────────
    case 'htmlcss':
      return (
        <svg viewBox="0 0 48 48" {...p}>
          <path fill="#E44D26" d="M6 42L3 6h42l-3 36-18 5z"/>
          <path fill="#F16529" d="M24 41.5l14.6-4L41 9.5H24z"/>
          <path fill="#EBEBEB" d="M24 25h-7.2l-.5-5.5H24v-5H11.4l1.3 14.5H24zm0 8.5l-.1.1L18 32.1l-.4-4H12.5l.7 8 10.8 3z"/>
          <path fill="#fff" d="M24 25v5h6.7l-.6 6.4-6.1 1.6V43l10.8-3 .1-.8 1.2-13.2.2-2H24zm0-14.5v5h13.2l.1-.5.3-4.5H24z"/>
        </svg>
      );

    // ── FastAPI ─────────────────────────────────────────────
    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <circle cx="12" cy="12" r="10" fill="#009688" opacity="0.1"/>
          <circle cx="12" cy="12" r="10" stroke="#009688" strokeWidth="1.6"/>
          <path d="M13 2.05C11 4 9.5 7 9.5 12h5M13 21.95C11 20 9.5 17 9.5 12h5" stroke="#009688" strokeWidth="1.2" fill="none"/>
          <path d="M12 7l-1.5 5H12l-1.5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ── Node.js ─────────────────────────────────────────────
    case 'nodejs':
      return (
        <svg viewBox="0 0 256 289" {...p}>
          <path fill="#539E43" d="M128 288.2c-3.9 0-7.4-1-10.6-2.9L93.2 270c-4.3-2.4-2.2-3.2-0.8-3.7 5.3-1.8 6.3-2.2 11.9-5.4.6-.4 1.4-.2 2 .2l20.2 12c.7.4 1.8.4 2.5 0l78.7-45.5c.8-.5 1.3-1.4 1.3-2.3V63.7c0-1-.5-1.9-1.3-2.4L129 15.9c-.8-.5-1.8-.5-2.5 0L47.7 61.3c-.8.5-1.4 1.5-1.4 2.4v91c0 1 .5 1.9 1.4 2.3l21.6 12.5c11.7 5.9 18.9-1 18.9-8v-89.8c0-1.3 1-2.3 2.3-2.3h10c1.2 0 2.3 1 2.3 2.3v89.8c0 15.7-8.5 24.7-23.4 24.7-4.6 0-8.1 0-18.2-4.9l-20.7-11.9c-6.6-3.8-10.6-10.8-10.6-18.4V63.7c0-7.5 4-14.6 10.6-18.3L117.4 0c6.3-3.7 14.8-3.7 21.1 0l78.8 45.5c6.5 3.8 10.6 10.8 10.6 18.3v91c0 7.6-4.1 14.5-10.6 18.3l-78.8 45.5c-3.2 1.9-6.7 2.6-10.5 2.6z"/>
          <path fill="#539E43" d="M152 195c-34.1 0-41.3-15.7-41.3-28.8 0-1.3 1-2.3 2.3-2.3h10.2c1.1 0 2.1.8 2.3 2 1.6 10.6 6.2 15.9 26.6 15.9 16.4 0 23.3-3.7 23.3-12.4 0-5-2-8.7-27.3-11.2-21.2-2.1-34.3-6.8-34.3-23.7 0-15.7 13.2-25 35.3-25 24.8 0 37.1 8.6 38.7 27.1.1.7-.2 1.3-.6 1.8-.4.5-1 .7-1.6.7h-10.3c-1.1 0-2-.7-2.3-1.8-2.4-10.7-8.3-14.1-24-14.1-17.7 0-19.7 6.1-19.7 10.8 0 5.5 2.4 7.2 26.4 10.3 23.8 3 35.1 7.5 35.1 24.4 0 17-14.2 26.3-38.8 26.3z"/>
        </svg>
      );

    // ── Express.js ──────────────────────────────────────────
    case 'express':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <text x="2" y="16" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" fontSize="10" fill="#000" letterSpacing="-0.5">ex</text>
          <text x="9" y="16" fontFamily="'Space Grotesk', sans-serif" fontWeight="400" fontSize="10" fill="#000">press</text>
          <rect x="1" y="18" width="22" height="1.2" fill="#000" rx="0.6"/>
        </svg>
      );

    // ── REST APIs ───────────────────────────────────────────
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M4 6h16M4 10h10M4 14h12M4 18h8" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="20" cy="14" r="3" fill="#6366F1" opacity="0.2" stroke="#6366F1" strokeWidth="1.4"/>
          <path d="M19 14l1 1 1.5-1.5" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ── Next.js ─────────────────────────────────────────────
    case 'nextjs':
      return (
        <svg viewBox="0 0 180 180" {...p}>
          <circle cx="90" cy="90" r="90" fill="#000"/>
          <path fill="url(#nextgrad)" d="M149.5 161.6L69.3 60H60v59.9h7.1V69.5l74.5 95.2a89.9 89.9 0 007.9-3.1z"/>
          <rect fill="#fff" x="112.1" y="60" width="7.1" height="60"/>
          <defs>
            <linearGradient id="nextgrad" x1="109" y1="116.5" x2="144.7" y2="160.1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff"/>
              <stop offset="1" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );

    // ── React ───────────────────────────────────────────────
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" {...p}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );

    // ── Tailwind CSS ────────────────────────────────────────
    case 'tailwind':
      return (
        <svg viewBox="0 0 248 31" {...p}>
          <path fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#06B6D4"/>
        </svg>
      );

    // ── Vite ────────────────────────────────────────────────
    case 'vite':
      return (
        <svg viewBox="0 0 410 404" {...p}>
          <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5246C6.38087 52.1895 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8924 208.776 77.6824L389.272 44.8586C397.62 43.3866 403.836 52.2406 399.641 59.5246Z" fill="url(#vitegr1)"/>
          <path d="M292.965 1.5006L156.801 28.6aris C154.563 29.0802 152.906 31.0802 152.906 33.3602V334.825C152.906 337.845 155.453 340.095 158.43 339.675L292.965 316.075C295.768 315.655 298 313.282 298 310.465V6.3402C298 3.6602 295.768 0.9802 292.965 1.5006Z" fill="url(#vitegr2)"/>
          <defs>
            <linearGradient id="vitegr1" x1="6.00017" y1="32.9947" x2="235" y2="344.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF"/>
              <stop offset="1" stopColor="#BD34FE"/>
            </linearGradient>
            <linearGradient id="vitegr2" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF"/>
              <stop offset="1" stopColor="#BD34FE"/>
            </linearGradient>
          </defs>
        </svg>
      );

    // ── PostgreSQL ──────────────────────────────────────────
    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <ellipse cx="12" cy="7" rx="8" ry="4" fill="#336791" opacity="0.15" stroke="#336791" strokeWidth="1.6"/>
          <path d="M4 7v10c0 2.2 3.58 4 8 4s8-1.8 8-4V7" stroke="#336791" strokeWidth="1.6"/>
          <path d="M4 12c0 2.2 3.58 4 8 4s8-1.8 8-4" stroke="#336791" strokeWidth="1.2" strokeDasharray="2.5 1.5"/>
          <path d="M12 3v4M9.5 5l2.5 2 2.5-2" stroke="#336791" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ── MongoDB ─────────────────────────────────────────────
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M12 3C8 3 6 6.5 6 10c0 4 3 7 6 9 3-2 6-5 6-9 0-3.5-2-7-6-7z" fill="#4DB33D" opacity="0.15" stroke="#4DB33D" strokeWidth="1.6"/>
          <line x1="12" y1="21" x2="12" y2="11" stroke="#4DB33D" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );

    // ── BM25 ────────────────────────────────────────────────
    case 'bm25':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <rect x="3" y="14" width="3" height="6" rx="1" fill="#059669"/>
          <rect x="8" y="10" width="3" height="10" rx="1" fill="#059669" opacity="0.7"/>
          <rect x="13" y="6" width="3" height="14" rx="1" fill="#059669" opacity="0.8"/>
          <rect x="18" y="3" width="3" height="17" rx="1" fill="#059669"/>
          <path d="M3 4l3 3 5-5 5 4 5-3" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ── Pandas / NumPy ──────────────────────────────────────
    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <rect x="4" y="3" width="3" height="18" rx="1.5" fill="#150458"/>
          <rect x="10.5" y="3" width="3" height="18" rx="1.5" fill="#150458"/>
          <rect x="17" y="3" width="3" height="18" rx="1.5" fill="#FFCA00"/>
          <path d="M4 8h6M4 12h6M4 16h6" stroke="#E70488" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );

    // ── Tableau ─────────────────────────────────────────────
    case 'tableau':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <rect x="11" y="3" width="2" height="18" rx="1" fill="#E97627"/>
          <rect x="3" y="11" width="18" height="2" rx="1" fill="#E97627"/>
          <rect x="7" y="7" width="2" height="10" rx="1" fill="#E97627" opacity="0.6"/>
          <rect x="15" y="7" width="2" height="10" rx="1" fill="#E97627" opacity="0.6"/>
          <rect x="7" y="7" width="10" height="2" rx="1" fill="#E97627" opacity="0.6"/>
          <rect x="7" y="15" width="10" height="2" rx="1" fill="#E97627" opacity="0.6"/>
        </svg>
      );

    // ── PyTorch ─────────────────────────────────────────────
    case 'pytorch':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M12 2.5C7.3 2.5 3.5 6.3 3.5 11s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5C20.5 8 19 4.5 16 3" stroke="#EE4C2C" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="16" cy="3" r="1.5" fill="#EE4C2C"/>
          <circle cx="12" cy="11" r="2.5" fill="#EE4C2C" opacity="0.2" stroke="#EE4C2C" strokeWidth="1.4"/>
        </svg>
      );

    // ── Scikit-learn ────────────────────────────────────────
    case 'sklearn':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <circle cx="12" cy="8" r="5" stroke="#F89939" strokeWidth="1.6" fill="#FEF3C7"/>
          <path d="M7 8c0 2.8 2.2 5 5 5s5-2.2 5-5" stroke="#3A9AD9" strokeWidth="1.4"/>
          <path d="M5 16h14M8 19h8" stroke="#F89939" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      );

    // ── Vercel ──────────────────────────────────────────────
    case 'vercel':
      return (
        <svg viewBox="0 0 512 512" {...p}>
          <path d="m256 48 240 416H16z" fill="#000"/>
        </svg>
      );

    // ── Render ──────────────────────────────────────────────
    case 'render':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <path d="M4 4h9a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H4V4Z" stroke="#46E3B7" strokeWidth="2" fill="none"/>
          <path d="M4 14h6l5 6H9l-5-6Z" stroke="#46E3B7" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        </svg>
      );

    // ── Netlify ─────────────────────────────────────────────
    case 'netlify':
      return (
        <svg viewBox="0 0 24 24" fill="#00C7B7" {...p}>
          <path d="m6.48 4.35 4.5 4.52-2.12 2.12-4.5-4.52 2.12-2.12zm11.04 0 2.12 2.12-4.5 4.52-2.12-2.12 4.5-4.52zM12 8.87l3.18 3.19L12 15.24l-3.18-3.18L12 8.87zM4.36 17.52l4.5-4.52 2.12 2.12-4.5 4.52-2.12-2.12zm13.16 0-2.12-2.12 4.5-4.52 2.12 2.12-4.5 4.52z"/>
        </svg>
      );

    // ── Streamlit ───────────────────────────────────────────
    case 'streamlit':
      return (
        <svg viewBox="0 0 24 24" fill="#FF4B4B" {...p}>
          <path d="M16.53 3.53 12 8.06 7.47 3.53a.75.75 0 0 0-1.06 1.06L10.94 9.12l-4.53 4.53a.75.75 0 0 0 1.06 1.06L12 10.18l4.53 4.53a.75.75 0 0 0 1.06-1.06l-4.53-4.53 4.53-4.53a.75.75 0 0 0-1.06-1.06ZM3.75 20.25h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z"/>
        </svg>
      );

    // ── Git ─────────────────────────────────────────────────
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="#F05032" {...p}>
          <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.34l2.658 2.66a1.838 1.838 0 1 1-1.1 1.059l-2.48-2.48v6.511a1.838 1.838 0 1 1-1.508-.036V9.322a1.838 1.838 0 0 1-.997-2.416L7.633 4.229.454 11.406a1.55 1.55 0 0 0 0 2.189l10.478 10.478a1.55 1.55 0 0 0 2.189 0l10.425-10.426a1.55 1.55 0 0 0 0-2.189"/>
        </svg>
      );

    // ── GitHub ──────────────────────────────────────────────
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );

    // ── OpenCV ──────────────────────────────────────────────
    case 'opencv':
      return (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
          <circle cx="8" cy="12" r="4" stroke="#E84D8A" strokeWidth="1.8" fill="none"/>
          <circle cx="16" cy="12" r="4" stroke="#5C88DA" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="7" r="4" stroke="#3BB272" strokeWidth="1.8" fill="none"/>
          <circle cx="8" cy="12" r="1.5" fill="#E84D8A"/>
          <circle cx="16" cy="12" r="1.5" fill="#5C88DA"/>
          <circle cx="12" cy="7" r="1.5" fill="#3BB272"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
          <circle cx="12" cy="12" r="9" strokeOpacity="0.4"/>
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round"/>
        </svg>
      );
  }
};
