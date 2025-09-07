import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { getList } from '../../api/Categories.js';
import '../../styles/DesignLinkCategorise.css';
import '../../styles/DesigenMenu.css';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategory = await getList();
      setCategories(fetchedCategory);
    };
    fetchData();
  }, []);

  // סגירת תפריט כשלוחצים מחוץ אליו
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="nav">
      <div className="menu-wrapper">
        <div className="menu-container" ref={menuRef}>
          <div
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`dropdown ${menuOpen ? 'open' : ''}`}>
            <ul>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.id}`}
                    state={{ title: cat.name }}
                    className="dropdown-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

