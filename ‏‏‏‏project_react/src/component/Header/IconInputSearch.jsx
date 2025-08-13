import { useNavigate, useLocation } from "react-router-dom";
import searchIcon from "../../../Public/Pictures/HomePage/icons8-search-50.png";
import '../../styles/DesignHeader.css'

export default function IconSearchProduct() {

// IconSearchProduct
// console.log("Navigate with background:", location);

// Root.jsx
// console.log("Root location:", location);
// const background = location.state && location.state.background;
// console.log("Background in Root:", background);


  return (
    <div className="search-button-icon" style={{ cursor: 'pointer' }}>
      <img src={searchIcon} alt="חיפוש" width={35} />
    </div>
  );
}


