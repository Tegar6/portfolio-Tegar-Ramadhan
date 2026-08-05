import React, { useRef, useState } from 'react';
import { motion, useSpring, SpringOptions } from 'framer-motion';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
}

const springConfig: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '400px',
  containerWidth = '100%',
  imageHeight = '400px',
  imageWidth = '100%',
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  
  // State untuk melacak status loading gambar
  const [isLoading, setIsLoading] = useState(true);

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || isLoading) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    if (isLoading) return;
    scale.set(scaleOnHover);
    setOpacity(1);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    setOpacity(0);
  }

  return (
    <figure
      ref={ref}
      className="relative flex flex-col items-center justify-center [ perspective:800px"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl"
        style={{
          height: imageHeight,
          width: imageWidth,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Skeleton Loading Animation */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-800 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Gambar Profil */}
        <motion.img
          src={imageSrc}
          alt={altText}
          onLoad={() => setIsLoading(false)} // Sembunyikan loading jika gambar selesai dimuat
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </motion.div>

      {showTooltip && captionText && !isLoading && (
        <motion.figcaption
          className="pointer-events-none absolute bottom-4 z-20 rounded-md bg-slate-900/90 px-3 py-1 text-xs text-white shadow-md backdrop-blur-md"
          style={{
            opacity,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;