// src/utils/ageCalculations.js

export const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  // Basic age calculation
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Total time calculations
  const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Next birthday calculation
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

  // Check if today is birthday
  const isBirthdayToday = daysToNextBirthday === 0 || daysToNextBirthday === 365;

  // Western Zodiac Signs
  const zodiacSigns = [
    { 
      name: "Capricorn", 
      emoji: "♑", 
      dates: [[12, 22], [1, 19]], 
      traits: ["Ambitious", "Practical", "Disciplined"], 
      element: "Earth", 
      color: "bg-amber-600" 
    },
    { 
      name: "Aquarius", 
      emoji: "♒", 
      dates: [[1, 20], [2, 18]], 
      traits: ["Independent", "Innovative", "Humanitarian"], 
      element: "Air", 
      color: "bg-blue-500" 
    },
    { 
      name: "Pisces", 
      emoji: "♓", 
      dates: [[2, 19], [3, 20]], 
      traits: ["Compassionate", "Artistic", "Intuitive"], 
      element: "Water", 
      color: "bg-teal-500" 
    },
    { 
      name: "Aries", 
      emoji: "♈", 
      dates: [[3, 21], [4, 19]], 
      traits: ["Energetic", "Courageous", "Leadership"], 
      element: "Fire", 
      color: "bg-red-500" 
    },
    { 
      name: "Taurus", 
      emoji: "♉", 
      dates: [[4, 20], [5, 20]], 
      traits: ["Reliable", "Patient", "Determined"], 
      element: "Earth", 
      color: "bg-green-600" 
    },
    { 
      name: "Gemini", 
      emoji: "♊", 
      dates: [[5, 21], [6, 20]], 
      traits: ["Adaptable", "Curious", "Communicative"], 
      element: "Air", 
      color: "bg-yellow-500" 
    },
    { 
      name: "Cancer", 
      emoji: "♋", 
      dates: [[6, 21], [7, 22]], 
      traits: ["Nurturing", "Emotional", "Protective"], 
      element: "Water", 
      color: "bg-gray-500" 
    },
    { 
      name: "Leo", 
      emoji: "♌", 
      dates: [[7, 23], [8, 22]], 
      traits: ["Confident", "Generous", "Creative"], 
      element: "Fire", 
      color: "bg-orange-500" 
    },
    { 
      name: "Virgo", 
      emoji: "♍", 
      dates: [[8, 23], [9, 22]], 
      traits: ["Analytical", "Helpful", "Perfectionist"], 
      element: "Earth", 
      color: "bg-indigo-600" 
    },
    { 
      name: "Libra", 
      emoji: "♎", 
      dates: [[9, 23], [10, 22]], 
      traits: ["Diplomatic", "Balanced", "Social"], 
      element: "Air", 
      color: "bg-pink-500" 
    },
    { 
      name: "Scorpio", 
      emoji: "♏", 
      dates: [[10, 23], [11, 21]], 
      traits: ["Intense", "Mysterious", "Transformative"], 
      element: "Water", 
      color: "bg-purple-600" 
    },
    { 
      name: "Sagittarius", 
      emoji: "♐", 
      dates: [[11, 22], [12, 21]], 
      traits: ["Adventurous", "Philosophical", "Optimistic"], 
      element: "Fire", 
      color: "bg-violet-600" 
    }
  ];

  // Find zodiac sign
  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  
  const zodiac = zodiacSigns.find(sign => {
    const [[startMonth, startDay], [endMonth, endDay]] = sign.dates;
    return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
  }) || zodiacSigns[0]; // Default to Capricorn if not found

  // Chinese Zodiac calculation
  const chineseZodiacAnimals = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", 
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
  ];
  const birthYear = birth.getFullYear();
  const chineseZodiacIndex = (birthYear - 1900) % 12;
  const chineseSign = chineseZodiacAnimals[chineseZodiacIndex];

  // Life Milestones
  const milestones = [
    { age: 1, event: "First Birthday", emoji: "👶" },
    { age: 5, event: "Started School", emoji: "🎒" },
    { age: 10, event: "Double Digits", emoji: "🔟" },
    { age: 13, event: "Teenager", emoji: "🧒" },
    { age: 16, event: "Sweet Sixteen", emoji: "🎂" },
    { age: 18, event: "Legal Adult", emoji: "🎓" },
    { age: 21, event: "Legal Drinking Age", emoji: "🍺" },
    { age: 25, event: "Quarter Century", emoji: "💼" },
    { age: 30, event: "Thirty & Thriving", emoji: "🌟" },
    { age: 35, event: "Mid-Thirties", emoji: "🏠" },
    { age: 40, event: "Fabulous Forty", emoji: "💪" },
    { age: 45, event: "Mid-Life", emoji: "🚗" },
    { age: 50, event: "Half Century", emoji: "🎊" },
    { age: 55, event: "Pre-Retirement", emoji: "🎯" },
    { age: 60, event: "Senior Citizen", emoji: "👴" },
    { age: 65, event: "Retirement Age", emoji: "🏖️" },
    { age: 70, event: "Septuagenarian", emoji: "🎖️" },
    { age: 75, event: "Platinum Age", emoji: "💎" },
    { age: 80, event: "Octogenarian", emoji: "🏆" },
    { age: 90, event: "Nonagenarian", emoji: "👑" },
    { age: 100, event: "Century Club", emoji: "🥇" }
  ];

  const completedMilestones = milestones.filter(m => years >= m.age);
  const nextMilestone = milestones.find(m => years < m.age);

  // Generation classification
  const getGeneration = (birthYear) => {
    if (birthYear >= 2013) return "Generation Alpha";
    if (birthYear >= 1997) return "Generation Z";
    if (birthYear >= 1981) return "Millennial";
    if (birthYear >= 1965) return "Generation X";
    if (birthYear >= 1946) return "Baby Boomer";
    if (birthYear >= 1928) return "Silent Generation";
    return "Greatest Generation";
  };

  const generation = getGeneration(birthYear);

  // Birth day of the week
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const birthDayOfWeek = dayNames[birth.getDay()];

  // Life percentage (assuming average lifespan of 80 years)
  const averageLifespan = 80;
  const ageInYears = years + (months / 12) + (days / 365);
  const percentage = Math.min((ageInYears / averageLifespan) * 100, 100);

  // Additional calculations
  const ageInMonths = years * 12 + months;
  const ageInWeeks = Math.floor(totalDays / 7);
  
  // Fun calculations
  const estimatedHeartbeats = Math.floor(totalMinutes * 70); // ~70 beats per minute
  const estimatedBreaths = Math.floor(totalMinutes * 15); // ~15 breaths per minute
  const earthOrbits = parseFloat((totalDays / 365.25).toFixed(2));
  const moonCycles = Math.floor(totalDays / 29.5); // ~29.5 days per lunar cycle
  
  // Life phases
  const getLifePhase = (age) => {
    if (age < 2) return "Infant";
    if (age < 4) return "Toddler";
    if (age < 13) return "Child";
    if (age < 20) return "Teenager";
    if (age < 40) return "Young Adult";
    if (age < 65) return "Middle-Aged";
    return "Senior";
  };

  const currentLifePhase = getLifePhase(years);

  // Special age calculations
  const isLeapYear = (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  const leapYearsLived = [];
  for (let year = birthYear; year <= today.getFullYear(); year++) {
    if (isLeapYear(year)) leapYearsLived.push(year);
  }

  // Seasonal calculations
  const seasonsExperienced = Math.floor(totalDays / 365.25 * 4);
  
  return {
    // Basic age
    years,
    months,
    days,
    
    // Total time lived
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    totalSeconds,
    
    // Birthday information
    daysToNextBirthday,
    isBirthdayToday,
    birthDayOfWeek,
    nextBirthday: nextBirthday.toDateString(),
    
    // Zodiac information
    zodiac,
    chineseSign,
    
    // Milestones
    completedMilestones,
    nextMilestone,
    
    // Demographics
    generation,
    currentLifePhase,
    
    // Calculations
    ageInMonths,
    ageInWeeks,
    percentage,
    earthOrbits,
    
    // Fun facts
    estimatedHeartbeats,
    estimatedBreaths,
    moonCycles,
    seasonsExperienced,
    leapYearsLived: leapYearsLived.length,
    leapYearsList: leapYearsLived,
    
    // Additional metadata
    birthYear,
    currentYear: today.getFullYear(),
    daysUntilNextLeapYear: (() => {
      let nextLeapYear = birthYear;
      while (!isLeapYear(nextLeapYear) || nextLeapYear <= today.getFullYear()) {
        nextLeapYear++;
      }
      const nextLeapDate = new Date(nextLeapYear, 1, 29); // Feb 29
      return Math.ceil((nextLeapDate - today) / (1000 * 60 * 60 * 24));
    })(),
    
    // Century and decade information
    centuriesSurvived: Math.floor(years / 100),
    decadesSurvived: Math.floor(years / 10),
    
    // Sleep estimates (assuming 8 hours per day)
    estimatedHoursSlept: Math.floor(totalDays * 8),
    estimatedDaysSlept: Math.floor(totalDays * 8 / 24),
    
    // Work estimates (assuming 8 hours/day, 5 days/week from age 18-65)
    estimatedWorkHours: (() => {
      const workStartAge = 18;
      const retirementAge = 65;
      const workYears = Math.max(0, Math.min(years - workStartAge, retirementAge - workStartAge));
      return Math.floor(workYears * 52 * 5 * 8); // 52 weeks, 5 days, 8 hours
    })(),
    
    // Educational estimates
    estimatedSchoolDays: (() => {
      const schoolStartAge = 5;
      const schoolEndAge = 18;
      const schoolYears = Math.max(0, Math.min(years - schoolStartAge, schoolEndAge - schoolStartAge));
      return Math.floor(schoolYears * 180); // ~180 school days per year
    })()
  };
};
