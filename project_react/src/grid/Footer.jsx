import '../styles/DesignFooter.css';
import { Link } from 'react-router-dom';

export default function Footer(){

    return(
    
    <div className="footer-design" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px', padding: '20px' }}>
  
    {/* קישור ליצירת קשר */}
    <Link to="/contactus" className="footer-link">יצירת קשר</Link> 

    {/* קישור לאודות */}
    <Link to="/about" className="footer-link">אודות</Link> 

    {/* קישור לסניפים */}
    <Link to="/branches" className="footer-link">סניפים</Link> 
    
    {/* קישור לעמוד הבית */}
    <Link to="/" className="footer-link">עמוד הבית</Link>
</div> 
)}
