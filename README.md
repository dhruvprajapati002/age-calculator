# 🎂 Age Calculator - Modern React App

A beautiful, interactive age calculator built with React, Vite, Tailwind CSS, and Framer Motion. Calculate your exact age with stunning animations and discover fascinating facts about your life journey!

![Age Calculator Preview](https://your-deployed-url.vercel.app/preview.png)

## ✨ Features

### 🎯 Core Functionality
- **Precise Age Calculation** - Years, months, days, hours, minutes, seconds
- **Birthday Detection** - Special celebration when it's your birthday
- **Next Birthday Countdown** - Days remaining until your next birthday
- **Life Statistics** - Comprehensive overview of time lived

### 🔮 Zodiac & Astrology
- **Western Zodiac** - Complete zodiac sign with traits and elements
- **Chinese Zodiac** - Traditional Chinese astrology with animal signs
- **Interactive Profiles** - Detailed personality traits and compatibility

### 🏆 Life Milestones
- **Achievement Tracking** - Completed and upcoming life milestones
- **Progress Visualization** - Beautiful progress bars and charts
- **Custom Milestones** - Personalized achievement system

### 🎯 Fun Facts
- **Amazing Statistics** - Heartbeats, breaths, Earth orbits, and more
- **Life Phases** - Childhood, youth, adulthood analysis
- **Seasonal Data** - Seasons experienced and lunar cycles
- **Interactive Categories** - Filter facts by different themes

### 🎨 Modern Design
- **Dark/Light Mode** - Seamless theme switching
- **Glassmorphism UI** - Modern frosted glass effects
- **Smooth Animations** - Framer Motion powered interactions
- **Responsive Design** - Perfect on all devices
- **Accessibility** - WCAG compliant design

### 🔊 Enhanced UX
- **Sound Effects** - Optional audio feedback
- **Share Results** - Social sharing capabilities
- **Confetti Celebrations** - Birthday animations
- **Interactive Elements** - Hover effects and micro-interactions

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons & Emojis**: Native Unicode
- **Deployment**: Vercel
- **Containerization**: Docker

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20+ or 22.12+
- npm or yarn
- Git

### Local Development

Clone the repository
git clone https://github.com/yourusername/age-calculator.git
cd age-calculator
Install dependencies
npm install

Start development server
npm run dev

Open http://localhost:5173

### Build for Production

Build the project
npm run build

Preview production build
npm run preview

### Docker Setup

Build Docker image
docker build -t age-calculator .

Run container
docker run -p 3000:80 age-calculator

Or use docker-compose
docker-compose up

## 🎮 Usage

1. **Enter Your Birth Date** - Select your birthday from the date picker
2. **Calculate** - Click the "Calculate My Age" button
3. **Explore Results** - Navigate through different tabs:
   - **Overview**: Basic statistics and life overview
   - **Milestones**: Completed achievements and next goals
   - **Zodiac**: Western and Chinese astrology profiles
   - **Fun Facts**: Amazing statistics and interesting data
4. **Share** - Use the share button to share your results
5. **Customize** - Switch themes and enable/disable sound effects

## ⚙️ Configuration

### Environment Variables


## 🎨 Customization

### Adding New Milestones

/ src/utils/ageCalculations.js
const milestones = [
{ age: 1, event: "First Birthday", emoji: "👶" },
{ age: 5, event: "Started School", emoji: "🎒" },
// Add your custom milestones here
{ age: 25, event: "Quarter Century", emoji: "💼" }
];

### Custom Themes

/* src/styles/index.css */
:root {
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--accent-color: #8b5cf6;
--background-light: #ffffff;
--background-dark: #1a1a1a;

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Perfect layout for tablets
- **Desktop Enhanced**: Full desktop experience
- **Touch Interactions**: Gesture support

## ♿ Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Excellent color contrast ratios
- **Focus Indicators**: Clear focus states
- **Semantic HTML**: Proper HTML structure

## 🚀 Performance

- **Lighthouse Score**: 95+ performance score
- **Bundle Size**: Optimized with tree shaking
- **Lazy Loading**: Code splitting for faster loads
- **Image Optimization**: Efficient asset loading
- **Caching**: Service worker ready

## 🔧 Development

### Available Scripts

Development
npm run dev # Start dev server
npm run build # Build for production
npm run preview # Preview production build
npm run lint # Run ESLint
npm run lint:fix # Fix ESLint errors

Docker
npm run docker:build # Build Docker image
npm run docker:run # Run Docker container
npm run docker:dev # Development with Docker

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Build fails with Node version error**
Solution: Use Node 20+
nvm use 20
npm run build