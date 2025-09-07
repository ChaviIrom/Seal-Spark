import '../../styles/DesignHeader.css';
import '../../styles/DesignShopCart.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantityLocal,
  decrementQuantityLocal,
  removeFromCartLocal,
  loadLocalCart
} from "../../redux/actions/shopCartActions.js";
import QuantitySelector from '../../components/QuantitySelector.jsx';
import { useEffect } from 'react';

export default function ShopCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const isLoggedIn = !!currentUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // טוען את העגלה המקומית בעת טעינת הקומפוננטה
  useEffect(() => {
    dispatch(loadLocalCart());
  }, [dispatch]);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("עליך להתחבר כדי להמשיך לתשלום");
      navigate('/login');
      return;
    }
    navigate('/Orders', { state: { cartItems, totalPrice } });
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="cart-header">
          <button className="remove-btn" onClick={handleClose}>X</button>
          <h2 className="cart-title">סל קניות</h2>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart-msg">הסל ריק</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.productId ?? index} className="cart-item">
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  {item.description && <p className="item-description">{item.description}</p>}
                  <div className="item-price">
                    ₪{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </div>
                  <div className="item-actions">
                    <QuantitySelector
                      quantity={item.quantity || 0}
                      onDecrement={() => dispatch(decrementQuantityLocal(item))}
                      onIncrement={() => dispatch(incrementQuantityLocal(item))}
                      size="small"
                    />
                    <button
                      className="remove-item-btn"
                      onClick={() => dispatch(removeFromCartLocal(item.productId))}
                    >
                      מחיקה
                    </button>
                  </div>
                </div>
                {item.image && <img src={item.image} alt={item.name} className="item-image" />}
              </div>
            ))}

            <div className="cart-summary">
              <p className="total-price">
                <strong>סה"כ לתשלום:</strong> ₪{totalPrice.toFixed(2)}
              </p>
              <button className="checkout-button" onClick={handleCheckout}>
                המשך לתשלום
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
