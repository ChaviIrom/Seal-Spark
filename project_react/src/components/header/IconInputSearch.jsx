import { useNavigate, useLocation } from "react-router-dom";
import searchIcon from "../../../public/pictures/HomePage/icons8-search-50.png";
import '../../styles/DesignHeader.css'

export default function IconSearchProduct() {
  return (
    <div className="search-button-icon" style={{ cursor: 'pointer' }}>
      <img src={searchIcon} alt="חיפוש" width={35} />
    </div>
  );
}


