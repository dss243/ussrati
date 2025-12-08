import React, { useState } from 'react';

const Laws = () => {
  const [activeTab, setActiveTab] = useState('family-law');

  const tabs = [
    { id: 'family-law', label: 'قانون الأسرة' },
    { id: 'civil-law', label: 'القانون المدني' },
    { id: 'procedural-law', label: 'قانون الإجراءات' }
  ];

  const lawsData = {
    'family-law': [
      {
        title: 'المواد 4-10: شروط الزواج',
        description: 'تنظيم شروط صحة عقد الزواج من حيث الرضا، الأهلية، الولي، والشهود.'
      },
      {
        title: 'المواد 48-58: الطلاق',
        description: 'تنظيم أنواع الطلاق وإجراءاته وآثاره على الزوجين والأولاد.'
      },
      {
        title: 'المواد 62-74: الحضانة',
        description: 'تحديد شروط الحاضن وحقوق الأولاد ومدة الحضانة.'
      },
      {
        title: 'المواد 75-83: النفقة',
        description: 'تنظيم وجوب النفقة وكيفية حسابها وطرق المطالبة بها.'
      }
    ],
    'civil-law': [
      {
        title: 'المواد 40-60: الأهلية',
        description: 'تنظيم الأهلية القانونية والتمييز والوصاية.'
      },
      {
        title: 'المواد 714-730: الميراث',
        description: 'قواعد توزيع الميراث وفق الشريعة الإسلامية.'
      }
    ],
    'procedural-law': [
      {
        title: 'قانون الإجراءات المدنية',
        description: 'الإجراءات المتبعة في رفع الدعاوى والمذكرات القضائية.'
      }
    ]
  };

  return (
    <section id="laws" className="Page laws">
      <div className="container">
        <h2 className="section-title">القوانين والتشريعات</h2>
        <p className="section-subtitle">أهم القوانين المنظمة للأسرة في التشريع الجزائري</p>

        <div className="laws-tabs">
          <div className="tab-buttons">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`tab-pane ${activeTab === tab.id ? 'active' : ''}`}
                id={tab.id}
              >
                <div className="law-articles">
                  {lawsData[tab.id].map((article, index) => (
                    <div key={index} className="law-article">
                      <h4>{article.title}</h4>
                      <p>{article.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Laws;