import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Store user details
    token: null, // Optional: Store JWT token if needed
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user; // Set user details
            state.token = action.payload.token; // Set token if available
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
