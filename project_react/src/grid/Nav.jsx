
import CustomerFeedback from '../pages/CustomerFeedback.jsx'
import '../styles/designNav.css';
import '../App.css'

export default function Nav() {

  return (
    <>
<div className="welcome-container">
  <div className="welcome-text">
    <h2 style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>ברוכים הבאים ל-SEAL SPARK</h2>
    <p>
      ברוכים הבאים לעולם שבו כל מתנה הופכת לחוויה. <br />
      ב-SEAL SPARK אנחנו לא רק אורזים מתנות – אנחנו אורזים רגעים, רגשות וזיכרונות.
      אצלנו תמצאו מתנות עם משמעות, עיצוב אישי ואיכות ללא פשרות.
      <br /><br />
      מחפשים מתנה מושלמת ליום הולדת, לחג, או סתם כי בא לכם לפנק מישהו שאתם אוהבים?
      אתם במקום הנכון. <br />
      הצוות שלנו כאן כדי לעזור לכם ליצור את הרגע המיוחד הבא שלכם.
    </p>
  </div>
    <img
    className="welcome-image"
    src="../pictures/HomePage/עמוד הבית 1.png"
    alt="תמונה של מתנות"
  />
</div>
  <CustomerFeedback />
  </>
  );
}

  