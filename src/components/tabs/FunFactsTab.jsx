// src/components/tabs/FunFactsTab.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

// Helper function for ordinal suffixes
const getOrdinalSuffix = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

const FunFactsTab = ({ ageData, isDark }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredFact, setHoveredFact] = useState(null);

  const funFacts = useMemo(() => [
    { 
      icon: "🌍", 
      fact: `You've experienced ${Math.floor(ageData.totalDays / 365.25 * 4)} seasons on Earth`, 
      color: "from-emerald-400/20 via-green-400/15 to-teal-400/20",
      darkColor: "from-emerald-800/30 via-green-800/25 to-teal-800/30",
      category: "Nature",
      intensity: "high"
    },
    { 
      icon: "💖", 
      fact: `Your heart has beaten approximately ${Math.floor(ageData.totalMinutes * 70).toLocaleString()} times`, 
      color: "from-rose-400/20 via-pink-400/15 to-red-400/20",
      darkColor: "from-rose-800/30 via-pink-800/25 to-red-800/30",
      category: "Biology",
      intensity: "high"
    },
    { 
      icon: "🎊", 
      fact: `You've celebrated ${ageData.years} New Year's Eve parties`, 
      color: "from-yellow-400/20 via-amber-400/15 to-orange-400/20",
      darkColor: "from-yellow-800/30 via-amber-800/25 to-orange-800/30",
      category: "Celebrations",
      intensity: "medium"
    },
    { 
      icon: "🌙", 
      fact: `You've seen approximately ${Math.floor(ageData.totalDays / 29.5)} full moons`, 
      color: "from-indigo-400/20 via-purple-400/15 to-violet-400/20",
      darkColor: "from-indigo-800/30 via-purple-800/25 to-violet-800/30",
      category: "Astronomy",
      intensity: "medium"
    },
    { 
      icon: "☀️", 
      fact: `You've witnessed ${ageData.totalDays.toLocaleString()} sunrises and sunsets`, 
      color: "from-orange-400/20 via-yellow-400/15 to-amber-400/20",
      darkColor: "from-orange-800/30 via-yellow-800/25 to-amber-800/30",
      category: "Nature",
      intensity: "high"
    },
    { 
      icon: "🍰", 
      fact: `This is your ${ageData.years + 1}${getOrdinalSuffix(ageData.years + 1)} birthday celebration`, 
      color: "from-pink-400/20 via-rose-400/15 to-fuchsia-400/20",
      darkColor: "from-pink-800/30 via-rose-800/25 to-fuchsia-800/30",
      category: "Milestones",
      intensity: "high"
    },
    { 
      icon: "📚", 
      fact: `You've lived through ${Math.floor(ageData.years / 4)} leap years`, 
      color: "from-teal-400/20 via-cyan-400/15 to-blue-400/20",
      darkColor: "from-teal-800/30 via-cyan-800/25 to-blue-800/30",
      category: "Calendar",
      intensity: "low"
    },
    { 
      icon: "⭐", 
      fact: `You're ${ageData.percentage.toFixed(1)}% through an average human lifespan`, 
      color: "from-purple-400/20 via-indigo-400/15 to-blue-400/20",
      darkColor: "from-purple-800/30 via-indigo-800/25 to-blue-800/30",
      category: "Statistics",
      intensity: "medium"
    },
    { 
      icon: "🌸", 
      fact: `You've breathed approximately ${Math.floor(ageData.totalMinutes * 20).toLocaleString()} times`, 
      color: "from-pink-400/20 via-purple-400/15 to-violet-400/20",
      darkColor: "from-pink-800/30 via-purple-800/25 to-violet-800/30",
      category: "Biology",
      intensity: "high"
    },
    { 
      icon: "🎯", 
      fact: `You've lived for ${ageData.totalSeconds.toLocaleString()} seconds`, 
      color: "from-blue-400/20 via-indigo-400/15 to-purple-400/20",
      darkColor: "from-blue-800/30 via-indigo-800/25 to-purple-800/30",
      category: "Time",
      intensity: "medium"
    },
    { 
      icon: "🚶", 
      fact: `If you walk 10,000 steps daily, you've taken ${(ageData.totalDays * 10000).toLocaleString()} steps!`, 
      color: "from-emerald-400/20 via-green-400/15 to-lime-400/20",
      darkColor: "from-emerald-800/30 via-green-800/25 to-lime-800/30",
      category: "Health",
      intensity: "medium"
    },
    { 
      icon: "💧", 
      fact: `You've consumed approximately ${Math.floor(ageData.totalDays * 2.7).toLocaleString()} liters of water`, 
      color: "from-cyan-400/20 via-blue-400/15 to-indigo-400/20",
      darkColor: "from-cyan-800/30 via-blue-800/25 to-indigo-800/30",
      category: "Health",
      intensity: "medium"
    }
  ], [ageData]);

  const categories = useMemo(() => {
    const cats = [...new Set(funFacts.map(fact => fact.category))];
    return ['all', ...cats];
  }, [funFacts]);

  const categoryColors = {
    "all": isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800",
    "Nature": isDark ? "bg-green-800/80 text-green-200" : "bg-green-100 text-green-800",
    "Biology": isDark ? "bg-red-800/80 text-red-200" : "bg-red-100 text-red-800",
    "Celebrations": isDark ? "bg-yellow-800/80 text-yellow-200" : "bg-yellow-100 text-yellow-800",
    "Astronomy": isDark ? "bg-purple-800/80 text-purple-200" : "bg-purple-100 text-purple-800",
    "Milestones": isDark ? "bg-pink-800/80 text-pink-200" : "bg-pink-100 text-pink-800",
    "Calendar": isDark ? "bg-teal-800/80 text-teal-200" : "bg-teal-100 text-teal-800",
    "Statistics": isDark ? "bg-indigo-800/80 text-indigo-200" : "bg-indigo-100 text-indigo-800",
    "Time": isDark ? "bg-blue-800/80 text-blue-200" : "bg-blue-100 text-blue-800",
    "Health": isDark ? "bg-emerald-800/80 text-emerald-200" : "bg-emerald-100 text-emerald-800"
  };

  const filteredFacts = activeCategory === 'all' 
    ? funFacts 
    : funFacts.filter(fact => fact.category === activeCategory);

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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <div className={`backdrop-blur-xl rounded-3xl p-8 shadow-2xl border mb-12 relative overflow-hidden ${
      isDark 
        ? 'bg-gray-900/80 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-3xl ${
              isDark 
                ? 'bg-gradient-to-r from-purple-600/10 to-pink-600/10' 
                : 'bg-gradient-to-r from-purple-200/20 to-pink-200/20'
            }`}
            style={{
              left: `${10 + i * 15}%`,
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
          className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
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
          🎯 Amazing Facts About You
        </motion.h3>
        
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
      
      {/* Enhanced Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2
              ${activeCategory === category 
                ? `${categoryColors[category]} border-current shadow-lg scale-105` 
                : `${categoryColors[category]} border-transparent opacity-70 hover:opacity-100 hover:scale-105`
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {category === 'all' ? '🌟 All Facts' : `${category}`}
          </motion.button>
        ))}
      </motion.div>

      {/* Fun Facts Grid with enhanced animations */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 relative z-10"
        >
          {filteredFacts.map((item, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredFact(index)}
              onHoverEnd={() => setHoveredFact(null)}
              className={`
                relative flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer group overflow-hidden
                ${isDark 
                  ? `bg-gradient-to-br ${item.darkColor} border-white/10 hover:border-white/20` 
                  : `bg-gradient-to-br ${item.color} border-gray-200/50 hover:border-gray-300/50`
                }
                shadow-lg hover:shadow-2xl
              `}
            >
              {/* Animated background decoration */}
              <motion.div
                className={`absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-8 translate-x-8 ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
                animate={{ 
                  scale: hoveredFact === index ? 2 : 1,
                  rotate: hoveredFact === index ? 180 : 0
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating particles on hover */}
              {hoveredFact === index && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
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
              
              {/* Icon with enhanced animation */}
              <motion.span 
                className="text-4xl flex-shrink-0 z-10 relative"
                animate={{ 
                  rotate: hoveredFact === index ? [0, 15, -15, 0] : 0,
                  scale: hoveredFact === index ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.span>
            
            <div className="flex-grow z-10 relative">
              <motion.p 
                className={`font-semibold leading-relaxed mb-3 ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}
                animate={{
                  color: hoveredFact === index 
                    ? (isDark ? '#ffffff' : '#000000')
                    : (isDark ? '#e5e7eb' : '#374151')
                }}
              >
                {item.fact}
              </motion.p>
              
              <motion.div 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${categoryColors[item.category]}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="mr-1">
                  {item.category === 'Nature' && '🌿'}
                  {item.category === 'Biology' && '🧬'}
                  {item.category === 'Celebrations' && '🎉'}
                  {item.category === 'Astronomy' && '🌌'}
                  {item.category === 'Milestones' && '🏆'}
                  {item.category === 'Calendar' && '📅'}
                  {item.category === 'Statistics' && '📊'}
                  {item.category === 'Time' && '⏰'}
                  {item.category === 'Health' && '💪'}
                </span>
                {item.category}
              </motion.div>
            </div>
          </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-8 rounded-3xl border relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/50 to-indigo-900/30 border-white/10' 
            : 'bg-gradient-to-br from-gray-50/80 to-indigo-50/50 border-gray-200/50'
        }`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <motion.h4 
          className={`text-2xl font-black text-center mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📊 Your Life in Numbers
        </motion.h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { 
              icon: "⏱️", 
              label: "Total Seconds", 
              value: `${(ageData.totalSeconds / 1000000).toFixed(1)}M`,
              color: isDark ? "text-yellow-400" : "text-yellow-600"
            },
            { 
              icon: "🌍", 
              label: "Earth Rotations", 
              value: ageData.totalDays.toLocaleString(),
              color: isDark ? "text-green-400" : "text-green-600"
            },
            { 
              icon: "💭", 
              label: "Thoughts*", 
              value: `${(ageData.totalDays * 70000 / 1000000).toFixed(0)}M`,
              color: isDark ? "text-purple-400" : "text-purple-600"
            },
            { 
              icon: "😴", 
              label: "Hours Slept*", 
              value: Math.floor(ageData.totalHours / 3).toLocaleString(),
              color: isDark ? "text-blue-400" : "text-blue-600"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/50 border-gray-200/50'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <motion.div 
                className="text-3xl mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
              <motion.div 
                className={`text-xl font-black ${stat.color}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <p className={`text-xs text-center mt-6 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          * Approximate calculations based on scientific averages
        </p>
      </motion.div>

      {/* Enhanced Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="mt-10 text-center relative z-10"
      >
        <motion.div 
          className="inline-block p-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.05, rotate: 5 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(251, 191, 36, 0.3)",
              "0 10px 40px rgba(251, 191, 36, 0.5)",
              "0 10px 30px rgba(251, 191, 36, 0.3)"
            ]
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
            scale: { duration: 0.3 }
          }}
        >
          {/* Badge shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <div className="text-white text-center relative z-10">
            <motion.div 
              className="text-4xl mb-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <div className="text-lg font-black mb-1">Life Explorer</div>
            <motion.div 
              className="text-sm opacity-90 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {ageData.totalDays.toLocaleString()} days of adventure!
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FunFactsTab;
