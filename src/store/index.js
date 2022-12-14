import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import products from './products';
import orders from './orders';
import users from './users';
import reviews from './reviews';
import wishlist from './wishlist';
import lineitems from './lineitems';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import addresses from './addressStore';

const reducer = combineReducers({
  auth,
  cart,
  products,
  users,
  orders,
  reviews,
  wishlist,
  lineitems,
  addresses  
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './products';
export * from './users';
export * from './orders';
export * from './reviews';
export * from './wishlist';
export * from './lineitems';
export * from './addressStore';
