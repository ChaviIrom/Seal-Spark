import { useNavigate, useLocation } from "react-router-dom";
import imageShpe from '../../../public/pictures/HomePage/icons8-shopping-bag-50.png'
import '../../styles/designHeader.css'

export default function ShopeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    navigate("/shopcart", { state: { background: location } });
  };

  return (
    <>
      <button onClick={openModal} className="shope-button">
      <img src={imageShpe} alt="עגלת קניות" width={35} />
    </button>
    </>
  );
}
