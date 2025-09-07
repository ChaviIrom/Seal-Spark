import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByOrderId } from '../../redux/actions/ordersAction';
import { fetchProducts } from '../../redux/actions/productsAction';
import '../../styles/designOrderDetails.css'; // קובץ לא קיים, יש להוסיף בעתיד

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { orderById: order } = useSelector(state => state.orders);
  const { products = [] } = useSelector(state => state.products);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchByOrderId(orderId));
      dispatch(fetchProducts());
    }
  }, [dispatch, orderId]);

  if (!order) return <div className="order-details-container">טוען הזמנה...</div>;

  const total = order.items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="order-details-container">
      <h2>פרטי הזמנה מס' {orderId}</h2>
      <div className="order-list">
        {order.items.map((item, index) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return <div key={index}>מוצר לא נמצא</div>;

          return (
            <div className="order-card" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="order-card-details">
                <p><strong>שם מוצר:</strong> {product.name}</p>
                <p><strong>כמות:</strong> {item.quantity}</p>
                <p><strong>מחיר ליחידה:</strong> ₪{product.price}</p>
                <p><strong>סה"כ:</strong> ₪{product.price * item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
      <h3>מחיר כולל להזמנה: ₪{total}</h3>
    </div>
  );
};

export default OrderDetails;
