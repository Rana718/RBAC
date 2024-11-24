import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AdminState {
    email: string | null;
    token: string | null;
}

const initialState: AdminState = {
    email: null,
    token: null,
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin(state, action: PayloadAction<{ email: string; token: string }>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logoutAdmin(state) {
            state.email = null;
            state.token = null;
        },
    }
});


export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;