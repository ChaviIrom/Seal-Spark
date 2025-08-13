const initialState = {
  cartItems: [],
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + (action.payload.quantity || 1),
              }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
          },
        ];
      }

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    case "REMOVE_FROM_CART":
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartItems: filteredItems,
        totalPrice: filteredItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    case "INCREMENT_QUANTITY":
      const incCartItems = state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        cartItems: incCartItems,
        totalPrice: incCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    case "DECREMENT_QUANTITY":
      const decCartItems = state.cartItems
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return {
        ...state,
        cartItems: decCartItems,
        totalPrice: decCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    default:
      return state;
  }
};

