import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { getProductsReducer } from "./actions/reducers/productReducer";
import {cartReducer} from "../redux/actions/reducers/cartReducer"
import thunk from "redux-thunk";
const reducer = combineReducers({
  getProducts: getProductsReducer,
  cart: cartReducer,
});
const middleWare = [thunk];
const store = configureStore(
  { reducer: reducer },
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
