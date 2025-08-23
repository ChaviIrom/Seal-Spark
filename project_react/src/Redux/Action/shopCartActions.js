import { add as addToCartApi, removeItem as removeItemApi, update as updateCartApi } from "../../api/shopCart.js";

// הוספה לסל
export const addToCart = (product) => async (dispatch, getState) => {
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

  try {
    const updatedCart = await addToCartApi({ items: [cartItem] });
    dispatch({ type: 'SET_CART', payload: updatedCart.items });
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};

// מחיקה
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    await removeItemApi({ productId });
    const cartItems = getState().cart.cartItems.filter(i => i.productId !== productId);
    dispatch({ type: 'SET_CART', payload: cartItems });
  } catch (err) {
    console.error("Error removing from cart:", err);
  }
};

// עדכון כמות
export const incrementQuantity = (item) => async (dispatch) => {
  const newQty = item.quantity + 1;
  try {
    await updateCartApi(item._id, { quantity: newQty });
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.productId, quantity: newQty } });
  } catch (err) {
    console.error(err);
  }
};

export const decrementQuantity = (item) => async (dispatch) => {
  const newQty = item.quantity - 1;
  if (newQty < 1) return; // לא יוריד ל־0
  try {
    await updateCartApi(item._id, { quantity: newQty });
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.productId, quantity: newQty } });
  } catch (err) {
    console.error(err);
  }
};
