import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import alertReducer from "./alert";
export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
});


export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();