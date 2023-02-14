export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER_I":
      return { ...state, ...action.payload };
    case "LOGGED_IN_USER_II":
      return { ...state, ...action.payload };
    case "LOGGED_IN_USER_III":
      return { ...state, ...action.payload };
    case "LOGGED_IN_USER_IV":
      return { ...state, ...action.payload };
    case "LOGGED_IN_USER_V":
      return { ...state, ...action.payload };
    case "USER_LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
