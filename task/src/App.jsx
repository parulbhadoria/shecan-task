import HeroSection from "./components/HeroSection";
import ContactForm from "./components/ContactForm";

import "./styles/app.css";

import { ToastContainer } from "react-toastify";

import { useState } from "react";

import bgImage from "./assets/bg.jpg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
  className={darkMode ? "app-container dark" : "app-container"}
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(0,0,0,0.55),
        rgba(0,0,0,0.55)
      ),
      url(${bgImage})
    `
  }}
>
      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {
          darkMode ? "☀️ Light" : "🌙 Dark"
        }
</button>

      <HeroSection />

      <ContactForm />

      <ToastContainer />

    </div>
  );
}

export default App;