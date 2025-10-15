import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

interface UserState {
    currentUser: User | null
    isAuthenticated: boolean
}

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.currentUser = null
            state.isAuthenticated = false
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload }
            }
        },
    },
});

export const { login, logout, updateUser } = userSlice.actions
export default userSlice.reducer

// Selectors
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated

