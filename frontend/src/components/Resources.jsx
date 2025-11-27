import React from 'react';

const Resources = () => {
  const resources = [
    {
      icon: 'fas fa-download',
      title: 'نموذج عقد زواج',
      description: 'نموذج معياري لعقد الزواج وفق القانون الجزائري'
    },
    {
      icon: 'fas fa-download',
      title: 'طلب نفقة',
      description: 'نموذج طلب نفقة للأولاد والزوجة'
    },
    {
      icon: 'fas fa-download',
      title: 'دعوى حضانة',
      description: 'نموذج دعوى للمطالبة بالحضانة'
    },
    {
      icon: 'fas fa-book',
      title: 'دليل الحقوق',
      description: 'دليل شامل لحقوق المرأة والأسرة في القانون'
    }
  ];

  return (
    <section id="resources" className="resources">
      <div className="container">
        <h2 className="section-title">مصادر ومستندات</h2>
        <p className="section-subtitle">مراجع قانونية ووثائق مهمة للتحميل</p>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-icon">
                <i className={resource.icon}></i>
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button className="btn download-btn">
                <i className="fas fa-download"></i>
                تحميل النموذج
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;