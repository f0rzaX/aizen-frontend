import React from "react";

interface ImageCardProps {
	image: {
		id: number;
		name: string;
		upload_date: string;
		description?: string;
		signed_url?: string;
	};
	polling: boolean;
	imageId: string | null;
	onDelete: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
	image,
	polling,
	imageId,
	onDelete,
}) => {
	const uploadDate = new Date(image.upload_date);

	const formattedDate = uploadDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
			<div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
				<img
					src={image.signed_url}
					alt={image.name}
					className="w-full h-full object-contain object-center"
				/>
			</div>
			<div className="p-4">
				<h6 className="mb-2 text-slate-800 text-xl font-semibold">
					{image.name}
				</h6>
				<p className="text-slate-600 leading-normal font-light">
					<span className="font-semibold">Uploaded on:</span>{" "}
					<span className="font-bold">{formattedDate}</span>
				</p>

				{polling && image.id === Number(imageId) ? (
					<div className="flex justify-center items-center mt-6">
						<div
							className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
							role="status"
						></div>
					</div>
				) : (
					image.description && (
						<p className="text-slate-600 leading-normal mt-6 font-semibold">
							<span className="font-semibold underline">
								AI Description:
							</span>{" "}
							<span className="font-bold">
								{image.description}
							</span>
						</p>
					)
				)}
			</div>
			<div className="absolute top-0 right-0 px-6 py-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<button
					onClick={() => onDelete(image.id)}
					className="bg-red-500 p-2 rounded"
					aria-label="Delete"
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
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ImageCard;
