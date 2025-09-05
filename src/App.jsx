// src/App.jsx
import AgeCalculator from './components/AgeCalculator';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AgeCalculator />
    </ThemeProvider>
  );
}

export default App;
