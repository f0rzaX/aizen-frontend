import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PublicRouteProps {
	element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return element;
};

export default PublicRoute;
