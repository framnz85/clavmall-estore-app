import getUnique from "../components/common/getUnique"
import { storeData, removeData } from "../functions/asyncstorage"

let initialState = [];

const reducerExec = (state, payload) => {
  if (payload.length > 0) {
    const unique = getUnique(state, payload);
    if (unique.all.length < 100)
        storeData("parents", unique.all);
    return unique.all;
  } else {
    removeData("parents");
    return [];
  }
}

export const parentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PARENT_LIST_I":
      return reducerExec(state, action.payload);
    case "PARENT_LIST_II":
      return reducerExec(state, action.payload);
    case "PARENT_LIST_III":
      return reducerExec(state, action.payload);
    default:
      return state;
  }
};
