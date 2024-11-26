import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AdminState {
    email: string | null;
    token: string | null;
    tokenType: string | null;
}

const initialState: AdminState = {
    email: localStorage.getItem('adminEmail'),
    token: localStorage.getItem('adminToken'),
    tokenType: localStorage.getItem('adminTokenType'),
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin(state, action: PayloadAction<{ email: string; token: string; tokenType: string }>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.tokenType = action.payload.tokenType;
            localStorage.setItem('adminEmail', action.payload.email);
            localStorage.setItem('adminToken', action.payload.token);
            localStorage.setItem('adminTokenType', action.payload.tokenType);
        },
        logoutAdmin(state) {
            state.email = null;
            state.token = null;
            state.tokenType = null;
            localStorage.removeItem('adminEmail');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminTokenType');
        },
    }
});


export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;