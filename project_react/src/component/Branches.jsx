import React from 'react';
import LinkBranche from '../../public/Pictures/Branche/חנות.png';
import '../styles/DesignBranche.css';

export default function Branche() {
  return (
    <section className="branches-section">
      <div className="container">
        <div className="image-wrapper">
          <img src={LinkBranche} alt="LinkBranche" className="main-image" />
        </div>

        <div className="branches">
          <div className="branch-card">
            <h3>סניף תל אביב</h3>
            <p>רחוב דיזנגוף 100, תל אביב</p>
            <p>מייל: telaviv@branche.com</p>
            <p>טלפון: 03-1234567</p>
            <p>שעות פעילות: א'-ה' 9:00-18:00, ו' 9:00-14:00</p>
          </div>

          <div className="branch-card">
            <h3>סניף ירושלים</h3>
            <p>רחוב יפו 50, ירושלים</p>
            <p>מייל: jerusalem@branche.com</p>
            <p>טלפון: 02-7654321</p>
            <p>שעות פעילות: א'-ה' 9:00-18:00, ו' 9:00-14:00</p>
          </div>

          <div className="branch-card">
            <h3>סניף חיפה</h3>
            <p>שדרות בן גוריון 20, חיפה</p>
            <p>מייל: haifa@branche.com</p>
            <p>טלפון: 04-1122334</p>
            <p>שעות פעילות: א'-ה' 9:00-18:00, ו' 9:00-14:00</p>
            <p>שבת סגור</p>
          </div>

          <div className="branch-card">
            <h3>סניף ראשון לציון</h3>
            <p>רחוב הרצל 25, ראשון לציון</p>
            <p>מייל: rishon@branche.com</p>
            <p>טלפון: 03-9988776</p>
            <p>שעות פעילות: א'-ה' 9:00-18:00, ו' 9:00-14:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
