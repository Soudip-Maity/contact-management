import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    value: "all",
    search: "", 
  },
  reducers: {
    setFilter: (state, action) => {
      state.value = action.payload;
    },
     setSearch: (state, action) => {
      state.search = action.payload;  
    },
  },
});

export const { setFilter,setSearch  } = filterSlice.actions;
export default filterSlice.reducer;