export const Loading = () => {
	return (
		<main className="flex items-center justify-center h-full w-full bg-white">
			<div className="flex flex-col items-center">
				<svg
					className="animate-spin h-10 w-10 text-gray-900"
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
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.707M22 12h-4a8 8 0 01-7.858 7.996"
					></path>
				</svg>
				<p className="text-gray-900 text-lg mt-4">Loading...</p>
			</div>
		</main>
	)
}
