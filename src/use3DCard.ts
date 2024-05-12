import { useEffect, useRef } from 'react';
import { Use3DCardOptions } from './types';

/**
 * 🔮 use3DCard
 * Batch container hook that calculates 3D tilt & spotlight glare with viewport culling.
 */
export function use3DCard<T extends HTMLElement = HTMLDivElement>(
  options: Use3DCardOptions = {},
  deps: unknown[] = []
) {
  const containerRef = useRef<T>(null);
  const { tilt = true, maxTilt = 7, perspective = 1000, resetSpeed = 300, onHoverSound } = options;

  useEffect(() => {
    let rafId: number | null = null;
    let latestEvent: MouseEvent | null = null;
    let lastHoveredCard: Element | null = null;

    const timer = setTimeout(() => {
      const container = containerRef.current || document.body;

      const handlePointerOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const card = target.closest<HTMLElement>('[data-3d-card], .card-3d');
        if (card && card !== lastHoveredCard) {
          lastHoveredCard = card;
          onHoverSound?.();
        } else if (!card) {
          lastHoveredCard = null;
        }
      };

      const updateCards = () => {
        if (!latestEvent) return;
        const e = latestEvent;
        const cards = container.querySelectorAll<HTMLElement>('[data-3d-card], .card-3d');

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          // Viewport culling optimization
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          if (tilt) {
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
              const rotateX = ((y - centerY) / centerY) * -maxTilt;
              const rotateY = ((x - centerX) / centerX) * maxTilt;
              card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
            } else {
              card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
            }
          }
        });
        rafId = null;
      };

      const handleMouseMove = (e: MouseEvent) => {
        latestEvent = e;
        if (rafId === null) {
          rafId = requestAnimationFrame(updateCards);
        }
      };

      const handleMouseLeave = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        lastHoveredCard = null;
        const cards = container.querySelectorAll<HTMLElement>('[data-3d-card], .card-3d');
        cards.forEach((card) => {
          card.style.transition = `transform ${resetSpeed}ms ease-out`;
          card.style.transform = 'none';
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseover', handlePointerOver, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handlePointerOver);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 40);

    return () => clearTimeout(timer);
  }, [tilt, maxTilt, perspective, resetSpeed, onHoverSound, ...deps]);

  return containerRef;
}

export default use3DCard;
