import React from 'react';

const Hero = ({ scrollToSection }) => {
  const floatingCards = [
    { icon: 'fas fa-ring', label: 'الزواج', delay: 0 },
    { icon: 'fas fa-heart-crack', label: 'الطلاق', delay: 1 },
    { icon: 'fas fa-child', label: 'الحضانة', delay: 2 },
    { icon: 'fas fa-money-bill-wave', label: 'النفقة', delay: 1.5 }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-main"> الغرفة أُسْرَة</span>
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
        
        <div className="hero-image">
          {floatingCards.map((card, index) => (
            <div 
              key={index}
              className={`floating-card card-${index + 1}`}
              style={{ animationDelay: `${card.delay}s` }}
              onClick={() => scrollToSection('services')}
            >
              <i className={card.icon}></i>
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;