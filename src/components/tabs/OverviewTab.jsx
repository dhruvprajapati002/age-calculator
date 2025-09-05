// src/components/tabs/OverviewTab.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const OverviewTab = ({ ageData, isDark }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showDetailed, setShowDetailed] = useState(false);

  // Enhanced statistics with additional calculations
  const enhancedStats = useMemo(() => [
    { 
      title: "Total Days", 
      value: ageData.totalDays.toLocaleString(), 
      emoji: "📅", 
      colorClass: "from-blue-500 via-blue-600 to-indigo-600",
      subtitle: "Days since birth",
      details: `Approximately ${Math.floor(ageData.totalDays / 365.25)} years of memories`,
      bgPattern: "from-blue-100/50 to-indigo-100/50",
      bgPatternDark: "from-blue-900/20 to-indigo-900/20",
      icon: "🌅"
    },
    { 
      title: "Total Weeks", 
      value: ageData.totalWeeks.toLocaleString(), 
      emoji: "📊", 
      colorClass: "from-emerald-500 via-green-600 to-teal-600",
      subtitle: "Weeks lived",
      details: `That's ${Math.floor(ageData.totalWeeks / 52)} complete years`,
      bgPattern: "from-emerald-100/50 to-teal-100/50",
      bgPatternDark: "from-emerald-900/20 to-teal-900/20",
      icon: "📈"
    },
    { 
      title: "Total Hours", 
      value: ageData.totalHours.toLocaleString(), 
      emoji: "⏰", 
      colorClass: "from-orange-500 via-red-500 to-rose-600",
      subtitle: "Hours experienced",
      details: `About ${Math.floor(ageData.totalHours / 8760)} years of experiences`,
      bgPattern: "from-orange-100/50 to-red-100/50",
      bgPatternDark: "from-orange-900/20 to-red-900/20",
      icon: "🕐"
    },
    { 
      title: "Total Minutes", 
      value: ageData.totalMinutes.toLocaleString(), 
      emoji: "⏱️", 
      colorClass: "from-purple-500 via-pink-500 to-fuchsia-600",
      subtitle: "Minutes of life",
      details: `Every minute a precious moment lived`,
      bgPattern: "from-purple-100/50 to-pink-100/50",
      bgPatternDark: "from-purple-900/20 to-pink-900/20",
      icon: "⚡"
    }
  ], [ageData]);

  const additionalStats = useMemo(() => [
    {
      title: "Total Seconds",
      value: ageData.totalSeconds.toLocaleString(),
      emoji: "⚡",
      colorClass: "from-yellow-500 via-amber-500 to-orange-600",
      subtitle: "Seconds of existence",
      bgPattern: "from-yellow-100/50 to-orange-100/50",
      bgPatternDark: "from-yellow-900/20 to-orange-900/20"
    },
    {
      title: "Heartbeats",
      value: Math.floor(ageData.totalMinutes * 70).toLocaleString(),
      emoji: "💖",
      colorClass: "from-red-500 via-pink-500 to-rose-600",
      subtitle: "Estimated heartbeats",
      bgPattern: "from-red-100/50 to-pink-100/50",
      bgPatternDark: "from-red-900/20 to-pink-900/20"
    },
    {
      title: "Breaths Taken",
      value: Math.floor(ageData.totalMinutes * 15).toLocaleString(),
      emoji: "🌬️",
      colorClass: "from-cyan-500 via-sky-500 to-blue-600",
      subtitle: "Estimated breaths",
      bgPattern: "from-cyan-100/50 to-blue-100/50",
      bgPatternDark: "from-cyan-900/20 to-blue-900/20"
    },
    {
      title: "Earth Orbits",
      value: (ageData.totalDays / 365.25).toFixed(2),
      emoji: "🌍",
      colorClass: "from-green-500 via-emerald-500 to-teal-600",
      subtitle: "Times around the sun",
      bgPattern: "from-green-100/50 to-teal-100/50",
      bgPatternDark: "from-green-900/20 to-teal-900/20"
    }
  ], [ageData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const StatCard = ({ stat, index, isAdditional = false }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredCard(index)}
      onHoverEnd={() => setHoveredCard(null)}
      className={`
        relative group cursor-pointer rounded-3xl p-6 shadow-lg hover:shadow-2xl 
        transition-all duration-500 border overflow-hidden
        ${isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:border-gray-600/70' 
          : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70'
        }
        backdrop-blur-xl
      `}
    >
      {/* Animated background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDark ? stat.bgPatternDark : stat.bgPattern
        }`}
        animate={{
          scale: hoveredCard === index ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles */}
      {hoveredCard === index && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-white/40' : 'bg-gray-600/40'
              }`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -30],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      <div className="text-center relative z-10">
        {/* Animated emoji */}
        <motion.div 
          className="text-5xl mb-4"
          animate={{ 
            rotate: hoveredCard === index ? [0, 10, -10, 0] : [0, 3, -3, 0],
            scale: hoveredCard === index ? 1.2 : [1, 1.05, 1]
          }}
          transition={{ 
            duration: hoveredCard === index ? 0.8 : 3,
            repeat: Infinity,
            repeatType: hoveredCard === index ? "loop" : "reverse"
          }}
        >
          {stat.emoji}
        </motion.div>

        {/* Animated value */}
        <motion.div 
          className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r ${stat.colorClass} bg-clip-text text-transparent`}
          animate={{ 
            scale: hoveredCard === index ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 0.5,
            repeat: hoveredCard === index ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {stat.value}
        </motion.div>

        {/* Title */}
        <motion.div 
          className={`text-sm font-bold uppercase tracking-wider mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
          animate={{
            color: hoveredCard === index 
              ? (isDark ? '#ffffff' : '#000000')
              : (isDark ? '#d1d5db' : '#6b7280')
          }}
        >
          {stat.title}
        </motion.div>

        {/* Subtitle */}
        <div className={`text-xs ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {stat.subtitle}
        </div>

        {/* Details on hover */}
        <AnimatePresence>
          {hoveredCard === index && stat.details && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`mt-3 text-xs leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {stat.details}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ 
          x: hoveredCard === index ? ['100%', '-100%'] : '100%'
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  return (
    <div className={`
      relative backdrop-blur-sm rounded-3xl p-8 shadow-xl border mb-12 overflow-hidden
      ${isDark 
        ? 'bg-gray-900/60 border-white/10' 
        : 'bg-white/60 border-gray-200/50'
      }
    `}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-24 h-24 rounded-full blur-3xl ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600/10 to-purple-600/10' 
                : 'bg-gradient-to-r from-indigo-200/20 to-purple-200/20'
            }`}
            style={{
              left: `${10 + i * 25}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.1, 0.9, 1],
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.h3 
          className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          📊 Your Life Overview
        </motion.h3>
        
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Main Statistics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10"
      >
        {enhancedStats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </motion.div>

      {/* Toggle for additional stats */}
      <div className="text-center mb-6 relative z-10">
        <motion.button
          onClick={() => setShowDetailed(!showDetailed)}
          className={`
            px-6 py-3 rounded-2xl font-bold transition-all duration-300 border-2
            ${showDetailed
              ? (isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg')
              : (isDark 
                  ? 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:bg-gray-700/50' 
                  : 'bg-white/50 text-gray-700 border-gray-300/50 hover:bg-gray-50')
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: showDetailed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showDetailed ? '🔼' : '🔽'}
            </motion.span>
            {showDetailed ? 'Hide Details' : 'Show More Stats'}
          </span>
        </motion.button>
      </div>

      {/* Additional Statistics */}
      <AnimatePresence>
        {showDetailed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {additionalStats.map((stat, index) => (
                <StatCard key={stat.title} stat={stat} index={index + 4} isAdditional />
              ))}
            </motion.div>

            {/* Life Phases Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`
                p-6 rounded-2xl border relative overflow-hidden
                ${isDark 
                  ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50' 
                  : 'bg-gradient-to-br from-gray-50/80 to-purple-50/50 border-gray-200/50'
                }
              `}
            >
              <h4 className={`text-xl font-bold text-center mb-6 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                🌟 Life Phase Analysis
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { phase: 'Childhood', years: '0-12', percentage: Math.min((12 / ageData.years) * 100, 100), color: 'bg-green-500' },
                  { phase: 'Youth', years: '13-25', percentage: Math.min(Math.max(((ageData.years - 12) / 13) * 100, 0), 100), color: 'bg-blue-500' },
                  { phase: 'Adulthood', years: '26+', percentage: Math.max(((ageData.years - 25) / (80 - 25)) * 100, 0), color: 'bg-purple-500' }
                ].map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-center p-4 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-white/70'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {index === 0 ? '🧒' : index === 1 ? '🧑' : '👨‍💼'}
                    </div>
                    <div className={`text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {phase.phase}
                    </div>
                    <div className={`text-xs mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {phase.years} years
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <motion.div
                        className={`h-2 rounded-full ${phase.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(phase.percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                    <div className={`text-xs font-bold ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {phase.percentage.toFixed(1)}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverviewTab;
