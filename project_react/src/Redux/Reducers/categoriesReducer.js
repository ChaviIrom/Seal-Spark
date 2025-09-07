const initialState = {
  categories: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        error: null,
      };

    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        error: action.payload,
      }
      default:
      return state;
  }
};

export default categoriesReducer;
