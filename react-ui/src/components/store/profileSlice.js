import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: []
    },
    reducers: {
        setProfile(state, action) { 
            state.profile = action.payload.profile  
        }
    }
})
export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer