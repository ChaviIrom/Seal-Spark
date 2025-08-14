import '../../styles/DesignHeader.css';
import '../../styles/DesignShopCart.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/Action/shopCartActions.js";
import QuantitySelector from '../../component/QuantitySelector.jsx';

export default function ShopCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  console.log('totalprice', totalPrice)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/Orders', {
      state: {
        cartItems,
        totalPrice,
      }
    });
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
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                {/* פרטים בצד ימין */}
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                  <div className="item-price">₪{(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-actions">
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrement={() => dispatch(decrementQuantity(item.productId))}
                      onIncrement={() => dispatch(incrementQuantity(item.productId))}
                      size="small"
                    />
                  </div>
                </div>

                {item.image && (
                  <img src={item.image} alt={item.name} className="item-image" />
                )}
              </div>
            ))}

            {/* סה"כ לתשלום וכפתור */}
            <div className="cart-summary">
              <p className="total-price">
                <strong>סה"כ לתשלום:</strong> ₪{totalPrice.toFixed(2)}
              </p>
              <button
                className="checkout-button"
                onClick={handleCheckout}
              >
                המשך לתשלום
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
