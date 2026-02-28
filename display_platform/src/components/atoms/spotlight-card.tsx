'use client';

import { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(255, 255, 255, 0.25)' 
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`spotlight-card ${className}`}
    >
      {children}
      
      <style jsx>{`
        .spotlight-card {
          position: relative;
          border-radius: 1.5rem;
          border: 1px solid rgba(34, 34, 34, 0.1);
          background-color: inherit;
          padding: inherit;
          overflow: hidden;
          --mouse-x: 50%;
          --mouse-y: 50%;
          --spotlight-color: ${spotlightColor};
        }

        .spotlight-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y), 
            var(--spotlight-color), 
            transparent 80%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          border-radius: inherit;
        }

        .spotlight-card:hover::before,
        .spotlight-card:focus-within::before {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}