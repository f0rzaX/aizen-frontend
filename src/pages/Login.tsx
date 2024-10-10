import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		let isMounted = true;

		try {
			const response = await fetch(`${baseURL}/api/auth/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok && isMounted) {
				dispatch(
					loginSuccess({ token: data.access, refresh: data.refresh })
				);

				toast.success("Login successful!", {
					position: "bottom-right",
					autoClose: 1000,
				});
				setLoading(false);
				navigate("/dashboard");
			} else if (isMounted) {
				toast.error("Invalid username or password!", {
					position: "bottom-right",
					autoClose: 1000,
				});
				setLoading(false);
			}
		} catch (error) {
			if (isMounted) {
				toast.error("Network error. Please try again later.", {
					position: "bottom-right",
					autoClose: 1000,
				});
				setLoading(false);
			}
		}

		return () => {
			isMounted = false;
		};
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex justify-center w-full mb-20">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg"
				>
					<div className="flex flex-col items-center pb-10">
						<img
							src="https://i.ibb.co/TTfFBhB/logo.jpg"
							alt="Aizen Logo"
							className="mt-4 w-20 h-20"
						/>
						<h2 className="text-xl font-semibold mt-4 mb-6">
							Welcome Back to AiZEN!
						</h2>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Username
							</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								className="w-full p-2 border border-gray-300 rounded-md"
								autoComplete="username"
							/>
						</div>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full p-2 border border-gray-300 rounded-md"
								autoComplete="current-password"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="flex justify-center items-center w-1/2 text-white bg-blue-700 hover:bg-blue-800 mt-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							{loading ? (
								<div className="flex justify-center items-center">
									<div
										className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
										role="status"
									></div>
								</div>
							) : (
								"Login"
							)}
						</button>
						<div className="flex mt-4">
							<Link
								to="/signup"
								className="text-sm text-blue-700"
							>
								New Here? Sign Up!
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
