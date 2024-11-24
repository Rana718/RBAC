import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface User{
    id: number;
    username: string;
    email: string;
    role: string;
    permissions: string[];
}

interface UserState{
    users: User[];
}

const initialState: UserState = {
    users: [],
}


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>){
            state.users = action.payload
        },
        addUser(state, action: PayloadAction<User>){
            state.users.push(action.payload);
        },
        deleteUser(state, action: PayloadAction<number>){
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        updateUser(state, action: PayloadAction<User>){
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index !== -1){
                state.users[index] = action.payload;
            }
        }
    }
});


export const {setUsers, addUser, deleteUser, updateUser} = userSlice.actions;
export default userSlice.reducer;