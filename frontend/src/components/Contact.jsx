import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('تم إرسال استشارتك بنجاح! سنتواصل معك قريباً.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'العنوان',
      content: 'الجزائر العاصمة، دائرة القضاء'
    },
    {
      icon: 'fas fa-phone',
      title: 'الهاتف',
      content: '+213 123 456 789'
    },
    {
      icon: 'fas fa-envelope',
      title: 'البريد الإلكتروني',
      content: 'info@ghout-ousra.dz'
    },
    {
      icon: 'fas fa-clock',
      title: 'أوقات العمل',
      content: 'الأحد - الخميس: 8:00 - 16:00'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">اتصل بنا</h2>
        <p className="section-subtitle">نحن هنا لمساعدتك في أي استفسار قانوني</p>

        <div className="contact-content">
          <div className="contact-info">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">
                  <i className={info.icon}></i>
                </div>
                <div className="contact-text">
                  <h4>{info.title}</h4>
                  <p>{info.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر نوع الاستشارة</option>
                  <option value="marriage">قضايا الزواج</option>
                  <option value="divorce">قضايا الطلاق</option>
                  <option value="custody">الحضانة والنفقة</option>
                  <option value="inheritance">الميراث</option>
                  <option value="other">استشارة أخرى</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="تفاصيل الاستشارة..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn primary">
                <i className="fas fa-paper-plane"></i>
                إرسال الاستشارة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;