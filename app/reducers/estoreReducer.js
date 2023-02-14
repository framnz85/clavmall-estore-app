import { storeData, removeData } from "../functions/asyncstorage"

let initialState = {};

const reducerExec = (state, payload) => {
  if (Object.keys(payload).length > 0) {
    storeData("estore", { ...state, ...payload });
    return { ...state, ...payload };
  } else {
    removeData("estore");
    return [];
  }
}

export const estoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ESTORE_INFO_I":
      return reducerExec(state, action.payload);
    case "ESTORE_LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
