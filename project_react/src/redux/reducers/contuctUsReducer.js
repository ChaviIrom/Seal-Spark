const initialState = 
{
  contactUs: [],
  loading: false,
  error: null
}

export const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACT_SUCCESS':
      return {
        ...state,
        contactUs: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CONTACT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_CONTACT_SUCCESS':
      return {
        ...state,
        contactUs: [...state.contactUs, action.payload],
        loading: false,
        error: null
      };
    case 'ADD_CONTACT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_CONTACT':
      return {
        ...state,
        contactUs: []
      };
    default:
      return state;
  }
}
export default contactUsReducer;