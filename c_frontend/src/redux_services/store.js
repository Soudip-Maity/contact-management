import { configureStore } from "@reduxjs/toolkit";
import { apiEndpoints } from "./apiEndpoints";

 export const store= configureStore({
    reducer:{
        [apiEndpoints.reducerPath]:apiEndpoints.reducer,
    },
    middleware: (gDM)=>{
       return   gDM().concat(apiEndpoints.middleware)
    }
})