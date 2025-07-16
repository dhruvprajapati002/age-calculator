// src/components/AgeCalculator.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./AgeCalculator.css";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [nextBirthday, setNextBirthday] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.className = savedMode ? "dark" : "";
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      document.body.className = !prev ? "dark" : "";
      return !prev;
    });
  };

  const calculateNextBirthday = (dob) => {
    const birth = new Date(dob);
    const now = new Date();
    let next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (now > next) {
      next.setFullYear(now.getFullYear() + 1);
    }
    const diff = next - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getZodiac = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "♈ Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "♉ Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "♊ Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "♋ Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "♌ Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "♍ Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "♎ Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "♏ Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "♐ Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "♑ Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "♒ Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "♓ Pisces";
  };

  const getBirthstone = (month) => {
    const stones = ["", "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"];
    return stones[month];
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const checkBirthdayToday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return (
      birthDate.getDate() === today.getDate() &&
      birthDate.getMonth() === today.getMonth()
    );
  };

  const getNextMilestone = (years) => {
    const next = [18, 21, 30, 50].find((m) => m > years);
    return next ? `🎯 ${next - years} years until you turn ${next}` : "🎉 You're a legend!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dob) return;
    const res = await axios.post("https://age-calculator-5e3i.onrender.com/api/calculate-age", { dob });
    setAge(res.data);
    setNextBirthday(calculateNextBirthday(dob));

    if (checkBirthdayToday(dob)) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
      speak("Happy Birthday!");
    } else {
      speak(`You are ${res.data.years} years old.`);
    }
  };

  return (
    <div className={`age-calculator-container ${darkMode ? "dark" : ""}`}>
      <motion.div
        className="age-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="top-bar">
          <h1 className="title">🎂 Age Calculator</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <button type="submit">Calculate</button>
        </form>

        {age && (
          <motion.div
            className="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2>You're</h2>
            <p>
              <strong>{age.years}</strong> years,
              <strong> {age.months}</strong> months,
              <strong> {age.days}</strong> days old!
            </p>
            <p>{getNextMilestone(age.years)}</p>
          </motion.div>
        )}

        {nextBirthday !== null && (
          <motion.div
            className="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>🎉 Your next birthday is in <strong>{nextBirthday}</strong> days!</p>
          </motion.div>
        )}

        {dob && (
          <div className="zodiac">
            <p>🔮 Zodiac Sign: <strong>{getZodiac(dob)}</strong></p>
            <p>💎 Birthstone: <strong>{getBirthstone(new Date(dob).getMonth() + 1)}</strong></p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
