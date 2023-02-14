import getUnique from "../components/common/getUnique"
import { storeData, removeData } from "../functions/asyncstorage"

let initialState = [];

const reducerExec = (state, payload) => {
  if (payload.length > 0) {
    const unique = getUnique(state, payload);
    if (unique.all.length < 100)
        storeData("categories", unique.all);
    return unique.all;
  } else {
    removeData("categories");
    return [];
  }
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY_LIST_I":
      return reducerExec(state, action.payload);
    case "CATEGORY_LIST_II":
      return reducerExec(state, action.payload);
    case "CATEGORY_LIST_III":
      return reducerExec(state, action.payload);
    case "CATEGORY_LIST_IV":
      return reducerExec(state, action.payload);
    default:
      return state;
  }
};
