import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import shopCartReducer  from './reducers/shopCartReducer.js';
import usersReducer from './reducers/usersReducer.js'
import productsReducer  from './reducers/productsReducer.js';
import categoriesReducer  from './reducers/categoriesReducer.js';
import ordersReducer from './reducers/ordersReducer.js';
import contuctUsReducer from './reducers/contuctUsReducer.js';

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
