import React, { useRef, useState, useCallback } from 'react';
import { Card3DProps } from './types';

/**
 * 🃏 Card3D
 * 60 FPS Hardware-accelerated 3D tilt perspective & dynamic spotlight glare card.
 */
export const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  (
    {
      tilt = true,
      maxTilt = 7,
      glare = true,
      glareColor = 'rgba(255, 255, 255, 0.12)',
      perspective = 1000,
      resetSpeed = 300,
      className = '',
      style = {},
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLDivElement | null>) || localRef;

    const [isHovered, setIsHovered] = useState(false);
    const rafIdRef = useRef<number | null>(null);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          el.style.setProperty('--mouse-x', `${x}px`);
          el.style.setProperty('--mouse-y', `${y}px`);

          if (tilt) {
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            el.style.transition = 'transform 0.05s ease-out';
            el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
          }
        });
      },
      [tilt, maxTilt, perspective, ref]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      const el = ref.current;
      if (!el) return;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (tilt) {
        el.style.transition = `transform ${resetSpeed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
        el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
      }
    }, [tilt, resetSpeed, perspective, ref]);

    return (
      <div
        ref={ref}
        className={`card-3d-wrapper ${className}`}
        style={
          {
            ...style,
            '--glare-color': glareColor,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {glare && (
          <div
            className="card-3d-glare"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-hidden="true"
          />
        )}
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
      </div>
    );
  }
);

Card3D.displayName = 'Card3D';
export default Card3D;
