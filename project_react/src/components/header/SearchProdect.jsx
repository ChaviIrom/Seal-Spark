import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getList } from '../../api/products.js'; 
import "../../styles/DesignSearch.css";

export default function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getList(); 
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim()) {
        const term = query.toLowerCase();
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query, products]);

  const handleClose = () => {
    navigate(-1); // סוגר את המודאל וחוזר אחורה
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // אפשר להוסיף גם navigate(`/product/${id}`) אם תרצי
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <button className="close-btn" onClick={handleClose}>X</button>
          <input
            className="search-input"
            placeholder="מה אתה מחפש?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <ul>
          {results.map((product) => (
            <li
              key={product.id}
              className="search-result"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <p><strong>{product.name}</strong></p>
                <p>מחיר: ₪{product.price}</p>
                <p>תיאור: {product.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
