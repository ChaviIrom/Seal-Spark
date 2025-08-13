import { Outlet, useLocation } from "react-router-dom";
import Header from '../Grid/header.jsx';
import Footer from '../Grid/footer.jsx';
import '../styles/DesignHeader.css';
import '../App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../Redux/Action/usersAction.js';

import SearchProduct from '../component/Header/searchProdect.jsx'; // ודאי שהנתיב נכון

export default function Root() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);

 useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const expiry = localStorage.getItem('tokenExpiry');

  // אם אין טוקן או פג תוקף → נקה
  if (!token || (expiry && Date.now() > Number(expiry))) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('isLoggedIn');
    return;
  }

  // אם יש טוקן תקף ואין משתמש בסטייט → שלוף מהשרת
  if (token && !currentUser) {
    dispatch(fetchCurrentUser());}
    
  }, [dispatch, currentUser]);

  return (
    <>
      <main className="app-container main-content">
        <Header />
        {/* מציג את העמוד הרגיל (או רקע) */}
        <Outlet location={background || location} />
      </main>
      <Footer />

      {/* מציג את המודאל רק אם יש רקע */}
      {background && <SearchProduct />}

      {/* אם אין רקע ונתיב הוא /searchproduct, מציג את עמוד החיפוש מלא */}
      {!background && location.pathname === "/searchproduct" && <SearchProduct />}
    </>
  );
}
