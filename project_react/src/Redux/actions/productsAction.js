import {
  getList,
  add,
  getById,
} from "../../api/products.js";

export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await getList();
    dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_FAIL", payload: error.message });
  }
};
export const addProduct = (product) => async (dispatch) => {
  try {
    const newProduct = await add(product);
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    return newProduct; // החזרת המוצר החדש
  } catch (error) {
    dispatch({ type: "ADD_PRODUCT_FAIL", payload: error.message });
    throw error; // זורק שגיאה כך שהקומפוננטה תוכל לתפוס
  }
};


export const fetchProductById = (id) => async (dispatch) => {
  try {
    const product = await getById(id);
    dispatch({ type: "FETCH_PRODUCT_BY_ID_SUCCESS", payload: product });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCT_BY_ID_FAIL", payload: error.message });
  }
};
