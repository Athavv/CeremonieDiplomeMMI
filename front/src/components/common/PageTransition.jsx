import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef(null);
  const blocksRef = useRef([]);
  const logoRef = useRef(null);

  const [displayLocation, setDisplayLocation] = useState(location);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const isAnimating = useRef(false);

  const cols = 15;
  const rows = 15;
  const totalBlocks = cols * rows;

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      if (transitionRef.current) {
        gsap.set(transitionRef.current, { pointerEvents: 'none' });
      }
      setDisplayLocation(location);
      setCurrentPath(location.pathname);
      return;
    }

    if (location.pathname !== currentPath) {
      if (isAnimating.current) {
        setCurrentPath(location.pathname);
        setDisplayLocation(location);
        return;
      }
      isAnimating.current = true;

      const coverTimeline = gsap.timeline({
        onComplete: () => {
          setCurrentPath(location.pathname);
          setDisplayLocation(location);

          const revealTimeline = gsap.timeline({
            onComplete: () => { isAnimating.current = false; }
          });

          revealTimeline.to(blocksRef.current, {
            scale: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            stagger: {
              amount: 0.8,
              grid: [rows, cols],
              from: 'edges'
            }
          }, 0);

          revealTimeline.to(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.4 }, 0.6);
          revealTimeline.set(transitionRef.current, { pointerEvents: 'none' });
        }
      });

      coverTimeline.set(transitionRef.current, { pointerEvents: 'auto' });
      coverTimeline.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.3 }, 0);

      coverTimeline.to(blocksRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.inOut',
        stagger: {
          amount: 0.8,
          grid: [rows, cols],
          from: 'center'
        }
      }, 0);
    }
  }, [location.pathname, currentPath, location]);

  useLayoutEffect(() => {
    return () => {
      gsap.killTweensOf(blocksRef.current);
      gsap.killTweensOf(logoRef.current);
      gsap.killTweensOf(transitionRef.current);
    };
  }, []);

  const renderChildren = () => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        location: displayLocation,
        key: displayLocation.pathname
      });
    }
    return children;
  };

  return (
    <>
      <div
        ref={transitionRef}
        className="fixed inset-0 z-[60] pointer-events-none flex flex-wrap"
      >
        {Array.from({ length: totalBlocks }).map((_, blockIndex) => (
          <div
            key={blockIndex}
            ref={(element) => (blocksRef.current[blockIndex] = element)}
            className="bg-[#071341] origin-center will-change-transform"
            style={{
              width: `${100/cols}%`,
              height: `${100/rows}%`,
              transform: 'scale(0)'
            }}
          ></div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[70]">
          <img
            ref={logoRef}
            src="/logouge.png"
            alt="Logo Gustave Eiffel"
            className="w-16 h-16 drop-shadow-xl opacity-0"
          />
        </div>
      </div>

      <div className="w-full min-h-screen">
        {renderChildren()}
      </div>
    </>
  );
};

export default PageTransition;
