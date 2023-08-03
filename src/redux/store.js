import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './weatherSlices'

//Root reducer combining weatherReducer
const rootReducer = {
  weather: weatherReducer,
};

//Create Redux Store
//ConfigureStore gives us all methods and functions to create our store 
const store = configureStore({
    reducer: rootReducer,
})

export default store;