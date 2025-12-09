import React, { useState } from 'react';

const Navbar = ({ currentSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'laws', label: 'القوانين' },
    { id: 'chatbot', label: 'المساعد' },
    { id: 'contact', label: 'اتصل بنا' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-logo">
          <div className="logo-icon">
            <img 
              src="/logo.png"
              alt="Logo"
              className="logo-img"
            />
          </div>
          <span className='logo-text'></span>
        </div>

        {/* MENU */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <a 
                href={`#${item.id}`}
                className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* BURGER MENU */}
        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
