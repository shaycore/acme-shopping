import axios from 'axios';

const products = (state = [], action)=> {
  if (action.type === 'SET_PRODUCTS') {
    return action.products;
  }
  if (action.type === 'CREATE_PRODUCT') {
    return [...state, action.product];
  }
  if (action.type === 'DELETE_PRODUCT') {
    return state.filter(product => product.id !== action.product.id);
  }
  if (action.type === 'UPDATE_PRODUCT') {
    return state.map((product) => product.id === action.product.id ? action.product: product);
  }
  return state;
};

export const fetchProducts = ()=> {
  return async(dispatch) => {
    const products = (await axios.get('/api/products')).data;
    dispatch({ type: 'SET_PRODUCTS', products });
  };
};  

export const createProduct = (product) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    if(token) {
      product = (await axios.post('/api/products', product, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch({ type: 'CREATE_PRODUCT', product })
    }
  };
};

export const deleteProduct = (product, history) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    if(token) {
      await axios.delete(`/api/products/${ product.id }`, {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'DELETE_PRODUCT', product});
      history.push('/admin/products')
    }
  }
}

export const updateProduct = (product) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    if(token) {
      product = (await axios.put(`/api/products/${ product.id }`, product, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch({ type: 'UPDATE_PRODUCT', product })
    }
  }
}

export default products;
