const initialState = {
  cartItems: [],
  totalPrice: 0,
  error: null
};

// פונקציה לחישוב סה"כ
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const shopCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
        totalPrice: calculateTotal(action.payload),
        error: null
      };

    case "ADD_TO_CART":
      const exists = state.cartItems.find(i => i.productId === action.payload.productId);
      let updatedCart;
      if (exists) {
        updatedCart = state.cartItems.map(i =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        updatedCart = [...state.cartItems, action.payload];
      }
      return {
        ...state,
        cartItems: updatedCart,
        totalPrice: calculateTotal(updatedCart),
        error: null
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cartItems.filter(i => i.productId !== action.payload);
      return {
        ...state,
        cartItems: filteredCart,
        totalPrice: calculateTotal(filteredCart),
        error: null
      };

    case "UPDATE_QUANTITY":
      const updatedQtyCart = state.cartItems.map(i =>
        i.productId === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return {
        ...state,
        cartItems: updatedQtyCart,
        totalPrice: calculateTotal(updatedQtyCart),
        error: null
      };

    case "CART_ERROR":
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default shopCartReducer;
