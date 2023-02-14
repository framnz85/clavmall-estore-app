import getUnique from "../components/common/getUnique"
import { storeData } from "../functions/asyncstorage"

let initialState = {
  countries: [],
  addiv1s: [],
  addiv2s: [],
  addiv3s: [],
};

const reducerExec = (state, payload) => {
  if (Object.keys(payload).filter(key => key === "countries").length > 0) {
    const unique = getUnique(state.countries, payload.countries);
    storeData("location", { ...state, countries: unique.all });
    return { ...state, countries: unique.all };
  } else if (Object.keys(payload).filter(key => key === "addiv1s").length > 0) {
    const unique = getUnique(state.addiv1s, payload.addiv1s);
    storeData("location", { ...state, addiv1s: unique.all });
    return { ...state, addiv1s: unique.all };
  } else if (Object.keys(payload).filter(key => key === "addiv2s").length > 0) {
    const unique = getUnique(state.addiv2s, payload.addiv2s);
    if(unique.all.length < 500)
      storeData("location", { ...state, addiv2s: unique.all });
    return { ...state, addiv2s: unique.all };
  } else if (Object.keys(payload).filter(key => key === "addiv3s").length > 0) {
    const unique = getUnique(state.addiv3s, payload.addiv3s);
    if(unique.all.length < 1000)
      storeData("location", { ...state, addiv3s: unique.all });
    return { ...state, addiv3s: unique.all };
  } else {
    storeData("location", JSON.stringify({...initialState}));
    return {...initialState};
  }
}

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOCATION_LIST_I":
      return reducerExec(state, action.payload);
    case "LOCATION_LIST_II":
      return reducerExec(state, action.payload);
    case "LOCATION_LIST_III":
      return reducerExec(state, action.payload);
    case "LOCATION_LIST_IV":
      return reducerExec(state, action.payload);
    case "LOCATION_LIST_V":
      return reducerExec(state, action.payload);
    case "LOCATION_LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
