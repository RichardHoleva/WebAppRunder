import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css';
import Logo from '../assets/Logo.png';

export default function OnBoardingSlider({ slides }) {
  const nav = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }

    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div 
      className="onboarding-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="onboarding-header">
        <div className="onboarding-image-bg">
          <img src={slides[currentSlide].backgroundImage} alt="Background" />
        </div>
        <div className="onboarding-image-overlay">
          <img src={slides[currentSlide].overlayImage} alt={slides[currentSlide].title} />
        </div>
        <div className="onboarding-logo">
          <img src={Logo} alt="Runder Logo" />
        </div>
      </div>

      <div className="onboarding-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="onboarding-content">
        <h3>{slides[currentSlide].title}</h3>
        {slides[currentSlide].description && (
          <p>{slides[currentSlide].description}</p>
        )}
      </div>
      
      <div className="onboarding-buttons">
        <button onClick={() => nav('/login')} className="btn-join">
          Sign in
        </button>
        
        <button onClick={() => nav('/register')} className="btn-signin">
          Join us
        </button>

      </div>
    </div>
  );
}