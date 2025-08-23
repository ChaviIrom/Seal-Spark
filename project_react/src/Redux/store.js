import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { cartReducer } from './reducers/shopCartReducer';
import { usersReducer }  from './reducers/usersReducer'
import productsReducer  from './reducers/productsReducer';
import categoriesReducer  from './reducers/categoriesReducer';
import ordersReducer from './reducers/ordersReducer';
import contuctUsReducer from './reducers/contuctUsReducer';

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
