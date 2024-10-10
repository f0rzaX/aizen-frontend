import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface AuthRouteProps {
	element: React.ReactElement;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return !isAuthenticated ? <Navigate to="/" replace /> : element;
};
