import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FootballIcon } from '../ui/FootballIcon';
import './FootballTrajectory.css';

export interface FootballTrajectoryProps {
  onSettle?: () => void;
  className?: string;
}

export const FootballTrajectory: React.FC<FootballTrajectoryProps> = ({
  onSettle,
  className = ''
}) => {
  const [hasSettled, setHasSettled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, render the football directly in its settled position
  if (shouldReduceMotion) {
    return (
      <div className={`lb-football-trajectory-container ${className}`}>
        <div className="lb-football-settled lb-football-settled--static">
          <FootballIcon size={38} glow={true} className="lb-football-ball-icon" />
          <div className="lb-football-shadow" />
        </div>
      </div>
    );
  }

  const handleAnimationComplete = () => {
    setHasSettled(true);
    onSettle?.();
  };

  return (
    <div className={`lb-football-trajectory-container ${className}`} aria-hidden="true">
      {/* Curved Cinematic Light Trail */}
      <svg className="lb-trajectory-svg" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pitchTrailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" stopOpacity="0" />
            <stop offset="35%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#F8FAFC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <filter id="pitchTrailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic motion path with natural parabolic curve */}
        <motion.path
          d="M -40,120 Q 420,380 840,310 T 960,260"
          fill="none"
          stroke="url(#pitchTrailGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#pitchTrailGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1],
            opacity: [0, 0.75, 0] 
          }}
          transition={{
            duration: 1.7,
            delay: 0.6,
            times: [0, 0.65, 1],
            ease: [0.25, 1, 0.5, 1]
          }}
        />
      </svg>

      {/* Physics-Inspired Gliding Football with Depth Perspective */}
      <motion.div
        className="lb-football-flight-node"
        initial={{ 
          x: '-8vw', 
          y: '10vh', 
          scale: 0.45, 
          opacity: 0, 
          rotate: -45 
        }}
        animate={{ 
          x: ['-8vw', '38vw', '68vw'],
          y: ['10vh', '30vh', '24vh'],
          scale: [0.45, 0.95, 0.88],
          opacity: [0, 1, 1],
          rotate: [-45, 18, 32]
        }}
        transition={{
          duration: 1.6,
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.6, 1]
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.div 
          className="lb-football-interactive-wrap"
          animate={hasSettled ? {
            y: [0, -5, 0],
            rotate: [32, 34, 32]
          } : undefined}
          transition={hasSettled ? {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          } : undefined}
        >
          <FootballIcon size={38} glow={true} className="lb-football-ball-icon" />
          {/* Dynamic Ground Shadow tracking distance */}
          <motion.div 
            className="lb-football-shadow"
            animate={hasSettled ? {
              scale: [1, 0.88, 1],
              opacity: [0.65, 0.45, 0.65]
            } : undefined}
            transition={hasSettled ? {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : undefined}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
