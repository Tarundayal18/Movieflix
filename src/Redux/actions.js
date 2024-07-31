export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Actions for fetching product details
export const FETCH_PRODUCT_DETAILS_REQUEST = 'FETCH_PRODUCT_DETAILS_REQUEST';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILURE = 'FETCH_PRODUCT_DETAILS_FAILURE';

export const fetchProductDetailsRequest = (productId) => ({
  type: FETCH_PRODUCT_DETAILS_REQUEST,
  payload: productId,
});

export const fetchProductDetailsSuccess = (productDetails) => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: productDetails,
});

export const fetchProductDetailsFailure = (error) => ({
  type: FETCH_PRODUCT_DETAILS_FAILURE,
  payload: error,
});
