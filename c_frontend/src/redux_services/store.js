import { configureStore } from "@reduxjs/toolkit";
import { apiEndpoints } from "./apiEndpoints";
import filterReducer from "./filterSlice";
 export const store= configureStore({
    reducer:{
        [apiEndpoints.reducerPath]:apiEndpoints.reducer,
           filter: filterReducer,
    },
    middleware: (gDM)=>{
       return   gDM().concat(apiEndpoints.middleware)
    }
})