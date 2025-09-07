const savedUser = localStorage.getItem("userData");

const initialState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  users: [],
  error: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };

    case 'USER_LOGIN_FAIL':
      console.log("USER_LOGIN_FAIL נשלח:", action.payload);
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("accessToken");
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        error: null,
      };

    case 'FETCH_USERS_FAIL':
    case 'ADD_USER_FAIL':
    case 'USER_UPDATE_FAIL':
    case 'DELETE_USER_FAIL':
    case 'FETCH_USER_BY_ID_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case 'FETCH_USER_BY_ID_SUCCESS':
      return {
        ...state,
        currentUser: action.payload
      };
      case 'USER_LOGOUT':
  localStorage.clear();
  return {
    ...state,
    currentUser: null,
    error: null,
  };


    default:
      return state;
  }
};

export default usersReducer;
