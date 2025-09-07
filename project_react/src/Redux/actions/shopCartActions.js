// shopCartActions.js

// הוספה לפריט בסל
export const addToCartLocal = (product) => (dispatch, getState) => {
  const cartItem = {
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.quantity || 1,
    customName: product.customName || '',
    customMessage: product.customMessage || '',
    selectedFont: product.selectedFont || '',
    selectedLanguage: product.selectedLanguage || ''
  };

  const state = getState();
  const existingItem = state.cart.cartItems.find(i => i.productId === cartItem.productId);

  let updatedCart;
  if (existingItem) {
    updatedCart = state.cart.cartItems.map(i =>
      i.productId === cartItem.productId
        ? { ...i, quantity: i.quantity + cartItem.quantity }
        : i
    );
  } else {
    updatedCart = [...state.cart.cartItems, cartItem];
  }

  localStorage.setItem("localCart", JSON.stringify(updatedCart));
  dispatch({ type: "SET_CART", payload: updatedCart });
};

// מחיקה
export const removeFromCartLocal = (productId) => (dispatch, getState) => {
  const updatedCart = getState().cart.cartItems.filter(i => i.productId !== productId);
  localStorage.setItem("localCart", JSON.stringify(updatedCart));
  dispatch({ type: "SET_CART", payload: updatedCart });
};

// הגדלה של כמות
export const incrementQuantityLocal = (item) => (dispatch, getState) => {
  const updatedCart = getState().cart.cartItems.map(i =>
    i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
  );
  localStorage.setItem("localCart", JSON.stringify(updatedCart));
  dispatch({ type: "SET_CART", payload: updatedCart });
};

// הקטנה של כמות
export const decrementQuantityLocal = (item) => (dispatch, getState) => {
  const newQty = item.quantity - 1;
  if (newQty < 1) return;

  const updatedCart = getState().cart.cartItems.map(i =>
    i.productId === item.productId ? { ...i, quantity: newQty } : i
  );
  localStorage.setItem("localCart", JSON.stringify(updatedCart));
  dispatch({ type: "SET_CART", payload: updatedCart });
};

// טעינת סל מה-localStorage בהתחלת האפליקציה
export const loadLocalCart = () => (dispatch) => {
  const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");
  dispatch({ type: "SET_CART", payload: localCart });
};
