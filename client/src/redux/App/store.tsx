import { persistStore,persistReducer } from "redux-persist";
 import  storage  from "redux-persist/lib/storage";
 import { configureStore } from "@reduxjs/toolkit";
 import userSlice from '../Slices/userSlice';
import postSlice from "../Slices/postSlice";

const persistConfig ={
    key :"root",
    storage
};

const persisterUserReducer = persistReducer(persistConfig,userSlice)

const store =configureStore({
    reducer :{
        user:persisterUserReducer,
        posts:postSlice

    },
})

export const persistor = persistStore(store);
export default store;