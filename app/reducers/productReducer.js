import getUnique from "../components/common/getUnique"
import { storeData, removeData } from "../functions/asyncstorage"

let initialState = [];

const reducerExec = (state, payload) => {
  if (payload.length > 0) {
    const unique = getUnique(state, payload);
    if (unique.all.length < 200)
        storeData("products", unique.all);
    return unique.all;
  } else {
    removeData("products");
    return [];
  }
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_I":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_II":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_III":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_IV":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_V":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_VI":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_VII":
      return reducerExec(state, action.payload);
    case "PRODUCT_LIST_VIII":
      return reducerExec(state, action.payload);
    default:
      return state;
  }
};