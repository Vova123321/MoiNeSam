import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { user_id: '', loggedIn: false },
    reducers: {
        logIn: (state, action) => {
            state.user_id = action.payload.user_id;
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.user_id = '';
            state.loggedIn = false;
        },
    },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
