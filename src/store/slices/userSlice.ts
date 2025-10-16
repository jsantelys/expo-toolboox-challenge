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
    token: string | null
}

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.currentUser = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.currentUser = null
            state.token = null
            state.isAuthenticated = false
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload }
            }
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
});

export const { login, logout, updateUser, setToken } = userSlice.actions
export default userSlice.reducer

export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated
export const selectToken = (state: { user: UserState }) => state.user.token

