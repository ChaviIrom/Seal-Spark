import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/DesignOrders.css';
import '../../../src/styles/DesignAddOrder.css';
import { addOrder } from '../../redux/actions/ordersAction';

export default function OrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const currentUser = useSelector((state) => state.users.currentUser);
  
  const userId = currentUser?.id;
  console.log('currentUser' , userId)
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // אם תרצי להוסיף עיר ומיקוד, אפשר להוסיף כאן useState:
  // const [city, setCity] = useState('');
  // const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!phone) {
      newErrors.phone = 'יש להזין טלפון';
    } else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!address) {
      newErrors.address = 'יש להזין כתובת למשלוח';
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'יש להזין 16 ספרות';
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'תוקף לא תקין, יש להזין בפורמט MM/YY';
    } else {
      const [month] = expiry.split('/').map(Number);
      if (month < 1 || month > 12) {
        newErrors.expiry = 'חודש לא תקין';
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'יש להזין 3 ספרות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiry(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await dispatch(addOrder({
      userId,
      items: cartItems,
      shippingAddress: {
        fullName: currentUser?.name || '',
        address,
        city: '',       // אפשר להוסיף עיר אם יש טופס לכך
        postalCode: '', // אפשר להוסיף מיקוד אם יש טופס לכך
        phone,
      },
      paymentInfo: {
        method: 'credit_card',
        cardLast4: cardNumber.slice(-4),
      },
      status: 'pending',
    }));

    setOrderPlaced(true);
  };

  return (
    <div className="addOrderPageWrapper">
      <form className="addOrderForm" onSubmit={handleSubmit} noValidate>
        <h2>סיכום הזמנה</h2>

        <div className="total-amount">
          <span>סה"כ לתשלום: </span><span>{totalPrice.toFixed(2)}₪</span>
        </div>

        {!orderPlaced ? (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? 'input-error' : ''}
              placeholder="מספר טלפון"
              dir="rtl"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={errors.address ? 'input-error' : ''}
              placeholder="כתובת למשלוח"
              dir="rtl"
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <input
              type="text"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={errors.cardNumber ? 'input-error' : ''}
              placeholder="מספר כרטיס אשראי (16 ספרות)"
              dir="rtl"
            />
            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}

            <input
              type="text"
              maxLength="5"
              value={expiry}
              onChange={handleExpiryChange}
              className={errors.expiry ? 'input-error' : ''}
              placeholder="תוקף (MM/YY)"
              dir="rtl"
            />
            {errors.expiry && <p className="error-text">{errors.expiry}</p>}

            <input
              type="password"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className={errors.cvv ? 'input-error' : ''}
              placeholder="CVV (3 ספרות)"
              dir="rtl"
            />
            {errors.cvv && <p className="error-text">{errors.cvv}</p>}

            <button type="submit">שלם עכשיו</button>
          </>
        ) : (
          <p className="success-message">
            תודה! ההזמנה בוצעה בהצלחה. פרטי ההזמנה נשלחו למייל שלך.
          </p>
        )}
      </form>
    </div>
  );
}
