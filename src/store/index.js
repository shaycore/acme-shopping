import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import products from './products';
import users from './users';
import reviews from './reviews';
import wishlists from './wishlists';
import wishlistProducts from './wishlistProducts';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const reducer = combineReducers({
  auth,
  cart,
  products,
  users,
  reviews,
  wishlists,
  wishlistProducts
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './products';
export * from './users';
export * from './reviews';
export * from './wishlists';
export * from './wishlistProducts';

