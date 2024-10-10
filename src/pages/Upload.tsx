import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const UploadPage: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			toast.error("Please select an image to upload", {
                position: "bottom-right",
                autoClose: 1000,
            });
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedFile);

		setLoading(true);

		try {
			const response = await fetch(`${baseURL}/api/images/upload/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const data = await response.json();
			toast.success("Image uploaded successfully");
			navigate(`/dashboard?imageId=${data.id}`);
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image", {
                position: "bottom-right",
                autoClose: 1000,
            });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-2/3 h-screen mx-auto">
			<label
				htmlFor="dropzone-file"
				className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-600 border-dashed rounded-lg cursor-pointer bg-indigo-600 hover:bg-indigo-500"
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						className="w-8 h-8 mb-4 text-gray-100"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p className="mb-2 text-sm text-gray-100">
						{selectedFile ? (
							<span className="font-semibold">
								{selectedFile.name}
							</span>
						) : (
							<span className="font-semibold">
								Click to upload or drag and drop
							</span>
						)}
					</p>
					{!selectedFile && (
						<p className="text-xs text-gray-100">
							Supported file types: JPG, PNG, GIF
						</p>
					)}
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					ref={fileInputRef}
					accept="image/*"
					onChange={handleFileChange}
				/>
			</label>

			<button
				onClick={handleUpload}
				className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
				disabled={loading}
			>
				{loading ? "Uploading..." : "Upload Image"}
			</button>

			{loading && (
				<div className="mt-4 flex items-center justify-center">
					<svg
						className="animate-spin h-5 w-5 text-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						></path>
					</svg>
					<span className="ml-2 text-indigo-600">Uploading...</span>
				</div>
			)}

		</div>
	);
};

export default UploadPage;
