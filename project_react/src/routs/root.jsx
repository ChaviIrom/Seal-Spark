import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from '../Grid/header.jsx';
import Footer from '../Grid/footer.jsx';
import '../styles/DesignHeader.css';
import '../App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/action/usersAction.js';
import SearchProduct from '../components/header/SearchProdect.jsx';

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

    const interval = setInterval(async () => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (!expiry || Date.now() > Number(expiry)) {
        localStorage.clear();
        dispatch({ type: "USER_LOGIN_FAIL", payload: "Token expired" });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <Outlet location={background || location} />
        {background && <SearchProduct />}
        {!background && location.pathname === "/searchproduct" && <SearchProduct />}
      </div>
      <Footer />
    </div>
  );
}