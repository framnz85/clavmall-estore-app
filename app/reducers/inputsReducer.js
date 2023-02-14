let initialState = {
  cart: [],
  searchText: "",
  payopt: "",
  couponCode: "",
  couponAmount: "",
};

export const inputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUTS_OBJECT_I":
      return { ...state, ...action.payload };
    case "INPUTS_OBJECT_II":
      return { ...state, ...action.payload };
    case "INPUTS_OBJECT_III":
      return { ...state, ...action.payload };
    case "INPUTS_OBJECT_IV":
      return { ...state, ...action.payload };
    case "INPUTS_OBJECT_V":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
