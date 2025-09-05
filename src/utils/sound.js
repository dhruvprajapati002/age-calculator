// src/utils/sound.js

// Sound frequency configurations for different effects
const SOUND_CONFIGS = {
  click: {
    frequency: 800,
    duration: 0.1,
    volume: 0.08,
    type: 'sine'
  },
  hover: {
    frequency: 600,
    duration: 0.05,
    volume: 0.04,
    type: 'sine'
  },
  success: {
    frequencies: [523.25, 659.25, 783.99], // C5, E5, G5 chord
    duration: 0.6,
    volume: 0.12,
    type: 'sine'
  },
  error: {
    frequency: 200,
    duration: 0.3,
    volume: 0.1,
    type: 'square'
  },
  notification: {
    frequencies: [800, 1000, 800],
    duration: 0.4,
    volume: 0.06,
    type: 'sine'
  },
  celebration: {
    frequencies: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
    duration: 1.0,
    volume: 0.15,
    type: 'sine'
  },
  tab: {
    frequency: 700,
    duration: 0.08,
    volume: 0.06,
    type: 'triangle'
  },
  milestone: {
    frequencies: [440, 554.37, 659.25, 880], // A4, C#5, E5, A5
    duration: 0.8,
    volume: 0.14,
    type: 'sine'
  }
};

// Enhanced sound player with multiple oscillators for chords
export const playSound = (type = 'click', enabled = true) => {
  if (!enabled) return;
  
  try {
    // Check for audio context support
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn('Web Audio API not supported');
      return;
    }

    const audioContext = new AudioContext();
    const config = SOUND_CONFIGS[type] || SOUND_CONFIGS.click;
    
    // Handle single frequency sounds
    if (config.frequency) {
      createOscillator(audioContext, config.frequency, config);
    }
    
    // Handle multi-frequency sounds (chords)
    if (config.frequencies) {
      config.frequencies.forEach((frequency, index) => {
        setTimeout(() => {
          createOscillator(audioContext, frequency, config, index * 0.1);
        }, index * 100);
      });
    }
    
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};

// Create individual oscillator with enhanced features
const createOscillator = (audioContext, frequency, config, delay = 0) => {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    
    // Audio routing: oscillator -> filter -> gain -> destination
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Oscillator configuration
    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + delay);
    
    // Filter configuration (low-pass for smoother sound)
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(frequency * 2, audioContext.currentTime + delay);
    filterNode.Q.setValueAtTime(1, audioContext.currentTime + delay);
    
    // Volume envelope (ADSR-style)
    const startTime = audioContext.currentTime + delay;
    const endTime = startTime + config.duration;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(config.volume, startTime + 0.01); // Attack
    gainNode.gain.exponentialRampToValueAtTime(config.volume * 0.7, startTime + config.duration * 0.3); // Decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, endTime); // Release
    
    // Start and stop oscillator
    oscillator.start(startTime);
    oscillator.stop(endTime);
    
  } catch (error) {
    console.warn('Oscillator creation failed:', error);
  }
};

// Play multiple sounds in sequence for complex effects
export const playSoundSequence = (sequence, enabled = true, interval = 200) => {
  if (!enabled || !Array.isArray(sequence)) return;
  
  sequence.forEach((soundType, index) => {
    setTimeout(() => playSound(soundType, enabled), index * interval);
  });
};

// Birthday celebration sound sequence
export const playBirthdaySound = (enabled = true) => {
  if (!enabled) return;
  
  const birthdaySequence = ['celebration', 'success', 'milestone'];
  playSoundSequence(birthdaySequence, enabled, 300);
};

// Milestone achievement sound
export const playMilestoneSound = (enabled = true) => {
  if (!enabled) return;
  
  setTimeout(() => playSound('milestone', enabled), 0);
  setTimeout(() => playSound('success', enabled), 400);
};

// Tab switching sound with pitch variation
export const playTabSound = (tabIndex = 0, enabled = true) => {
  if (!enabled) return;
  
  const basePitch = 600;
  const pitchVariation = tabIndex * 50; // Different pitch for each tab
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    createOscillator(audioContext, basePitch + pitchVariation, {
      type: 'triangle',
      duration: 0.1,
      volume: 0.05
    });
  } catch (error) {
    console.warn('Tab sound failed:', error);
  }
};

// Hover sound with subtle feedback
export const playHoverSound = (enabled = true) => {
  playSound('hover', enabled);
};

// Error sound for form validation
export const playErrorSound = (enabled = true) => {
  playSound('error', enabled);
};

// Notification sound for clipboard copy, etc.
export const playNotificationSound = (enabled = true) => {
  playSound('notification', enabled);
};

// Volume control utilities
export const setGlobalVolume = (volume) => {
  // Update all sound configs with new volume multiplier
  Object.keys(SOUND_CONFIGS).forEach(key => {
    const originalVolume = SOUND_CONFIGS[key].originalVolume || SOUND_CONFIGS[key].volume;
    if (!SOUND_CONFIGS[key].originalVolume) {
      SOUND_CONFIGS[key].originalVolume = originalVolume;
    }
    SOUND_CONFIGS[key].volume = originalVolume * Math.max(0, Math.min(1, volume));
  });
};

// Test all sounds (useful for settings/preferences)
export const testAllSounds = (enabled = true) => {
  if (!enabled) return;
  
  const soundTypes = Object.keys(SOUND_CONFIGS);
  soundTypes.forEach((type, index) => {
    setTimeout(() => {
      console.log(`Testing ${type} sound`);
      playSound(type, enabled);
    }, index * 800);
  });
};

// Advanced celebration sequence for special occasions
export const playCelebrationSequence = (enabled = true) => {
  if (!enabled) return;
  
  // Play ascending chord progression
  const celebrationNotes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
  celebrationNotes.forEach((frequency, index) => {
    setTimeout(() => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createOscillator(audioContext, frequency, {
          type: 'sine',
          duration: 0.4,
          volume: 0.1
        });
      } catch (error) {
        console.warn('Celebration sequence failed:', error);
      }
    }, index * 150);
  });
  
  // Add some sparkle effects
  setTimeout(() => {
    [800, 1000, 1200, 1000, 800].forEach((freq, i) => {
      setTimeout(() => {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          createOscillator(audioContext, freq, {
            type: 'triangle',
            duration: 0.1,
            volume: 0.06
          });
        } catch (error) {
          console.warn('Sparkle effect failed:', error);
        }
      }, i * 100);
    });
  }, 800);
};

// Check if audio is supported
export const isAudioSupported = () => {
  try {
    return !!(window.AudioContext || window.webkitAudioContext);
  } catch (error) {
    return false;
  }
};

// Get audio context state (for debugging)
export const getAudioContextState = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return audioContext.state;
  } catch (error) {
    return 'unsupported';
  }
};
