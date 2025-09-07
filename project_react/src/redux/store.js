import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import shopCartReducer  from '../redux/reducers/shopCartReducer.js';
import usersReducer from '../redux/reducers/usersReducer.js'
import productsReducer  from '../redux/reducers/productsReducer.js';
import categoriesReducer  from '../redux/reducers/categoriesReducer.js';
import ordersReducer from '../redux/reducers/ordersReducer.js';
import contuctUsReducer from '../redux/reducers/contuctUsReducer.js';

const reducer = combineReducers({
  cart: shopCartReducer,
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
