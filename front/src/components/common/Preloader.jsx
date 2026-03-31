import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const animationTimeline = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    });

    const logoHeight = 80;
    const iconWidth = logoHeight;

    gsap.set(logoWrapperRef.current, {
      width: iconWidth,
      height: logoHeight,
      rotation: 0
    });

    animationTimeline.to(logoWrapperRef.current, {
      rotation: 360,
      duration: 1.2,
      ease: 'power2.inOut'
    });

    const fullWidth = logoHeight * (1014 / 210);

    animationTimeline.to(logoWrapperRef.current, {
      width: fullWidth,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    animationTimeline.to({}, { duration: 0.1 });

    animationTimeline.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut'
    });

  }, [isComplete, onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full bg-[#071341] z-[9999] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={logoWrapperRef}
        className="relative overflow-hidden flex items-center origin-center"
      >
        <img
          ref={imageRef}
          src="/logogustaveeiffel.png"
          alt="Logo Gustave Eiffel"
          className="h-20 w-auto max-w-none origin-left"
          style={{ objectPosition: 'left center', flexShrink: 0 }}
        />
      </div>
    </div>
  );
};

export default Preloader;
