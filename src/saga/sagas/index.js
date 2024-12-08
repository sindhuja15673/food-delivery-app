import { all } from 'redux-saga/effects';
import cartSaga from '../sagas/saga';

export default function* rootSaga() {
  yield all([
    cartSaga(),
  ]);
}