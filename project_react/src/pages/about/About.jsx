import React from 'react';
import Sramp from './sramp.jsx';
import '../../styles/designAbout.css';

export default function About() {
  return (

    <div className="about-container">
      <div className="about-text">
      <br></br>
      <br></br>
      <br></br>
        <h2>Seal Spark</h2>
        <p><strong>Seal Spark</strong> נולדה מתוך אהבה לפרטים הקטנים שעושים את כל ההבדל.</p>
        <p>אצלנו, מתנה היא לא רק חפץ – היא חותמת אישית של רגש, מחשבה ויצירתיות.</p>
        <p>בחרנו בשם <strong>Seal Spark</strong> כי הוא מבטא בדיוק את מה שאנחנו עושים:</p>
        <p><strong>Seal</strong> – כי כל מתנה אצלנו היא כמו חותמת אישית – ייחודית, מותאמת בדיוק למי שמקבל אותה, ונושאת משמעות עמוקה.</p>
        <p><strong>Spark</strong> – כי אנחנו מאמינים שלכל מתנה מגיע הניצוץ הזה, שמדליק חיוך, מרגש ומחבר בין אנשים.</p>
        <p>אנחנו מתמחים במתנות בעיצוב אישי, עם דגש על איכות, אסתטיקה וחוויה בלתי נשכחת.</p>
        <p>כל פריט באתר נבחר בקפידה וניתן להתאמה מלאה – כדי שתוכלו לומר בדיוק את מה שאתם מרגישים, בצורה היפה והמדויקת ביותר.</p>
        <p>ב-<strong>Spark</strong> אנחנו מאמינים שכשיש חותמת של אכפתיות, כל מתנה מקבלת ניצוץ מיוחד – כזה שמאיר רגעים ומרגש באמת.</p>
      </div>
      <div className='anima-sramp'>
      <Sramp></Sramp>
      </div>
    </div>
  );
}