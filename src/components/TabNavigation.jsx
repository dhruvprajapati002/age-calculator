// src/components/TabNavigation.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TabNavigation = ({ activeTab, setActiveTab, tabs, isDark }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center mb-12 relative"
    >
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-16 rounded-full blur-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600/15 to-purple-600/15' 
                : 'bg-gradient-to-r from-indigo-200/30 to-purple-200/30'
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${-20 + (i % 2) * 40}%`,
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -15, 15, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
          />
        ))}
      </div>

      {/* Main navigation container */}
      <motion.div
        className={`
          relative backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border transition-all duration-500 overflow-hidden
          ${isDark 
            ? 'bg-gray-900/80 border-white/10 shadow-purple-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-indigo-500/10'
          }
        `}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />

        <div className="flex gap-2 flex-wrap justify-center items-center relative z-10">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              variants={tabVariants}
              className="relative"
              onHoverStart={() => setHoveredTab(tab.id)}
              onHoverEnd={() => setHoveredTab(null)}
            >
              {/* Active tab background indicator */}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg"
                    layoutId="activeTab"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Hover glow effect */}
              <AnimatePresence>
                {hoveredTab === tab.id && activeTab !== tab.id && (
                  <motion.div
                    className={`absolute inset-0 rounded-2xl ${
                      isDark 
                        ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50' 
                        : 'bg-gradient-to-r from-gray-100/70 to-gray-50/70'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Tab button */}
              <motion.button
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 md:px-6 py-3 rounded-2xl font-bold transition-all duration-300 
                  text-sm md:text-base flex items-center gap-3 select-none cursor-pointer z-10
                  ${activeTab === tab.id
                    ? 'text-white'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                  }
                `}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                {/* Animated emoji */}
                <motion.span 
                  className="text-xl"
                  animate={{ 
                    rotate: hoveredTab === tab.id ? [0, 15, -15, 0] : 0,
                    scale: activeTab === tab.id ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    duration: activeTab === tab.id ? 2 : 0.5,
                    repeat: activeTab === tab.id ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  {tab.emoji}
                </motion.span>

                {/* Tab label */}
                <motion.span
                  animate={{
                    fontWeight: activeTab === tab.id ? 700 : 600
                  }}
                >
                  {tab.label}
                </motion.span>

                {/* Active tab indicator dot */}
                <AnimatePresence>
                  {activeTab === tab.id && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Sparkle effects on active tab */}
                {activeTab === tab.id && (
                  <>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.button>

              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none"
                initial={{ scale: 0, opacity: 1 }}
                whileTap={{ 
                  scale: 2, 
                  opacity: 0,
                  transition: { duration: 0.4 }
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-0.5 h-0.5 rounded-full ${
                isDark ? 'bg-white/30' : 'bg-gray-600/20'
              }`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Tab counter indicator */}
      <motion.div
        className={`
          absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center 
          text-xs font-bold border-2 shadow-lg
          ${isDark 
            ? 'bg-gray-800 text-white border-gray-600' 
            : 'bg-white text-gray-700 border-gray-200'
          }
        `}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        {tabs.length}
      </motion.div>
    </motion.div>
  );
};

export default TabNavigation;
