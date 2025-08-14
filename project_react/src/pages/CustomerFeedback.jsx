import React, { useState, useEffect } from 'react';
import '../styles/CustomerFeedback.css';

const testimonials = [
  { id: 1, name: "דני לוי", text: "חוויה מעולה! שירות מצוין ומוצרים איכותיים." },
  { id: 2, name: "רונית כהן", text: "המוצר הגיע מהר וארוז יפה. ממליצה בחום!" },
  { id: 3, name: "אלי בר", text: "תודה על יחס אישי ומענה מהיר, אקנה שוב!" },
  { id: 4, name: "מירב שלום", text: "אהבתי את האפשרות להתאים אישית את המתנה." },
  { id: 5, name: "חיים בן צור", text: "אתר נוח, קל למצוא מה שרוצים, מחירים מעולים!" },
  { id: 6, name: "שרה אוחיון", text: "השירות היה מעל ומעבר. תודה רבה!" },
  { id: 7, name: "יוסי פרץ", text: "מבחר ענק של מתנות! בטוח אחזור שוב." },
  { id: 8, name: "עדי לוי", text: "כל מי שראה את המתנה התלהב. תודה לכם!" },
];

export default function CustomerFeedback() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 4) % testimonials.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? testimonials.length - 4 : prev - 4
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000); // כל 10 שניות

    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 4);

  return (
    <div className="grid-container">
      <h2 className="grid-title">מה הלקוחות שלנו אומרים</h2>
      <div className="navigation-buttons">
        <button onClick={handlePrev}>‹</button>
        <button onClick={handleNext}>›</button>
      </div>
      <div className="testimonials-grid">
        {visibleTestimonials.map((t) => (
          <div className="testimonial-box" key={t.id}>
            <p className="testimonial-text">"{t.text}"</p>
            <p className="testimonial-author">- {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
