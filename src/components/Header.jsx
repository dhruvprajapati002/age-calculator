// src/components/Header.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = ({ onReset, showReset, soundEnabled, onToggleSound, isDark, toggleDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const MotionButton = ({ onClick, icon, title, delay = 0 }) => (
    <motion.button
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      title={title}
      className={`
        relative p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300
        ${isDark 
          ? 'bg-white/10 border-white/20 hover:bg-white/20 shadow-lg shadow-purple-500/20' 
          : 'bg-white/30 border-white/50 hover:bg-white/50 shadow-lg shadow-indigo-500/20'
        }
        group overflow-hidden
      `}
      style={{
        animationDelay: `${delay}s`
      }}
    >
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-2xl"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon with pulse effect */}
      <motion.span 
        className="text-2xl relative z-10 block"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.span>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-2xl"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{ 
          scale: 2, 
          opacity: 0,
          transition: { duration: 0.4 }
        }}
      />
    </motion.button>
  );

  return (
    <motion.div
      className="relative text-center mb-20"
      variants={headerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main content container */}
      <div className={`
        relative p-8 rounded-3xl backdrop-blur-2xl border transition-all duration-500
        ${isDark 
          ? 'bg-gray-900/30 border-white/10' 
          : 'bg-white/20 border-white/30'
        }
      `}>
        {/* Animated title */}
        <motion.div variants={titleVariants} className="mb-6">
          <motion.h1 
            className={`
              text-6xl md:text-8xl font-black mb-4 leading-none
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              bg-clip-text text-transparent bg-300% animate-gradient
            `}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mr-4"
            >
              🎂
            </motion.span>
            Age Calculator
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.p 
          variants={subtitleVariants}
          className={`
            text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8
            ${isDark ? 'text-gray-300' : 'text-gray-700'}
          `}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            Discover your exact age, celebrate milestones, explore zodiac traits, 
            and uncover fascinating facts about your incredible life journey ✨
          </motion.span>
        </motion.p>

        {/* Control buttons */}
        <motion.div 
          className="flex justify-center items-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <MotionButton
            onClick={toggleDarkMode}
            icon={isDark ? '🌞' : '🌙'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            delay={0.1}
          />
          
          <MotionButton
            onClick={onToggleSound}
            icon={soundEnabled ? '🔊' : '🔇'}
            title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
            delay={0.2}
          />

          {showReset && (
            <MotionButton
              onClick={onReset}
              icon="🔄"
              title="Reset Calculator"
              delay={0.3}
            />
          )}
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`
              absolute w-2 h-2 rounded-full
              ${isDark ? 'bg-white/30' : 'bg-gray-400/30'}
            `}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
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

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
      `}</style>
    </motion.div>
  );
};

export default Header;
