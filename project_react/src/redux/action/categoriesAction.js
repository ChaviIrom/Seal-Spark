import {
  getList,
  add,
  getById
} from '../../api/Categories.js';

export const fetchCategories = () => async (dispatch) => {
  try {
    const categories = await getList();
    dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: categories });
  } catch (error) {
    dispatch({ type: "FETCH_CATEGORIES_FAIL", payload: error.message });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    const success = await add(category);
    if (!success) throw new Error("הוספה נכשלה");
    dispatch({ type: "ADD_CATEGORY", payload: category });
  } catch (error) {
    dispatch({ type: "ADD_CATEGORY_FAIL", payload: error.message });
  }
};

export const fetchCategoryById = (id) => async (dispatch) => {
  try {
    const category = await getById(id);
    dispatch({ type: "FETCH_CATEGORY_BY_ID_SUCCESS", payload: category });
  } catch (error) {
    dispatch({ type: "FETCH_CATEGORY_BY_ID_FAIL", payload: error.message });
  }
};
