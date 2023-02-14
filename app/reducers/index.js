import { combineReducers, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from "./productReducer";
import { estoreReducer } from "./estoreReducer";
import { userReducer } from "./userReducer";
import { inputsReducer } from "./inputsReducer";
import { locationReducer } from "./locationReducer";
import { categoryReducer } from "./categoryReducer";
import { subcatReducer } from "./subcatReducer";
import { parentReducer } from "./parentReducer";
import { orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  estore: estoreReducer,
  user: userReducer,
  inputs: inputsReducer,
  location: locationReducer,
  categories: categoryReducer,
  subcats: subcatReducer,
  parents: parentReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});

export default store;
