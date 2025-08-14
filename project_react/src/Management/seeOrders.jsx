import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from '../Redux/Action/ordersAction';
import { fetchUsers } from '../Redux/Action/usersAction';
import { fetchProducts } from '../Redux/Action/productsAction';
import { Link } from "react-router-dom";
import '../styles/seeOrders.css';

export default function SeeOrders() {
  const dispatch = useDispatch();

  const { orders = [] } = useSelector((state) => state.orders || {});
  const { users = [] } = useSelector((state) => state.users || {});
  const { products = [] } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const getUserDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.fullName} (${user.email})` : "משתמש לא ידוע";
  };

  const calculateTotal = (order) => {
    if (!order.items) return 0;
    return order.items.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      const price = product ? product.price : 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const isValidDate = (date) => date && !isNaN(new Date(date).getTime());

  return (
    <div className="ordersContainer">
      <div className="ordersBox">
        <h2>כל ההזמנות באתר</h2>

        {orders.length === 0 ? (
          <p>אין הזמנות להצגה</p>
        ) : (
          orders.map((order) => {
            const totalPrice = calculateTotal(order);
            return (
              <section key={order._id} className="admin-order-card">
                <h3>מספר הזמנה: {order._id}</h3>
                <p>
                  <strong>משתמש:</strong> {getUserDetails(order.userId)}
                </p>
                <p>
                  <strong>תאריך:</strong>{" "}
                  {isValidDate(order.orderDate)
                    ? new Date(order.orderDate).toLocaleString("he-IL")
                    : "תאריך לא זמין"}
                </p>
                <p>
                  <strong>סה״כ לתשלום:</strong> ₪{totalPrice.toLocaleString()}
                </p>

                <Link
                  to={`/orderDetails/${order._id}`}
                  state={{ total: totalPrice }}
                  className="admin-order-card-link"
                >
                  לצפייה בפרטי ההזמנה
                </Link>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
