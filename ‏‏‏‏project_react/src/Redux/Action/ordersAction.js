import {
  getList,
  add,
  getById,
  getByOrderId
} from '../../API/orders';

// שליפת כל ההזמנות
export const fetchOrders = () => async (dispatch) => {
  try {
    const orders = await getList();
   dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: orders });// מוודא שהשם של המערך נכון
  } catch (error) {
    dispatch({ type: "FETCH_ORDERS_FAIL", payload: error.message });
  }
};

export const fetchByOrderId = (_id) => async (dispatch) => {
  dispatch({ type: 'FETCH_ORDER_REQUEST' });
  try {
    const order = await getByOrderId(_id);
    // console.log("Fetched order:", order);
    dispatch({ type: 'FETCH_ORDER_SUCCESS', payload: order });
  } catch (error) {
    dispatch({ type: 'FETCH_ORDER_FAIL', payload: error.message });
  }
};

// הוספת הזמנה
export const addOrder = (order) => async (dispatch) => {
  try {
    const result = await add(order);
    if (!result) throw new Error("הוספה נכשלה");
    dispatch({ type: "ADD_ORDER", payload: result });
  } catch (error) {
    dispatch({ type: "ADD_ORDER_FAIL", payload: error.message });
  }
};

export const fetchByUserId = (id) => async (dispatch) => {
  try {
    const order = await getById(id);
    dispatch({ type: "FETCH_ORDER_BY_ID_SUCCESS", payload: order });
  } catch (error) {
    dispatch({ type: "FETCH_ORDER_BY_ID_FAIL", payload: error.message });
  }
};
