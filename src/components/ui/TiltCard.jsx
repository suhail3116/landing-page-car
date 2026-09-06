import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '../../lib/utils';

export function TiltCard({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.025,
  glareColor = 'rgba(0, 240, 255, 0.22)',
  glareOpacity = 0.35,
  enableGlare = true,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 (left/top) to 0.5 (right/bottom)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glare coordinates in percentage (0% to 100%)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Spring physics for responsive rotation
  const springConfig = { damping: 20, stiffness: 280, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig
  );

  const scaleSpring = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);

    glareX.set((clientX / width) * 100);
    glareY.set((clientY / height) * 100);

    const dist = Math.sqrt(xPct * xPct + yPct * yPct);
    scaleSpring.set(scale + dist * 0.015);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  };

  const glareBackground = useMotionTemplate`radial-gradient(circle 280px at ${glareX}% ${glareY}%, ${glareColor}, transparent 80%)`;

  return (
    <div
      className={cn('relative [perspective:1000px] h-full', containerClassName)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          ...style,
        }}
        className={cn('relative h-full w-full transition-shadow duration-300', className)}
        {...props}
      >
        {children}

        {/* Dynamic Holographic Cursor Glare */}
        {enableGlare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-10"
            style={{
              opacity: isHovered ? glareOpacity : 0,
              background: glareBackground,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default TiltCard;
