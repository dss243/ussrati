import React from 'react';

const Hero = ({ scrollToSection }) => {
  

  return (
    <section id="home" className=" hero">
      <div className="Page hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            
            <span className="title-main">اسرتي </span>
            <span className="title-sub">المساعد القانوني العائلي الجزائري</span>
          </h1>
          <p className="hero-description">
            منصة متكاملة لتقديم الاستشارات القانونية في مجال الأحوال الشخصية والقانون العائلي الجزائري. 
            نوفر لك المعلومات والإرشادات اللازمة لحماية حقوقك وحقوق أسرتك.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn primary" 
              onClick={() => scrollToSection('chatbot')}
            >
              <i className="fas fa-robot"></i>
              تحدث مع المساعد
            </button>
            <button 
              className="btn secondary"
              onClick={() => scrollToSection('laws')}
            >
              <i className="fas fa-book"></i>
              استعرض القوانين
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">قضية مستفادة</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">مادة قانونية</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">دعم متواصل</div>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default Hero;