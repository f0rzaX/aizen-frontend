import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (userData.password !== userData.confirmPassword) {
			toast.error("Passwords do not match!", {
				position: "bottom-right",
                autoClose: 1000,
			});
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(`${baseURL}/api/auth/register/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: userData.username,
					email: userData.email,
					password: userData.password,
                    password2: userData.confirmPassword,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success("Registration successful! Please login.", {
					position: "bottom-right",
					autoClose: 1000,
					onClose: () => {
						setLoading(false);
						navigate("/login");
					},
				});
			} else if (response.status === 400) {
				// Handle validation errors from the backend
				// Iterate over all keys in the data object to show validation errors
				Object.keys(data).forEach((key) => {
					data[key].forEach((errorMessage: string) => {
						toast.error(errorMessage, {
							position: "bottom-right",
                            autoClose: 1000,
						});
					});
				});
				setLoading(false);
			} else {
				toast.error("Something went wrong. Please try again.", {
					position: "bottom-right",
                    autoClose: 1000,
				});
				setLoading(false);
			}
		} catch (error) {
			toast.error("Network error. Please try again later.", {
				position: "bottom-right",
                autoClose: 1000,
			});
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex justify-center w-full mb-20 mt-20">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg"
				>
					<div className="flex flex-col items-center pb-10">
						<img
							src="https://i.ibb.co/TTfFBhB/logo.jpg"
							alt="Aizen Logo"
							className="mt-6 w-20 h-20"
						/>
						<h2 className="text-xl font-semibold mt-4 mb-6">
							Join AiZEN!
						</h2>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Username
							</label>
							<input
								type="text"
								name="username"
								value={userData.username}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md"
								required
							/>
						</div>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={userData.email}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md"
								required
								autoComplete="email"
							/>
						</div>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={userData.password}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md"
								required
								autoComplete="current-password"
							/>
						</div>
						<div className="mb-4 w-3/4">
							<label className="block mb-2 text-sm font-medium text-gray-900">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={userData.confirmPassword}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded-md"
								required
								autoComplete="current-password"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 mt-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							{loading ? (
								<div className="flex justify-center items-center">
									<div
										className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
										role="status"
									></div>
								</div>
							) : (
								"Sign Up"
							)}
						</button>
						<div className="flex mt-4">
							<Link to="/login" className="text-sm text-blue-700">
								Have an Account? Log In!
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
