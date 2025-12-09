import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-ring',
      title: 'الزواج والعقود',
      description: 'شروط الزواج، العقود، حقوق الزوجين والمهر'
    },
    {
      icon: 'fas fa-heart-crack',
      title: 'الطلاق والخلع',
      description: 'أسباب الطلاق، الخلع، الحقوق المالية والإجراءات القانونية'
    },
    {
      icon: 'fas fa-child-reaching',
      title: 'الحضانة وكفالة الأطفال',
      description: 'حقوق الحضانة، النفقة، زيارات الوالدين وأحكام المحاكم'
    }
  ];

  return (
    <section className="services">
      
      {/* 🔥 Logo instead of page title */}
      <div className="services-logo">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="services-logo-img"
        />
      </div>

      <div className="Page services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">
              <i className={service.icon}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
