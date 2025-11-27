import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-ring',
      title: 'قضايا الزواج',
      description: 'استشارات حول شروط الزواج، حقوق الزوجين، المشاكل الأسرية، وحلولها وفق القانون الجزائري',
      features: ['شروط عقد الزواج', 'حقوق وواجبات الزوجين', 'حل النزاعات الأسرية']
    },
    {
      icon: 'fas fa-heart-crack',
      title: 'قضايا الطلاق',
      description: 'إجراءات الطلاق بأنواعه، الخلع، التطليق للضرر، والحقوق المترتبة على الطلاق',
      features: ['الطلاق الرجعي والبائن', 'الخلع والتطليق', 'إجراءات المحكمة']
    },
    {
      icon: 'fas fa-child',
      title: 'الحضانة والنفقة',
      description: 'تنظيم شروط الحضانة، حقوق الأولاد، حساب النفقة، وآليات التنفيذ',
      features: ['شروط الحاضن', 'حساب النفقة', 'حقوق الزيارة']
    },
    {
      icon: 'fas fa-scale-balanced',
      title: 'الميراث والوصية',
      description: 'توزيع الميراث حسب الشريعة الإسلامية والقانون الجزائري، وشروط الوصية الصحيحة',
      features: ['توزيع الأنصبة', 'شروط الوصية', 'إجراءات القسمة']
    },
    {
      icon: 'fas fa-female',
      title: 'حقوق المرأة',
      description: 'حماية حقوق المرأة في القانون الجزائري، الحقوق المالية، والحماية من العنف',
      features: ['الحقوق المالية', 'الحماية القانونية', 'مكافحة العنف']
    },
    {
      icon: 'fas fa-file-contract',
      title: 'مستندات قانونية',
      description: 'نماذج وصيغ للمستندات القانونية المختلفة مع شرح كيفية تعبئتها واستخدامها',
      features: ['نماذج عقود', 'طلبات المحكمة', 'مستندات الأحوال']
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">خدماتنا القانونية</h2>
        <p className="section-subtitle">نقدم مجموعة شاملة من الخدمات القانونية المتخصصة في القضايا العائلية</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;