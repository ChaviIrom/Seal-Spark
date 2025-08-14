import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from '../Grid/header.jsx';
import Footer from '../Grid/footer.jsx';
import '../styles/DesignHeader.css';
import '../App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../Redux/Action/usersAction.js';
import SearchProduct from '../component/Header/searchProdect.jsx';

export default function Root() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const initUser = async () => {
    const user = await dispatch(fetchCurrentUser());
  };

  initUser();

  // בדיקה מחזורית לטוקן
  const interval = setInterval(async () => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (!expiry || Date.now() > Number(expiry)) {
      localStorage.clear();
      dispatch({ type: "USER_LOGIN_FAIL", payload: "Token expired" });
      navigate("/login");
    }
  }, 30000);

  return () => clearInterval(interval);
}, [dispatch, navigate]);

  return (
    <>
      <main className="app-container main-content">
        <Header />
        <Outlet location={background || location} />
      </main>
      <Footer />

      {background && <SearchProduct />}
      {!background && location.pathname === "/searchproduct" && <SearchProduct />}
    </>
  );
}
