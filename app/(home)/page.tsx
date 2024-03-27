"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useState } from "react"
import { FileWithUrls } from "../../types"
import { store } from "@/convex/users"
import { Heart, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Player } from "@/components/player"

export default function Home() {
	const store = useMutation(api.users.store)
	const songList = useQuery(api.files.list)

	const [fileId, setFileId] = useState<Id<"files"> | null>(null)
	const [currentSong, setCurrentSong] = useState("")
	const [title, setTitle] = useState("")
	const [artist, setArtist] = useState("")
	const [coverArt, setCoverArt] = useState<string | null>("")
	const [showFavorites, setShowFavorites] = useState(false)
	const [currentIndex, setCurrentIndex] = useState<number>(-1)

	const handleNext = () => {
		if (currentIndex < filteredSongList.length - 1) {
			const nextIndex = currentIndex + 1
			const nextSong = filteredSongList[nextIndex]
			playSong(nextSong)
			setCurrentIndex(nextIndex)
		} else {
			playSong(filteredSongList[0])
			setCurrentIndex(0)
		}
	}

	const handlePrev = () => {
		if (currentIndex > 0) {
			const prevIndex = currentIndex - 1
			const prevSong = filteredSongList[prevIndex]
			playSong(prevSong)
			setCurrentIndex(prevIndex)
		} else {
			const lastIndex = filteredSongList.length - 1
			playSong(filteredSongList[lastIndex])
			setCurrentIndex(lastIndex)
		}
	}

	useEffect(() => {
		store({})
	}, [store])

	const playSong = (file: FileWithUrls) => {
		setFileId(file._id)
		setCurrentSong(file.songUrl)
		setTitle(file.title)
		setArtist(file.owner.fullName)
		setCoverArt(file.imageUrl)
	}

	if (songList === undefined) {
		return <div>Loading...</div>
	}

	const filteredSongList = showFavorites
		? songList.filter((file) => file.isFavorite)
		: songList

	return (
		<>
			<Navbar />

			<div className="min-h-screen bg-[#121212] rounded-lg m-2">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<div className="flex w-full justify-between gap-4">
						<h1 className="text-xl font-medium mb-8 ">Your Library</h1>
						<button
							className="transform transition hover:scale-125 active:scale-150"
							onClick={() => setShowFavorites(!showFavorites)}
						>
							<div className="flex gap-2">
								Liked Songs
								<Heart
									className={cn(
										"text-[#BCBCBC] h-6 w-6",
										showFavorites && "fill-red-600 stroke-red-600",
									)}
								/>
							</div>
						</button>
					</div>
					<div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
						{filteredSongList.map((file) => (
							<div
								key={file.song}
								className="bg-[#282828] rounded-md shadow-md overflow-hidden hover:bg-[#4B4B4C] duration-300 hover:scale-105 transform transition-transform cursor-pointer relative"
								onClick={() => playSong(file)}
							>
								<div className="p-4">
									{file.imageUrl && (
										<div className="group mb-4 rounded-md overflow-hidden">
											<Image
												src={file.imageUrl}
												alt={file.title}
												height={200}
												width={200}
												className="w-full object-cover"
											/>
											<div className="absolute left-52 top-28 inset-0 flex items-center justify-center">
												<div className="bg-orange-500 rounded-full p-2 transform transition-transform duration-300 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-6">
													<Play className="text-white h-6 w-6" />
												</div>
											</div>
										</div>
									)}
									<h2 className="font-semibold text-base">{file.title}</h2>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* {fileId && currentSong && (
					<Player
						id={fileId}
						title={title}
						artist={artist}
						coverArt={coverArt}
						songUrl={currentSong}
						handleNext={handleNext}
						handlePrev={handlePrev}
					/>
				)} */}
			</div>
		</>
	)
}
