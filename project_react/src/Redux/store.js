import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { cartReducer } from './reducers/ShopCartReducer';
import { usersReducer }  from './reducers/UsersReducer'
import productsReducer  from './reducers/ProductsReducer';
import categoriesReducer  from './reducers/CategoriesReducer';
import ordersReducer from './reducers/OrdersReducer';
import contuctUsReducer from './reducers/ContuctUsReducer';

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
