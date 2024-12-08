import { takeEvery } from 'redux-saga/effects';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/action';

function* handleAddToCart(action) {
  alert('Product is added to cart');
}

function* handleRemoveFromCart(action) {
  alert('Product is removed from cart');
}

function* watchCartActions() {
  yield takeEvery(ADD_TO_CART, handleAddToCart);
  yield takeEvery(REMOVE_FROM_CART, handleRemoveFromCart);
}

export default watchCartActions;


