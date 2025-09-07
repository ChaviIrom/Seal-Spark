import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addUser } from '../redux/actions/usersAction.js'
import '../styles/DesigenLoginRegister.css';
import SuccessPopup from '../pages/SuccessPopup.jsx';

export default function Register() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    address: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData));
      setShowSuccess(true); // מציג פופאפ
      setTimeout(() => navigate('/'), 3000); // מנווט אחרי 3 שניות
    } catch (err) {
      alert('שגיאה בהרשמה');
    }
  };
  return (
    <div className="authPageWrapper">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>הרשמה למערכת</h2>

        <input name="id" placeholder="מזהה" onChange={handleChange} required />
        <input name="fullName" placeholder="שם מלא" onChange={handleChange} required />
        <input name="email" type="email" placeholder="אימייל" onChange={handleChange} required />
        <input name="address" placeholder="כתובת" onChange={handleChange} required />

        <button type="submit">הירשם</button>
      </form>

      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="נרשמת בהצלחה!"
      />
      
    </div>
  );
}
