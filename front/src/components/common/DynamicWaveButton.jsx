import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const DynamicWaveButton = ({
  children,
  className,
  onClick,
  baseBg = "bg-white",
  hoverBg = "bg-[#B8AB38]",
  baseText = "text-black",
  hoverText = "text-white"
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <svg width="0" height="0" className="absolute hidden pointer-events-none">
        <defs>
          <filter id="gooey-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey-liquid"
            />
            <feComposite in="SourceGraphic" in2="gooey-liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={`relative inline-block transition-transform duration-300 border-none outline-none group ${className}`}
        style={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          transform: 'translateZ(0)'
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: isHovered ? "url('#gooey-liquid')" : "none",
            willChange: isHovered ? "filter" : "auto"
          }}
        >
          <div className={`absolute inset-0 ${baseBg} transition-colors duration-300 rounded-[12px]`}
               style={{ backgroundColor: isHovered ? "" : "" }}
          />

          <motion.div
            className={`absolute ${isHovered ? hoverBg : baseBg} pointer-events-none`}
            animate={{
              rotate: isHovered ? 180 : 0
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 1.5, ease: "linear" },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4, type: "spring" }
            }}
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "45% 65% 55% 45% / 55% 45% 65% 50%",
              left: mouseX,
              top: mouseY,
              x: "-50%",
              y: "-50%",
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.6 : 0.2,
            }}
          />
        </div>

        <div className={`relative z-10 pointer-events-none ${baseText} group-hover:${hoverText.replace('text-', '')} transition-colors duration-300 font-bold tracking-widest uppercase`}>
          {children}
        </div>
      </motion.button>
    </>
  );
};

export default DynamicWaveButton;
