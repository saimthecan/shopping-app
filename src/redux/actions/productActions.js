import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "https://saimthecan.github.io/shopping-json/products.json";
    if (categoryId) {
      url = "https://saimthecan.github.io/shopping-json/categoryId" + categoryId + ".json"; 
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}
