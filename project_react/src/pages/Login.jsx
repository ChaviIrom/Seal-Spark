import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/Action/usersAction';
import '../styles/DesigenLoginRegister.css';
import SuccessPopup from '../pages/SuccessPopup.jsx';

export default function Login() {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(id));
      setShowSuccess(true); 
      setTimeout(() => navigate('/'), 3000); 

    } catch (error) {
      alert(error.message || 'שגיאת התחברות');
    }
  };

  return (
    <div className="authPageWrapper">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>התחברות</h2>

        <input
          type="text"
          id="id"
          placeholder="מספר מזהה"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <button type="submit">התחבר</button>

        <p>
          אין לך משתמש? <Link to="/register">הירשם כאן</Link>
        </p>
      </form>
      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="התחברת בהצלחה!"
      />
    </div>
  );
}
