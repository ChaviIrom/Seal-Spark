import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/action/shopCartActions.js';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getById } from '../../api/products.js';
import '../../styles/ProductDetails.css';
import QuantitySelector from '../../components/QuantitySelector.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedLanguage, setSelectedLanguage] = useState('he');

  const dispatch = useDispatch();
  const baseUrl = window.location.origin;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('שגיאה בקבלת מוצר:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const customizedProduct = {
      // id: product.id || product.id,    // לשמור id לשימוש ב-Redux
      productId: product.id , // להוסיף לפי הסכמה במונגו
      quantity,
      customName,
      customMessage,
      selectedFont,
      selectedLanguage,
      name: product.name,
      price: product.price,
      image: product.image
    };
    dispatch(addToCart(customizedProduct));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        טוען...
      </div>
    );
  }

  return (
    <div className="product-details-wrapper">
      <div className="product-card">
        {/* תמונה בצד שמאל */}
        <div className="image-container">
          <img
            src={baseUrl + product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* פרטי מוצר + התאמה אישית */}
        <div className="product-info">
          <p><strong>שם:</strong> {product.name}</p>
          <p><strong>מחיר:</strong> ₪{product.price}</p>
          <p><strong>תיאור:</strong> {product.description}</p>

          <div className="customization-section">
            <label>שם לחקיקה:</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="הכנס שם"
            />

            <label>משפט לחקיקה:</label>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="הכנס משפט"
            />

            <label>בחר גופן:</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="David">David</option>
              <option value="FrankRuehl">FrankRuehl</option>
            </select>

            <label>בחר שפה:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="he">עברית</option>
              <option value="en">אנגלית</option>
              <option value="fr">צרפתית</option>
              <option value="es">ספרדית</option>
            </select>
          </div>

          {/* כפתורי רכישה */}
          <div className="bottom-actions">
            <QuantitySelector
              quantity={quantity}
              onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrement={() => setQuantity((prev) => prev + 1)}
            />
            <button onClick={handleAddToCart} className="add-to-cart-button">
              הוסף לסל
            </button>
          </div>
        </div>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          המוצר נוסף בהצלחה לסל!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
