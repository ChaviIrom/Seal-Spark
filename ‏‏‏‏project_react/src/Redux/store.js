import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { cartReducer } from './Reducers/shopCartReducer';
import { usersReducer }  from './Reducers/usersReducer'
import productsReducer  from './Reducers/productsReducer';
import categoriesReducer  from './Reducers/categoriesReducer';
import ordersReducer from './Reducers/ordersReducer';
import contuctUsReducer from './Reducers/contuctUsReducer';

const reducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  users: usersReducer,
  orders: ordersReducer,
  products: productsReducer,
  contactUs: contuctUsReducer 
});

const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);


console.log("Redux store now:", store.getState());

export default store;
