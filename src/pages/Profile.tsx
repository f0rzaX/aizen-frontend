import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/authSlice";

interface Profile {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Profile: React.FC = () => {
	const [profile, setProfile] = useState<Profile>({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
	});

	const token = localStorage.getItem("token");
	const refreshToken = localStorage.getItem("refreshToken");
	const navigate = useNavigate(); // For redirection
	const dispatch = useDispatch(); // To dispatch actions to the Redux store

	const fetchProfile = async (accessToken: string | null) => {
		try {
			const response = await fetch(`${baseURL}/api/user/info/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				if (
					response.status === 401 &&
					errorData.code === "token_not_valid"
				) {
					throw new Error("Token expired");
				}
				throw new Error("Failed to fetch profile");
			}

			const data = await response.json();
			setProfile(data);
		} catch (error: any) {
			console.error("Error fetching profile:", error);

			if (error.message === "Token expired") {
				handleTokenRefresh();
			} else {
				toast.error("Failed to load profile", {
					position: "bottom-right",
                    autoClose: 1000,
				});
			}
		}
	};

	const handleTokenRefresh = async () => {
		try {
			const response = await fetch(`${baseURL}/api/auth/token/refresh/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refresh: refreshToken,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to refresh token");
			}

			const data = await response.json();
			localStorage.setItem("token", data.access); // Store the new token

			// Retry fetching the profile with the new token
			fetchProfile(data.access);
		} catch (error) {
			console.error("Error refreshing token:", error);
			toast.error("Session expired, please log in again", {
				position: "bottom-right",
				autoClose: 1000,
				onClose: () => {
					dispatch(logout());
					navigate("/login");
				},
			});
		}
	};

	useEffect(() => {
		if (token) {
			fetchProfile(token);
		}
	}, [token]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch(`${baseURL}/api/user/info/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(profile),
			});

			if (!response.ok) {
				throw new Error("Failed to update profile");
			}

			toast.success("Profile updated successfully!", {
				position: "bottom-right",
                autoClose: 1000,
			});
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Failed to update profile", { position: "bottom-right", autoClose: 1000 });
		}
	};

	return (
		<div className="flex justify-center mt-20">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg"
			>
				<div className="flex flex-col items-center pb-10">
					<h1 className="text-2xl font-bold px-4 py-4 text-center text-gray-600">
						Tell us more about yourself!
					</h1>
					<div className="mb-3 w-3/4">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={profile.username}
							onChange={handleChange}
							disabled
							className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
							title="Cannot change Username"
						/>
					</div>
					<div className="mb-3 w-3/4">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={profile.email}
							onChange={handleChange}
							disabled
							className="w-full p-2 border border-gray-300 rounded-md"
							title="Cannot change Email"
						/>
					</div>
					<div className="mb-3 w-3/4">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							First Name
						</label>
						<input
							type="text"
							name="first_name"
							value={profile.first_name}
							onChange={handleChange}
							placeholder="First Name"
							className="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="mb-3 w-3/4">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Last Name
						</label>
						<input
							type="text"
							name="last_name"
							value={profile.last_name}
							onChange={handleChange}
							placeholder="Last Name"
							className="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<button
						type="submit"
						className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
					>
						Update Profile
					</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
