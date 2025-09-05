// src/components/AgeDisplay.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

const AgeDisplay = ({ ageData, onShare, isDark }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      rotateX: 5,
      z: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const ageCards = [
    { 
      value: ageData.years, 
      label: "Years", 
      icon: "🎂", 
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      bgPattern: "bg-gradient-to-br",
      shadowColor: "shadow-purple-500/30"
    },
    { 
      value: ageData.months, 
      label: "Months", 
      icon: "📅", 
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bgPattern: "bg-gradient-to-br",
      shadowColor: "shadow-teal-500/30"
    },
    { 
      value: ageData.days, 
      label: "Days", 
      icon: "☀️", 
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      bgPattern: "bg-gradient-to-br",
      shadowColor: "shadow-orange-500/30"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-20 relative"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-3xl opacity-20 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
            }`}
            style={{
              left: `${10 + i * 25}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className={`
        relative backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border transition-all duration-500
        ${isDark 
          ? 'bg-gray-900/80 border-white/10' 
          : 'bg-white/70 border-gray-200/50'
        }
      `}>
        {/* Animated top gradient bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-3xl"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: 1,
            background: [
              'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)',
              'linear-gradient(90deg, #3b82f6, #ec4899, #8b5cf6)',
              'linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899)',
              'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)'
            ]
          }}
          transition={{ 
            scaleX: { duration: 1, delay: 0.5 },
            background: { duration: 4, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Title with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.h2 
            className={`text-4xl md:text-6xl font-black mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            You are
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Age cards with 3D effects */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
          {ageCards.map((card, index) => (
            <motion.div
              key={card.label}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`
                relative group cursor-pointer perspective-1000
                ${card.bgPattern} ${card.gradient} 
                rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl
                ${card.shadowColor} transition-all duration-300
                min-w-[120px] md:min-w-[150px]
              `}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Card shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ 
                  x: hoveredCard === index ? '100%' : '-100%',
                  opacity: hoveredCard === index ? 1 : 0
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* Icon with animation */}
              <motion.div 
                className="text-4xl md:text-5xl mb-4 relative z-10"
                animate={{ 
                  rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                  scale: hoveredCard === index ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {card.icon}
              </motion.div>

              {/* Value with counting animation */}
              <motion.div 
                className="text-4xl md:text-6xl font-black text-white mb-3 relative z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.5,
                  ease: "easeInOut" 
                }}
              >
                {card.value}
              </motion.div>

              {/* Label */}
              <div className="text-sm md:text-lg font-bold text-white/90 uppercase tracking-wider relative z-10">
                {card.label}
              </div>

              {/* Floating particles */}
              {hoveredCard === index && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -20],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next birthday section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-10"
        >
          <div className={`
            p-6 rounded-2xl backdrop-blur-sm border
            ${isDark 
              ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600/50' 
              : 'bg-gradient-to-r from-gray-50/50 to-white/50 border-gray-300/50'
            }
          `}>
            <p className={`text-xl md:text-2xl font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              🎂 Your next birthday is in
            </p>
            
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`text-4xl md:text-6xl font-black ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              {ageData.daysToNextBirthday}
              <span className="text-2xl md:text-3xl ml-2 font-medium">
                {ageData.daysToNextBirthday === 1 ? 'day' : 'days'}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* Share button */}
          <motion.button
            onClick={onShare}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                📤
              </motion.span>
              Share Results
            </span>
          </motion.button>

          {/* Generation badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`
              px-6 py-4 rounded-2xl font-bold shadow-lg cursor-pointer
              ${isDark 
                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-white/20' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span>👥</span>
              {ageData.generation}
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-white/20' : 'bg-gray-400/30'
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AgeDisplay;
