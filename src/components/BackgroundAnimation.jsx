// src/components/BackgroundAnimation.jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const BackgroundAnimation = ({ isDark }) => {
  const orbConfigs = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: i % 2 === 0 ? 'w-72 h-72' : 'w-96 h-96',
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 25 + i * 5,
      delay: i * 2
    })), []
  );

  const getOrbClassName = (config) => {
    const baseClasses = 'absolute rounded-full blur-3xl';
    const sizeClasses = config.size;
    const colorClasses = isDark 
      ? config.id % 2 === 0 
        ? 'bg-gradient-to-r from-indigo-800/10 to-purple-800/10' 
        : 'bg-gradient-to-r from-pink-800/8 to-blue-800/8'
      : config.id % 2 === 0 
        ? 'bg-gradient-to-r from-indigo-200/20 to-purple-200/20' 
        : 'bg-gradient-to-r from-pink-200/15 to-blue-200/15';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating orbs */}
      {orbConfigs.map((config) => (
        <motion.div
          key={`orb-${config.id}`}
          className={getOrbClassName(config)}
          style={{
            left: `${config.initialX}%`,
            top: `${config.initialY}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: config.delay
          }}
        />
      ))}

      {/* Additional atmospheric layer */}
      <motion.div
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/20 via-indigo-900/10 to-purple-900/20' 
            : 'bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30'
        }`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? 'bg-white/20' : 'bg-gray-400/30'
          }`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
