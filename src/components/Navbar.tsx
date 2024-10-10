import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

const Navbar: React.FC = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<nav className="bg-white border-gray-200 fixed top-0 w-full z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex items-center space-x-3 pointer-events-none select-none">
					<img src="https://i.ibb.co/TTfFBhB/logo.jpg" className="h-8" alt="Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap">
						AiZEN
					</span>
				</div>

				{isAuthenticated && (
					<div
						className="hidden w-full md:block md:w-auto"
						id="navbar-default"
					>
						<ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
							{location.pathname !== "/upload" && (
								<li>
									<Link
										to="/upload"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
									>
										<span className="hidden md:inline">
											Upload
										</span>
										<span className="md:hidden">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
												/>
											</svg>
										</span>
									</Link>
								</li>
							)}
							{location.pathname !== "/profile" && (
								<li>
									<Link
										to="/profile"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
									>
										<span className="hidden md:inline">
											Profile
										</span>
										<span className="md:hidden">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
												/>
											</svg>
										</span>
									</Link>
								</li>
							)}
							{location.pathname !== "/dashboard" && (
								<li>
									<Link
										to="/dashboard"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
									>
										<span className="hidden md:inline">
											Dashboard
										</span>
										<span className="md:hidden">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
												/>
											</svg>
										</span>
									</Link>
								</li>
							)}
							<li>
								<div
									title="Logout"
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer"
									onClick={handleLogout}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
										/>
									</svg>
								</div>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
