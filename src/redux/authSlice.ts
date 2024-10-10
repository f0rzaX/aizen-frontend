import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	refreshToken: string | null;
}

const token = localStorage.getItem("token") || null;
const refreshToken = localStorage.getItem("refreshToken") || null;

const initialState: AuthState = {
	isAuthenticated: token ? true : false,
	token: token,
	refreshToken: refreshToken,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<{ token: string; refresh: string }> 
		) => {
			const { token, refresh } = action.payload;
			state.isAuthenticated = true;
			state.token = token;
			state.refreshToken = refresh; 
			// Save token and refreshToken
			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refresh);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.refreshToken = null;
			// Remove token and refreshToken
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
