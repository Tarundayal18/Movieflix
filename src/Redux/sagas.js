import { call, put, takeEvery, all } from 'redux-saga/effects';   // referance reduxSaga m ka 4
import {
  FETCH_PRODUCTS_REQUEST, 
  fetchProductsSuccess,
  fetchProductsFailure,
  FETCH_PRODUCT_DETAILS_REQUEST,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} from './actions';

function* fetchProductsSaga() {                           

  try {
    const response = yield call(fetch, 'https://dummyjson.com/products');             //// api call ki uske baad put ki help se fetchproductsuccess mai data.products add kar diye uske baad reducer mai daaal diya then ui se action ko call karke fetchproductsuccess mangva lete hai 
    const data = yield response.json();
    yield put(fetchProductsSuccess(data.products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* fetchProductDetailsSaga(action) {

  try {
    const response = yield call(fetch, `https://dummyjson.com/products/${action.payload}`);    //// same yaha details page mai  =>> api call ki uske baad put ki help se fetchProductDetailsSaga mai data.products add kar diye uske baad reducer mai daaal diya then ui se action ko call karke fetchproductsuccess mangva lete hai 
    const data = yield response.json();
    yield put(fetchProductDetailsSuccess(data));
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message));
  }
}

function* watchFetchProducts() {                                            //// takeevery means listener jo req ke through saga ko vapis run karvata hai 
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

function* watchFetchProductDetails() {
  yield takeEvery(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetailsSaga);
}

export default function* rootSaga() {                                 ////// ye all listener ko ek sath call karvata hai
  yield all([
    watchFetchProducts(),
    watchFetchProductDetails(),
  ]);
}
