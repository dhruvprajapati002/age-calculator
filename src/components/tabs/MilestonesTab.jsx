// src/components/tabs/MilestonesTab.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const MilestonesTab = ({ ageData, isDark }) => {
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const progressPercentage = ageData.nextMilestone 
    ? ((ageData.years / ageData.nextMilestone.age) * 100)
    : 100;

  const displayedMilestones = showAllCompleted 
    ? ageData.completedMilestones 
    : ageData.completedMilestones.slice(-6);

  return (
    <div className={`
      relative backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border mb-12 overflow-hidden transition-all duration-500
      ${isDark 
        ? 'bg-gray-900/80 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
      }
    `}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-3xl ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600/10 to-purple-600/10' 
                : 'bg-gradient-to-r from-indigo-200/20 to-purple-200/20'
            }`}
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.h3 
          className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
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
        >
          🏆 Life Milestones
        </motion.h3>
        
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
        {/* Completed Milestones */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h4 className={`text-xl font-bold flex items-center gap-3 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✅
              </motion.span>
              Completed ({ageData.completedMilestones.length})
            </h4>
            
            {ageData.completedMilestones.length > 6 && (
              <motion.button
                onClick={() => setShowAllCompleted(!showAllCompleted)}
                className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-green-800/50 text-green-300 hover:bg-green-800/70' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAllCompleted ? 'Show Less' : 'Show All'}
              </motion.button>
            )}
          </motion.div>

          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <AnimatePresence>
              {displayedMilestones.length > 0 ? (
                displayedMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.age}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    onHoverStart={() => setHoveredMilestone(index)}
                    onHoverEnd={() => setHoveredMilestone(null)}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer group
                      ${isDark 
                        ? 'bg-green-900/20 border-green-700/30 hover:bg-green-900/30 hover:border-green-600/50' 
                        : 'bg-green-50 border-green-200/50 hover:bg-green-100 hover:border-green-300/70'
                      }
                      shadow-md hover:shadow-xl
                    `}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${
                        isDark ? 'bg-green-500/5' : 'bg-green-500/10'
                      }`}
                      animate={{
                        opacity: hoveredMilestone === index ? 1 : 0,
                        scale: hoveredMilestone === index ? 1.02 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Milestone emoji */}
                    <motion.div
                      className="text-4xl flex-shrink-0 relative z-10"
                      animate={{ 
                        rotate: hoveredMilestone === index ? [0, 15, -15, 0] : 0,
                        scale: hoveredMilestone === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {milestone.emoji}
                    </motion.div>

                    {/* Milestone info */}
                    <div className="flex-grow relative z-10">
                      <motion.div 
                        className={`text-lg font-bold mb-1 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}
                        animate={{
                          color: hoveredMilestone === index 
                            ? (isDark ? '#ffffff' : '#000000')
                            : (isDark ? '#e5e7eb' : '#374151')
                        }}
                      >
                        Age {milestone.age}
                      </motion.div>
                      <div className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {milestone.event}
                      </div>
                    </div>

                    {/* Completion badge */}
                    <motion.div 
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDark 
                          ? 'bg-green-800/80 text-green-200' 
                          : 'bg-green-200 text-green-800'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      ✓ Done
                    </motion.div>

                    {/* Sparkle effects on hover */}
                    {hoveredMilestone === index && (
                      <>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${
                              isDark ? 'bg-green-400/60' : 'bg-green-600/60'
                            }`}
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
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-12 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌱
                  </motion.div>
                  <p className="text-lg font-medium">Your journey is just beginning!</p>
                  <p className="text-sm mt-2 opacity-75">Every great adventure starts with a single step.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Next Milestone or Completion */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {ageData.nextMilestone ? (
            <div>
              <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  🎯
                </motion.span>
                Next Milestone
              </h4>

              <motion.div
                className={`
                  p-8 rounded-3xl border-2 transition-all duration-500 relative overflow-hidden
                  ${isDark 
                    ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-600/40 hover:border-blue-500/60' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
                  }
                  shadow-xl hover:shadow-2xl cursor-pointer
                `}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <motion.div
                    className={`w-full h-full rounded-full ${
                      isDark ? 'bg-blue-400' : 'bg-blue-600'
                    }`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Milestone header */}
                <div className="text-center mb-8 relative z-10">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    {ageData.nextMilestone.emoji}
                  </motion.div>

                  <motion.h5 
                    className={`text-3xl font-black mb-3 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    Age {ageData.nextMilestone.age}
                  </motion.h5>

                  <p className={`text-xl mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {ageData.nextMilestone.event}
                  </p>
                </div>

                {/* Progress section */}
                <div className="space-y-6 relative z-10">
                  <div className="text-center">
                    <div className={`text-2xl font-black mb-2 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {ageData.nextMilestone.age - ageData.years} years to go
                    </div>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      You're {progressPercentage.toFixed(1)}% there!
                    </p>
                  </div>

                  {/* Enhanced progress bar */}
                  <div className="relative">
                    <div className={`w-full h-4 rounded-full overflow-hidden ${
                      isDark ? 'bg-blue-900/50' : 'bg-blue-200'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Progress labels */}
                    <div className={`flex justify-between mt-2 text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>Born</span>
                      <span className="font-bold">{progressPercentage.toFixed(1)}%</span>
                      <span>Age {ageData.nextMilestone.age}</span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <motion.div 
                      className={`text-center p-4 rounded-xl ${
                        isDark 
                          ? 'bg-blue-900/30 border border-blue-700/30' 
                          : 'bg-blue-100 border border-blue-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl mb-2">📅</div>
                      <div className={`text-xs font-semibold mb-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Days Remaining
                      </div>
                      <motion.div 
                        className={`text-lg font-black ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        {((ageData.nextMilestone.age - ageData.years) * 365).toLocaleString()}
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      className={`text-center p-4 rounded-xl ${
                        isDark 
                          ? 'bg-indigo-900/30 border border-indigo-700/30' 
                          : 'bg-indigo-100 border border-indigo-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl mb-2">🗓️</div>
                      <div className={`text-xs font-semibold mb-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Months Remaining
                      </div>
                      <motion.div 
                        className={`text-lg font-black ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      >
                        {((ageData.nextMilestone.age - ageData.years) * 12).toLocaleString()}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            // Milestone Master - All completed
            <div>
              <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🌟
                </motion.span>
                Milestone Master
              </h4>

              <motion.div
                className={`
                  p-10 rounded-3xl border-2 text-center relative overflow-hidden
                  ${isDark 
                    ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600/40' 
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                  }
                  shadow-2xl
                `}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                {/* Floating celebration particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${
                      isDark ? 'bg-yellow-400/60' : 'bg-yellow-500/60'
                    }`}
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🏆
                </motion.div>

                <motion.h5 
                  className={`text-3xl font-black mb-4 ${
                    isDark ? 'text-purple-300' : 'text-purple-600'
                  }`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  Congratulations!
                </motion.h5>

                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-purple-200' : 'text-purple-700'
                }`}>
                  🎉 You've conquered all major life milestones! <br />
                  You're officially a <strong>Life Legend</strong>! 🌟
                </p>

                <motion.div
                  className={`mt-6 inline-block px-6 py-3 rounded-full font-bold ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
                  animate={{
                    boxShadow: [
                      "0 4px 20px rgba(147, 51, 234, 0.3)",
                      "0 4px 30px rgba(147, 51, 234, 0.5)",
                      "0 4px 20px rgba(147, 51, 234, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎊 Achievement Unlocked
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MilestonesTab;
