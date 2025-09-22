import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user")) 
  : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialUser, 
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); 
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user"); 
         
        },
    },
});

export const { setAuthUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
