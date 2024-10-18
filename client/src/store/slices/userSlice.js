import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { name: 'test123', loggedIn: true },
    reducers: {
        logIn: (state, action) => {
            state.name = action.payload.name;
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.name = '';
            state.loggedIn = false;
        },
    },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
