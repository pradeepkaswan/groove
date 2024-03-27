"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { UploadFileResponse } from "@xixixao/uploadstuff"
import { UploadDropzone } from "@xixixao/uploadstuff/react"
import { useMutation } from "convex/react"
import { useState } from "react"

export const UploadArea = () => {
	const [songId, setSongId] = useState<Id<"files"> | null>(null)
	const [title, setTitle] = useState<string>("")

	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const saveSongStorageId = useMutation(api.files.saveSongStorageId)
	const saveSongAfterUpload = async (uploaded: UploadFileResponse[]) => {
		if (title === "") {
			alert("Please enter a title")
			return
		}

		const id = await saveSongStorageId({
			songStorageId: (uploaded[0].response as any).storageId,
			title,
		})
		setSongId(id)
		setTitle("")
	}

	const saveImageStorageId = useMutation(api.files.saveImageStorageId)
	const saveImageAfterUpload = async (uploaded: UploadFileResponse[]) => {
		if (songId === null) return

		await saveImageStorageId({
			imageStorageId: (uploaded[0].response as any).storageId,
			id: songId,
		})
		setSongId(null)
	}

	return (
		<div className="w-full mx-auto p-2 rounded-md shadow-md">
			{!songId && (
				<div>
					<h2 className="text-xl mb-4">Upload New Song</h2>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block font-medium mb-2"
						>
							Song Title
						</label>
						<input
							type="text"
							id="title"
							placeholder=""
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-4 py-2 rounded-md border border-blue-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="upload"
							className="block font-medium mb-2"
						>
							Upload Mp3 file
						</label>
						<UploadDropzone
							uploadUrl={generateUploadUrl}
							fileTypes={{ "audio/mpeg": [".mp3"] }}
							onUploadComplete={saveSongAfterUpload}
							onUploadError={(error) => {
								alert(`ERROR! ${error}`)
							}}
						/>
					</div>
				</div>
			)}
			{songId && (
				<div>
					<h2 className="text-xl font-semibold mb-4">Upload Album Cover</h2>
					<div className="mb-4">
						<UploadDropzone
							uploadUrl={generateUploadUrl}
							fileTypes={{
								"image/*": [".png", ".gif", ".jpeg", ".jpg"],
							}}
							onUploadComplete={saveImageAfterUpload}
							onUploadError={(error) => {
								alert(`ERROR! ${error}`)
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
