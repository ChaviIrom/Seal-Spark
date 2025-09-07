import React, { useState } from 'react';
import '../../../styles/DesignContactUs.css';
import imageContact from './pictures/ConcatUs/ContactUsImage.png';
import IconPhone from './pictures/ConcatUs/טלפון.png';
import IconEmail from './pictures/ConcatUs/מייל.png';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../../redux/actions/contactUsAction';

export default function ContactUs() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.currentUser);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone) return;
    dispatch(addContact({ name, phone }));
    setSubmitted(true);
    setName('');
    setPhone('');
  };

  return (
    <div className="main-contact-layout">
      <div className="left-image-side">
        <img src={imageContact} alt="צד" width={700} height={450} />
      </div>

      <div className="right-content">
        {/* קונטיינר טופס + הודעות */}
        <div className="form-wrapper">
          <div className="form-section">
            <h2 className='form-text'>?מעדיפים שנחזור אליכם</h2>

            <input
              className='form-text-input'
              type="text"
              placeholder="שם"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='form-text-input'
              type="tel"
              placeholder="טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className='form-button' onClick={handleSubmit}>שליחה</button>
          </div>

          {/* הודעות */}
          <div className="message-container">
            {submitted && currentUser && (
              <div className="success-message">
                <h3>✅ הפנייה התקבלה בהצלחה!</h3>
                <p>צוות <strong>SEAL SPARK</strong> יחזור אליכם בהקדם.</p>
              </div>
            )}
            {submitted && !currentUser && (
              <div className="not-logged-in-message">
                <h2>🔒 על מנת לשלוח פנייה, יש להתחבר למערכת.</h2>
              </div>
            )}
          </div>
        </div>

        {/* אייקונים */}
        <div className="contact-icons-container">
          <h1 className="contact-header">יצירת קשר</h1>
          <div className="contact-icon-line">
            <span className="contact-text">0549950505</span>
            <img src={IconPhone} alt="טלפון" />
          </div>
          <div className="contact-icon-line">
            <span className="contact-text">officsealspark@gmail.com</span>
            <img src={IconEmail} alt="מייל" />
          </div>
        </div>
      </div>
    </div>
  );
}
