import {
  getList,
  add,
  update,
  Delete,
  getById,
  login,
  CurrentUser
} from '../../API/Users';
import { jwtDecode } from 'jwt-decode';

// שליפת כל המשתמשים
export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await getList();
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: users });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAIL", payload: error.message });
  }
};

// הוספת משתמש (הרשמה)
export const addUser = (user) => async (dispatch) => {
  try {
    const result = await add(user);
    if (!result) throw new Error("הוספה נכשלה");
    dispatch({ type: "ADD_USER", payload: result });

    // אחרי הרשמה, התחברות אוטומטית
    if (result.id) {
      console.log('add: ',result.id )
      dispatch(loginUser(result.id));
    }
  } catch (error) {
    dispatch({ type: "ADD_USER_FAIL", payload: error.message });
  }
};

// עדכון משתמש
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });
    const result = await update(userData.id, userData);
    if (result) {
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: result });
    } else {
      dispatch({ type: "USER_UPDATE_FAIL", payload: "עדכון נכשל" });
    }
  } catch (error) {
    dispatch({ type: "USER_UPDATE_FAIL", payload: error.message });
  }
};

// מחיקת משתמש
export const deleteUser = (userId) => async (dispatch) => {
  try {
    const result = await Delete(userId);
    if (result) {
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } else {
      dispatch({ type: "DELETE_USER_FAIL", payload: "מחיקה נכשלה" });
    }
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAIL", payload: error.message });
  }
};

// שליפת משתמש בודד
export const fetchUserById = (id) => async (dispatch) => {
  try {
    const user = await getById(id);
    dispatch({ type: "FETCH_USER_BY_ID_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_BY_ID_FAIL", payload: error.message });
  }
};

// התחברות משתמש
export const loginUser = (id) => async (dispatch) => {
  try {
    const result = await login(id); // מחזיר { accessToken }
    const decoded = jwtDecode(result.accessToken); // מפענח את ה־JWT

    const userData = {
      accessToken: result.accessToken,
      id: decoded.userId,
      role: decoded.role,
    };
  // 📌 שמירה ב-localStorage כדי לשמר מצב התחברות
    const expiryTime = Date.now() + 60 * 60 * 1000;
    localStorage.setItem("authToken", result.accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("tokenExpiry", expiryTime);
    localStorage.setItem("isLoggedIn", "true");

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    return userData;
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.message });
    throw error;
  }
};

// שליפת משתמש נוכחי
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const user = await CurrentUser();
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    } else {
      dispatch({ type: "USER_LOGIN_FAIL", payload: "No user logged in" });
    }
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.message });
  }
};
