import React from 'react';

export interface FootballIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Clean, geometric SVG football outline
 * Minimalist, modern broadcast styling — zero cartoon, zero emoji
 */
export const FootballIcon: React.FC<FootballIconProps> = ({
  size = 24,
  className = '',
  glow = false,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`lb-football-icon ${glow ? 'lb-football-icon--glow' : ''} ${className}`.trim()}
      {...rest}
    >
      {/* Outer Ball Sphere */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />

      {/* Central Pentagon */}
      <polygon
        points="50,30 68,43 61,64 39,64 32,43"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Seam Lines Radiating from Pentagon Vertices */}
      <line x1="50" y1="30" x2="50" y2="6" stroke="currentColor" strokeWidth="2.5" />
      <line x1="68" y1="43" x2="92" y2="35" stroke="currentColor" strokeWidth="2.5" />
      <line x1="61" y1="64" x2="79" y2="87" stroke="currentColor" strokeWidth="2.5" />
      <line x1="39" y1="64" x2="21" y2="87" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="43" x2="8" y2="35" stroke="currentColor" strokeWidth="2.5" />

      {/* Outer Perimeter Patch Seams */}
      <path d="M 50,6 C 68,10 82,20 92,35" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M 92,35 C 95,52 92,72 79,87" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M 79,87 C 62,95 38,95 21,87" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M 21,87 C 8,72 5,52 8,35" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M 8,35 C 18,20 32,10 50,6" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
    </svg>
  );
};
