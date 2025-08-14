import React from 'react';
import '../styles/DesignHeader.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // הוספתי useLocation
import { useSelector } from 'react-redux';
import IconSearchProduct from '../component/Header/IconInputSearch.jsx'
import Logo from '../component/Header/Logo.jsx'
import IconButtonWithBadge from '../component/Header/IconButtonWithBadge.jsx';
import imageUser from '../../public/Pictures/HomePage/icons8-user-50.png';
import Categories from '../pages/Categories/Menu.jsx';
import SettingsIcon from '@mui/icons-material/Settings';
// הוסר ייבוא של SearchProduct כי כבר לא צריך לקרוא אותו כאן

export default function Header() {
  
  const currentUser = useSelector((state) => state.users.currentUser);
  console.log('Home Page: ', currentUser)
  const navigate = useNavigate();
  const location = useLocation(); // הוספתי
// console.log("HEADER location", location);

  // פונקציה לפתיחת מודאל חיפוש ע"י ניווט לנתיב searchproduct עם background
const openSearch = () => {
  setTimeout(() => {
   navigate("/searchproduct", { state: { background: location } });
  }, 0);
};

  return (
    <div className="header-design" style={{ padding: '10px', backgroundColor: '#e8e2d9' }}>
      <Categories />

      {/* לוגו האתר */}
      <Link to="/">
        <Logo altText="לוגו האתר" className="Logo" />
      </Link>
      
      <div className='icons-left-container'>
        {currentUser?.role === 'manager' && (
          <Link to="/Admin" className="settings-button" title="הגדרות">
            <SettingsIcon 
              style={{ 
                fontSize: '38px', 
                color: 'transparent',
                stroke: '#333',
                strokeWidth: 1.5
              }} 
            />
          </Link>
        )}
        <Link to="/login" className="login-register-button">
          <img src={imageUser} alt="User Icon" className="login-register-icon" />
        </Link>

        <button
          onClick={openSearch}
          className="search-button"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <IconSearchProduct />
        </button>

        <Link to="/shopcart" className="shope-button">
          <IconButtonWithBadge />
        </Link>
      </div>
    </div>
  );
}
