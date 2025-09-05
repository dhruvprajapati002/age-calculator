// src/components/tabs/ZodiacTab.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const ZodiacTab = ({ ageData, isDark }) => {
  const [activeZodiac, setActiveZodiac] = useState('western');
  const [hoveredTrait, setHoveredTrait] = useState(null);

  const chineseZodiacData = useMemo(() => ({
    emojis: {
      'Rat': '🐭', 'Ox': '🐂', 'Tiger': '🐅', 'Rabbit': '🐰', 
      'Dragon': '🐉', 'Snake': '🐍', 'Horse': '🐴', 'Goat': '🐐',
      'Monkey': '🐵', 'Rooster': '🐓', 'Dog': '🐕', 'Pig': '🐷'
    },
    traits: {
      'Rat': ['Intelligent', 'Adaptable', 'Quick-witted'],
      'Ox': ['Reliable', 'Strong', 'Determined'],
      'Tiger': ['Brave', 'Competitive', 'Unpredictable'],
      'Rabbit': ['Gentle', 'Quiet', 'Elegant'],
      'Dragon': ['Confident', 'Intelligent', 'Enthusiastic'],
      'Snake': ['Wise', 'Intuitive', 'Mysterious'],
      'Horse': ['Animated', 'Active', 'Energetic'],
      'Goat': ['Calm', 'Gentle', 'Sympathetic'],
      'Monkey': ['Sharp', 'Smart', 'Curious'],
      'Rooster': ['Observant', 'Hardworking', 'Courageous'],
      'Dog': ['Loyal', 'Responsible', 'Reliable'],
      'Pig': ['Compassionate', 'Generous', 'Diligent']
    },
    elements: {
      'Rat': 'Water', 'Ox': 'Earth', 'Tiger': 'Wood', 'Rabbit': 'Wood',
      'Dragon': 'Earth', 'Snake': 'Fire', 'Horse': 'Fire', 'Goat': 'Earth',
      'Monkey': 'Metal', 'Rooster': 'Metal', 'Dog': 'Earth', 'Pig': 'Water'
    }
  }), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <div className={`
      relative backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border mb-12 overflow-hidden transition-all duration-500
      ${isDark 
        ? 'bg-gray-900/80 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
      }
    `}>
      {/* Floating mystical orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-24 h-24 rounded-full blur-2xl ${
              i % 3 === 0 
                ? (isDark ? 'bg-purple-600/15' : 'bg-purple-200/30')
                : i % 2 === 0
                ? (isDark ? 'bg-indigo-600/15' : 'bg-indigo-200/30')
                : (isDark ? 'bg-pink-600/15' : 'bg-pink-200/30')
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 2) * 35}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 3,
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
          className="text-4xl md:text-5xl font-black mb-4"
          style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '300% 300%'
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
          🔮 Your Zodiac Profile
        </motion.h3>
        
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Zodiac Toggle */}
        <div className={`inline-flex p-1 rounded-2xl shadow-lg ${
          isDark ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'
        }`}>
          {[
            { id: 'western', label: 'Western 🌟', icon: '♈' },
            { id: 'chinese', label: 'Chinese 🏮', icon: '🐉' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveZodiac(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeZodiac === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-700/50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Zodiac Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeZodiac}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10"
        >
          {activeZodiac === 'western' ? (
            <>
              {/* Western Zodiac Card */}
              <motion.div variants={cardVariants} className="text-center">
                <div className={`
                  rounded-3xl p-8 border-2 transition-all duration-500 relative overflow-hidden
                  ${isDark 
                    ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-700/50' 
                    : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
                  }
                  shadow-xl hover:shadow-2xl
                `}>
                  {/* Constellation background */}
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                          isDark ? 'bg-white' : 'bg-gray-600'
                        }`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 3,
                        }}
                      />
                    ))}
                  </div>

                  <h4 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    ✨ Western Zodiac
                  </h4>
                  
                  {/* Zodiac Symbol */}
                  <motion.div
                    className="text-8xl mb-6 cursor-pointer relative z-10"
                    animate={{ 
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 15,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {ageData.zodiac.emoji}
                    
                    {/* Magical sparkles on hover */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 rounded-full ${
                            isDark ? 'bg-yellow-400' : 'bg-yellow-500'
                          }`}
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* Zodiac Name */}
                  <motion.h5 
                    className={`text-4xl font-black mb-4 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    {ageData.zodiac.name}
                  </motion.h5>
                  
                  {/* Element Badge */}
                  <motion.div 
                    className={`inline-block px-6 py-3 rounded-full text-white font-bold mb-6 shadow-lg ${ageData.zodiac.color}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    🔥 {ageData.zodiac.element} Element
                  </motion.div>
                  
                  {/* Traits */}
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {ageData.zodiac.traits.map((trait, index) => (
                      <motion.span
                        key={trait}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg cursor-pointer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -4,
                          boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)"
                        }}
                        onHoverStart={() => setHoveredTrait(index)}
                        onHoverEnd={() => setHoveredTrait(null)}
                      >
                        ✨ {trait}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Zodiac Info */}
                  <div className={`space-y-3 text-left rounded-2xl p-4 ${
                    isDark ? 'bg-white/5' : 'bg-white/70'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        📅 Date Range
                      </span>
                      <span className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {ageData.zodiac.dates[0][0]}/{ageData.zodiac.dates[0][1]} - {ageData.zodiac.dates[1][0]}/{ageData.zodiac.dates[1][1]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        🌅 Birth Day
                      </span>
                      <span className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {ageData.birthDayOfWeek}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Life Progress Card */}
              <motion.div variants={cardVariants} className="text-center">
                <div className={`
                  rounded-3xl p-8 border-2 transition-all duration-500
                  ${isDark 
                    ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50' 
                    : 'bg-gradient-to-br from-gray-50 to-purple-50 border-gray-200'
                  }
                  shadow-xl hover:shadow-2xl
                `}>
                  <h4 className={`text-2xl font-bold mb-6 flex items-center justify-center gap-2 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    📈 Your Life Journey
                  </h4>
                  
                  {/* Progress Circle */}
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={isDark ? '#374151' : '#e5e7eb'}
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - ageData.percentage / 100)}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - ageData.percentage / 100) }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Percentage in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className={`text-center ${isDark ? 'text-white' : 'text-gray-800'}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <div className="text-2xl font-black">{ageData.percentage.toFixed(1)}%</div>
                        <div className="text-xs opacity-75">of average lifespan</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className={`p-4 rounded-xl ${
                        isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="text-2xl mb-2">🗓️</div>
                      <div className={`text-xs font-semibold mb-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Age in Months
                      </div>
                      <div className={`text-xl font-black ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>
                        {ageData.ageInMonths}
                      </div>
                    </motion.div>

                    <motion.div 
                      className={`p-4 rounded-xl ${
                        isDark ? 'bg-purple-900/30' : 'bg-purple-100'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="text-2xl mb-2">👥</div>
                      <div className={`text-xs font-semibold mb-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Generation
                      </div>
                      <div className={`text-sm font-black ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {ageData.generation}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Chinese Zodiac Card */}
              <motion.div variants={cardVariants} className="text-center">
                <div className={`
                  rounded-3xl p-8 border-2 transition-all duration-500 relative overflow-hidden
                  ${isDark 
                    ? 'bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-700/50' 
                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
                  }
                  shadow-xl hover:shadow-2xl
                `}>
                  {/* Chinese patterns background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 20px 20px, ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'} 2px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  <h4 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    🏮 Chinese Zodiac
                  </h4>
                  
                  {/* Chinese Zodiac Animal */}
                  <motion.div
                    className="text-8xl mb-6 cursor-pointer relative z-10"
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 20,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {chineseZodiacData.emojis[ageData.chineseSign]}
                  </motion.div>
                  
                  {/* Animal Name */}
                  <motion.h5 
                    className={`text-4xl font-black mb-4 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    {ageData.chineseSign}
                  </motion.h5>
                  
                  {/* Element Badge */}
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg inline-block"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    🎋 {chineseZodiacData.elements[ageData.chineseSign]} Element
                  </motion.div>
                  
                  {/* Chinese Traits */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {chineseZodiacData.traits[ageData.chineseSign]?.map((trait, index) => (
                      <motion.span
                        key={trait}
                        className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg cursor-pointer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.15 }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -4,
                          boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)"
                        }}
                      >
                        🌸 {trait}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Chinese Philosophy Card */}
              <motion.div variants={cardVariants} className="text-center">
                <div className={`
                  rounded-3xl p-8 border-2 transition-all duration-500
                  ${isDark 
                    ? 'bg-gradient-to-br from-yellow-900/30 to-red-900/30 border-yellow-700/50' 
                    : 'bg-gradient-to-br from-yellow-50 to-red-50 border-yellow-200'
                  }
                  shadow-xl hover:shadow-2xl
                `}>
                  <h4 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    ☯️ Eastern Wisdom
                  </h4>

                  {/* Yin Yang Symbol */}
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ☯️
                  </motion.div>

                  <div className="space-y-6">
                    {/* Fortune Reading */}
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-white/5' : 'bg-white/70'
                    }`}>
                      <h6 className={`text-lg font-bold mb-3 ${
                        isDark ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        🔮 Your Essence
                      </h6>
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        As a <strong>{ageData.chineseSign}</strong>, you embody the spirit of the {chineseZodiacData.elements[ageData.chineseSign]} element. 
                        Your natural traits of being {chineseZodiacData.traits[ageData.chineseSign]?.join(', ')} 
                        guide your path through life's journey.
                      </p>
                    </div>

                    {/* Lucky Elements */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl text-center ${
                        isDark ? 'bg-red-900/30' : 'bg-red-100'
                      }`}>
                        <div className="text-2xl mb-2">🎨</div>
                        <div className={`text-xs font-semibold ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Lucky Colors
                        </div>
                        <div className={`text-sm font-bold ${
                          isDark ? 'text-red-400' : 'text-red-600'
                        }`}>
                          Red & Gold
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl text-center ${
                        isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                      }`}>
                        <div className="text-2xl mb-2">🔢</div>
                        <div className={`text-xs font-semibold ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Life Path
                        </div>
                        <div className={`text-sm font-bold ${
                          isDark ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          {ageData.percentage.toFixed(0)}% Complete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Compatibility Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`
          mt-8 p-6 rounded-3xl border relative z-10 transition-all duration-500
          ${isDark 
            ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-700/50' 
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
          }
        `}
      >
        <h5 className={`text-xl font-bold text-center mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          🔗 Cosmic Harmony
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={`p-4 rounded-2xl ${
              isDark ? 'bg-white/5' : 'bg-white/70'
            }`}
          >
            <h6 className={`font-semibold mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Western Element
            </h6>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-bold ${ageData.zodiac.color}`}>
              🔥 {ageData.zodiac.element}
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={`p-4 rounded-2xl ${
              isDark ? 'bg-white/5' : 'bg-white/70'
            }`}
          >
            <h6 className={`font-semibold mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Chinese Animal
            </h6>
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold">
              {chineseZodiacData.emojis[ageData.chineseSign]} {ageData.chineseSign}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ZodiacTab;
