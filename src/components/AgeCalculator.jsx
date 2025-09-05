// src/components/AgeCalculator.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import AgeInputForm from './AgeInputForm';
import AgeDisplay from './AgeDisplay';
import TabNavigation from './TabNavigation';
import BackgroundAnimation from './BackgroundAnimation';
import OverviewTab from './tabs/OverviewTab';
import MilestonesTab from './tabs/MilestonesTab';
import ZodiacTab from './tabs/ZodiacTab';
import FunFactsTab from './tabs/FunFactsTab';
import { calculateAge } from '../utils/ageCalculations';
import { createConfetti } from '../utils/confetti';
import { playSound } from '../utils/sound';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Get isDark and toggleDarkMode from theme context
  const { isDark, toggleDarkMode } = useTheme();

  useEffect(() => {
    const savedSound = localStorage.getItem('soundEnabled') !== 'false';
    setSoundEnabled(savedSound);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('soundEnabled', !soundEnabled);
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!birthDate) return;
    
    setIsCalculating(true);
    playSound('click', soundEnabled);
    
    // Enhanced loading animation duration
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const result = calculateAge(birthDate);
    setAgeData(result);
    setIsCalculating(false);
    
    if (result.isBirthdayToday) {
      createConfetti();
      playSound('success', soundEnabled);
    } else {
      playSound('success', soundEnabled);
    }
  };

  const shareResults = async () => {
    if (!ageData) return;
    
    const shareText = `🎂 I'm ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days old! That's ${ageData.totalDays.toLocaleString()} days of awesome! My zodiac sign is ${ageData.zodiac.name} ${ageData.zodiac.emoji} and I'm part of ${ageData.generation}! ✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Age Calculator Results',
          text: shareText,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        // Enhanced notification
        const notification = document.createElement('div');
        notification.innerHTML = '✅ Results copied to clipboard!';
        notification.className = `fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${isDark ? 'bg-green-600' : 'bg-green-500'}`;
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
      } catch (err) {
        console.log('Clipboard not available:', err);
      }
    }
  };

  const resetCalculator = () => {
    setBirthDate('');
    setAgeData(null);
    setActiveTab('overview');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', emoji: '📊' },
    { id: 'milestones', label: 'Milestones', emoji: '🏆' },
    { id: 'zodiac', label: 'Zodiac', emoji: '🔮' },
    { id: 'fun-facts', label: 'Fun Facts', emoji: '🎯' }
  ];

  // Enhanced page animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
          : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
      }`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Enhanced Background Animation */}
      <BackgroundAnimation isDark={isDark} />
      
      {/* Floating orbs for additional depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${
              isDark 
                ? 'bg-gradient-to-r from-purple-800/20 to-indigo-800/20' 
                : 'bg-gradient-to-r from-purple-200/30 to-indigo-200/30'
            }`}
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${10 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Pass isDark and toggleDarkMode to Header */}
        <motion.div variants={contentVariants}>
          <Header 
            onReset={resetCalculator}
            showReset={!!ageData}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            isDark={isDark}
            toggleDarkMode={toggleDarkMode}
          />
        </motion.div>

        {/* Pass isDark to AgeInputForm */}
        <motion.div variants={contentVariants}>
          <AgeInputForm 
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            onSubmit={handleCalculate}
            isCalculating={isCalculating}
            isDark={isDark}
          />
        </motion.div>

        {/* Results section with enhanced animations */}
        <AnimatePresence mode="wait">
          {ageData && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
            >
              {/* Enhanced Birthday Celebration */}
              {ageData.isBirthdayToday && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.6, -0.05, 0.01, 0.99],
                    delay: 0.2
                  }}
                  className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-3xl p-8 mb-12 text-center shadow-2xl relative overflow-hidden"
                >
                  {/* Animated background particles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/50 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -100],
                        opacity: [1, 0],
                        scale: [1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0], 
                      scale: [1, 1.2, 1] 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      repeatDelay: 1 
                    }}
                    className="text-6xl mb-4 relative z-10"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-4xl font-bold mb-4 relative z-10">Happy Birthday!</h2>
                  <p className="text-xl relative z-10">Wishing you a year filled with happiness, success, and amazing adventures!</p>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                </motion.div>
              )}

              {/* Pass isDark to AgeDisplay */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <AgeDisplay 
                  ageData={ageData} 
                  onShare={shareResults} 
                  isDark={isDark}
                />
              </motion.div>

              {/* Pass isDark to TabNavigation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TabNavigation 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={tabs}
                  isDark={isDark}
                />
              </motion.div>

              {/* Enhanced Tab Content with smooth transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.6, -0.05, 0.01, 0.99] 
                  }}
                >
                  {/* Pass isDark to all tab components */}
                  {activeTab === 'overview' && <OverviewTab ageData={ageData} isDark={isDark} />}
                  {activeTab === 'milestones' && <MilestonesTab ageData={ageData} isDark={isDark} />}
                  {activeTab === 'zodiac' && <ZodiacTab ageData={ageData} isDark={isDark} />}
                  {activeTab === 'fun-facts' && <FunFactsTab ageData={ageData} isDark={isDark} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to top button when results are shown */}
        <AnimatePresence>
          {ageData && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
                isDark 
                  ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700' 
                  : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ⬆️
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Loading overlay during calculation */}
      <AnimatePresence>
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`p-8 rounded-2xl shadow-2xl ${
                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-4xl mb-4"
                >
                  ⏳
                </motion.div>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg font-semibold"
                >
                  Calculating your amazing journey...
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgeCalculator;
