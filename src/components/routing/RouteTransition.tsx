/**
 * Route Transition Component
 * Provides fade-in animation for route changes
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const onTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      setTransitionStage('fadeIn');
    }
  };

  return (
    <div
      className={`route-transition route-transition-${transitionStage}`}
      onAnimationEnd={onTransitionEnd}
      style={{
        animation: transitionStage === 'fadeIn' ? 'fadeIn 0.2s ease-in' : 'fadeOut 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// Add CSS animations via style tag (or add to global CSS)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  .route-transition {
    width: 100%;
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('route-transition-styles')) {
  style.id = 'route-transition-styles';
  document.head.appendChild(style);
}
