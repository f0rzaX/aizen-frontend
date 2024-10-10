import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageCard from "../components/ImageCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/authSlice";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Dashboard: React.FC = () => {
	const [images, setImages] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [polling, setPolling] = useState(true);
	const token = localStorage.getItem("token");
	const refreshToken = localStorage.getItem("refreshToken");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Fetch all images
	const fetchImages = async (accessToken: string | null) => {
		try {
			const response = await fetch(`${baseURL}/api/images/`, {
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
				throw new Error("Failed to fetch images");
			}

			const data = await response.json();
			setImages(data);
			setLoading(false);
		} catch (error: any) {
			console.error("Error fetching images:", error);

			if (error.message === "Token expired") {
				handleTokenRefresh();
			} else {
				toast.error("Failed to load images", {
					position: "bottom-right",
					autoClose: 1000,
				});
				setLoading(false);
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
			localStorage.setItem("token", data.access);

			fetchImages(data.access);
		} catch (error) {
			console.error("Error refreshing token:", error);

			toast.error("Session expired, please log in again", {
				position: "bottom-right",
				autoClose: 1000,
			});

			dispatch(logout());
			navigate("/login");
		}
	};

	// Poll for a specific image status after upload (if imageId is present)
	const queryParams = new URLSearchParams(window.location.search);
	const imageId = queryParams.get("imageId");

	const fetchImageStatus = async (
		id: number,
		accessToken: string | null,
		intervalId: NodeJS.Timeout
	) => {
		try {
			const response = await fetch(
				`${baseURL}/api/images/status/${id}/`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				if (
					response.status === 401 &&
					errorData.code === "token_not_valid"
				) {
					throw new Error("Token expired");
				}
				throw new Error("Failed to fetch image status");
			}

			const data = await response.json();
			setImages((prevImages) =>
				prevImages.map((image) =>
					image.id === data.id ? { ...image, ...data } : image
				)
			);

			// Stop polling if description is returned
			if (data.description) {
				setPolling(false);
				clearInterval(intervalId);
			}
		} catch (error: any) {
			console.error("Error fetching image status:", error);

			if (error.message === "Token expired") {
				handleTokenRefresh();
			} else {
				toast.error("Failed to fetch image status", {
					position: "bottom-right",
					autoClose: 1000,
				});
			}
		}
	};

	useEffect(() => {
		if (token) {
			fetchImages(token);
		}
	}, [token]);

	const deleteImage = async (
		id: number,
		accessToken: string,
		setImages: React.Dispatch<React.SetStateAction<any[]>>,
		images: any[]
		// navigate: Function
	) => {
		try {
			const response = await fetch(`${baseURL}/api/images/${id}/`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete image");
			}

			// Filter out the deleted image from the current list
			const updatedImages = images.filter((image) => image.id !== id);
			setImages(updatedImages); // Update the state with the new list

			toast.success("Image deleted successfully", {
				position: "bottom-right",
				autoClose: 1000,
			});
		} catch (error) {
			toast.error("Failed to delete image", {
				position: "bottom-right",
				autoClose: 1000,
			});
			console.error("Error deleting image:", error);
		}
	};

	useEffect(() => {
		if (imageId && token) {
			let pollCount = 0;
			const intervalId = setInterval(() => {
				if (pollCount >= 25) {
					clearInterval(intervalId);
					setPolling(false);
					return;
				}

				fetchImageStatus(Number(imageId), token, intervalId);
				pollCount++;
			}, 5000);

			return () => clearInterval(intervalId);
		}
	}, [imageId, token]);

	if (loading) {
		return <div className="text-center mt-10">Loading images...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Your Uploaded Images</h1>
			{images.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
					{images.map((image) => (
						<ImageCard
							key={image.id}
							image={{
								...image,
								description: image.description || "",
							}}
							polling={polling && imageId === image.id.toString()}
							imageId={imageId}
							onDelete={async () => {
								await deleteImage(
									image.id,
									token!,
									setImages,
									images
								);
							}}
						/>
					))}
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<div className="text-center">
						<div
							className="text-gray-500 cursor-pointer"
							onClick={() => navigate("/upload")}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-max"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
								/>
							</svg>

							<p>Upload an Image</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
