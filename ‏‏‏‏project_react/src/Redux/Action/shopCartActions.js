export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });

  const {
    cart: { cartItems },
  } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
export const incrementQuantity = (id) => (dispatch) => {
  dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
};

export const decrementQuantity = (id) => (dispatch) => {
  dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
};
