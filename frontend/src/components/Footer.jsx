import React from 'react';

const Footer = ({ scrollToSection }) => {
  const footerSections = [
    {
      title: 'روابط سريعة',
      links: [
        { label: 'الرئيسية', id: 'home' },
        { label: 'الخدمات', id: 'services' },
        { label: 'القوانين', id: 'laws' },
        { label: 'المساعد', id: 'chatbot' },
        { label: 'المصادر', id: 'resources' }
      ]
    },
    {
      title: 'الخدمات',
      links: [
        { label: 'استشارات الزواج', id: 'services' },
        { label: 'قضايا الطلاق', id: 'services' },
        { label: 'الحضانة والنفقة', id: 'services' },
        { label: 'الميراث', id: 'services' },
        { label: 'حقوق المرأة', id: 'services' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">⚖️</div>
              <span className="logo-text">غُفْت أُسْرَة</span>
            </div>
            <p className="footer-description">
              منصة قانونية متكاملة تهدف إلى توعية المواطن الجزائري بحقوقه القانونية 
              في مجال الأحوال الشخصية والقانون العائلي.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-section">
            <h4>النشرة البريدية</h4>
            <p>اشترك لتصلك آخر التحديثات القانونية</p>
            <form className="newsletter-form">
              <input type="email" placeholder="بريدك الإلكتروني" required />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 غُفْت أُسْرَة. جميع الحقوق محفوظة.</p>
          <div className="footer-bottom-links">
            <a href="#">سياسة الخصوصية</a>
            <a href="#">شروط الاستخدام</a>
            <a href="#">إخلاء المسؤولية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;