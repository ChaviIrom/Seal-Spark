import { Link } from "react-router-dom";
import '../../styles/buttonAdmin.css';

export default function ButtonAdmin() {

  const pathImg = '../../../public/pictures/Logo/Icon.png';

  return (
    <div className="buttonAdmin">
      <Link to="/addProduct" className="buttonsToAdmin">
        <span className="Text">הוספת מוצר</span>
        <img src={pathImg} alt="icon" className="Icon" />
      </Link>
      <Link to="/addCategory" className="buttonsToAdmin">
        <span className="Text">הוספת קטגוריה</span>
        <img src={pathImg} alt="icon" className="Icon" />
      </Link>
      <Link to="/seeUsers" className="buttonsToAdmin">
        <span className="Text">הצגת משתמשים</span>
        <img src={pathImg}  alt="icon" className="Icon" />
      </Link>
      <Link to="/seeOrders" className="buttonsToAdmin">
        <span className="Text">הצגת הזמנות מהאתר</span>
        <img src={pathImg} alt="icon" className="Icon" />
      </Link>
        <Link to="/seeContuctUs" className="buttonsToAdmin">
        <span className="Text">הצגת בקשות ליצירת קשר </span>
        <img src={pathImg} alt="icon" className="Icon" />
      </Link>
    </div>
  );
}