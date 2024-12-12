import { takeEvery, put } from 'redux-saga/effects';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/action';
import { toast } from 'react-toastify';
function* handleAddToCart(action) {
  yield put({ type: 'ADD_TO_CART_SUCCESS', payload: action.payload });
  
}

function* handleRemoveFromCart(action) {
  yield put({ type: 'REMOVE_FROM_CART_SUCCESS', payload: action.payload });
  toast.info('Item removed from cart.');
  alert('Product is removed from cart');
}

function* watchCartActions() {
  yield takeEvery(ADD_TO_CART, handleAddToCart);
  yield takeEvery(REMOVE_FROM_CART, handleRemoveFromCart);
}

export default watchCartActions;


