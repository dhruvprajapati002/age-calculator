// src/components/AgeInputForm.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

const AgeInputForm = ({ birthDate, setBirthDate, onSubmit, isCalculating, isDark }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(99, 102, 241, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  // Check if input has value for floating label
  const hasValue = birthDate && birthDate.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto mb-20 relative"
    >
      {/* Floating background orbs - Fixed rotation effect */}
      <div className="absolute -inset-1 rounded-3xl opacity-75 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            filter: 'blur(1px)'
          }}
        />
      </div>

      {/* Main form container */}
      <div className={`
        relative rounded-3xl p-8 backdrop-blur-2xl border transition-all duration-500 shadow-2xl
        ${isDark 
          ? 'bg-gray-900/90 border-white/10 text-white' 
          : 'bg-white/90 border-gray-200/50 text-gray-900'
        }
      `}>
        {/* Animated top accent - Fixed implementation */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Floating particles - Enhanced */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-white/30' : 'bg-gray-400/30'}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}

        <form onSubmit={onSubmit} className="space-y-8 relative z-10">
          {/* Enhanced title with proper gradient animation */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2 
              className="text-2xl md:text-3xl font-black mb-3"
              style={{
                background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="inline-block mr-3"
              >
                🎂
              </motion.span>
              When were you born?
            </motion.h2>
            <motion.p 
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Let's calculate your amazing journey through time ✨
            </motion.p>
          </motion.div>

          {/* Enhanced input field with proper floating label */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="relative"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Input field */}
              <motion.input
                type="date"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                max={new Date().toISOString().split('T')[0]}
                required
                className={`
                  relative w-full px-6 py-4 text-lg font-semibold rounded-2xl 
                  border-2 outline-none transition-all duration-300 backdrop-blur-sm
                  ${isDark 
                    ? 'bg-gray-800/70 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  ${isFocused 
                    ? (isDark ? 'border-purple-400 ring-2 ring-purple-400/30' : 'border-purple-500 ring-2 ring-purple-500/30')
                    : isHovered 
                    ? (isDark ? 'border-gray-500' : 'border-gray-400')
                    : ''
                  }
                `}
                whileFocus={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                whileHover={{
                  scale: 1.005,
                  transition: { duration: 0.2 }
                }}
              />
              
              {/* Enhanced focus border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: isFocused 
                    ? 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)'
                    : 'transparent',
                  backgroundSize: '300% 300%',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={isFocused ? { 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                } : {}}
                transition={isFocused ? { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                } : {}}
              />
            </motion.div>

            {/* Fixed floating label */}
            <motion.label
              htmlFor="birthdate"
              className={`
                absolute left-4 px-2 text-sm font-medium transition-all duration-300 pointer-events-none rounded
                ${(isFocused || hasValue)
                  ? `${isDark ? 'text-purple-400 bg-gray-900' : 'text-purple-600 bg-white'} -top-2 text-xs`
                  : `${isDark ? 'text-gray-400' : 'text-gray-500'} top-4 text-sm`
                }
              `}
              animate={{
                y: (isFocused || hasValue) ? 0 : 0,
                scale: (isFocused || hasValue) ? 0.9 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              📅 Select your birth date
            </motion.label>
          </motion.div>

          {/* Enhanced submit button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isCalculating || !birthDate}
              variants={buttonVariants}
              initial="idle"
              whileHover={!isCalculating && birthDate ? "hover" : "idle"}
              whileTap={!isCalculating && birthDate ? "tap" : "idle"}
              className={`
                relative w-full py-4 px-8 rounded-2xl font-bold text-lg text-white 
                overflow-hidden transition-all duration-300
                ${(!birthDate || isCalculating) 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'cursor-pointer'
                }
              `}
            >
              {/* Enhanced button background with better animation */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)',
                  backgroundSize: '300% 300%'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Button content with improved animations */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isCalculating ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      Calculating your amazing journey...
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span
                      animate={birthDate ? { 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.span>
                    Calculate My Age
                    <motion.span
                      animate={birthDate ? { x: [0, 5, 0] } : {}}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>

              {/* Enhanced shimmer effect */}
              {!isCalculating && birthDate && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 2
                  }}
                />
              )}

              {/* Ripple effect on click - Fixed */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={!isCalculating && birthDate ? { 
                  scale: 2, 
                  opacity: [0.3, 0],
                  transition: { duration: 0.6, ease: "easeOut" }
                } : {}}
              />
            </motion.button>
          </motion.div>
        </form>

        {/* Enhanced bottom decoration */}
        <motion.div
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-400/40'}`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgeInputForm;
