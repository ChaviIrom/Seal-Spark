const initialState = {
  orders: [],
  orderById: null,           // פרטי הזמנה לפי orderId
  userOrders: [],        // הזמנות לפי userId (אם רלוונטי)
  loading: false,
  error: null,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    // שליפת כל ההזמנות
    case "FETCH_ORDERS_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ORDERS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // שליפת הזמנה לפי orderId
    case "FETCH_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        orderById: null,
      };
    case "FETCH_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        orderById: action.payload,
        error: null,
      };
    case "FETCH_ORDER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        order: null,
      };

    // הוספת הזמנה חדשה
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        error: null,
      };
    case "ADD_ORDER_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    // שליפת הזמנות לפי userId
    case "FETCH_ORDER_BY_ID_SUCCESS":
      return {
        ...state,
        userOrders: action.payload,
        error: null,
      };
    case "FETCH_ORDER_BY_ID_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ordersReducer;
