"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"
import {
	Heart,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "./ui/slider"

type PlayerProps = {
	id: Id<"files">
	songUrl: string
	title: string
	artist: string
	coverArt: string | null
	handleNext: () => void
	handlePrev: () => void
}

export const Player = ({
	id,
	songUrl,
	title,
	artist,
	coverArt,
	handleNext,
	handlePrev,
}: PlayerProps) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(1)

	const isFavorite = useQuery(api.files.getFavorite, { id })
	const favorite = useMutation(api.files.favorite)
	const unfavorite = useMutation(api.files.unfavorite)

	useEffect(() => {
		setIsPlaying(false)
		setCurrentTime(0)
	}, [songUrl])

	const togglePlayPause = () => {
		const audio = audioRef.current

		if (audio) {
			if (isPlaying) {
				audio.pause()
			} else {
				audio.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleTimeUpdate = () => {
		const audio = audioRef.current

		if (audio) {
			setCurrentTime(audio.currentTime)
			setDuration(audio.duration)
		}
	}

	const handleVolumeChange = (value: number[]) => {
		const audio = audioRef.current

		if (audio) {
			audio.volume = value[0]
		}
	}

	const handleSeek = (value: number[]) => {
		const audio = audioRef.current

		if (audio) {
			const newTime = value[0]
			if (isFinite(newTime)) {
				audio.currentTime = newTime
				setCurrentTime(newTime)
			}
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)

		return `${minutes}:${seconds.toString().padStart(2, "0")}`
	}

	const handleFavorite = () => {
		if (isFavorite) {
			unfavorite({ id })
		} else {
			favorite({ id })
		}
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-[#000000] flex justify-start gap-y-4 items-center">
			<div className="flex items-center w-64 justify-between">
				{coverArt && (
					<div className="w-16 h-16 rounded-md mr-4">
						<AspectRatio ratio={1 / 1}>
							<Image
								src={coverArt}
								alt={title}
								fill
								objectFit="cover"
							/>
						</AspectRatio>
					</div>
				)}
				<div>
					<h2 className="font-semibold">{title}</h2>
					<p className="text-gray-500">{artist}</p>
				</div>
				<button
					onClick={handleFavorite}
					className="transform transition hover:scale-125 active:scale-150 ml-10"
				>
					<Heart
						className={cn(
							"h-5 w-5",
							isFavorite && "fill-red-600 stroke-red-600",
						)}
					/>
				</button>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<button
					className="rounded-full p-2 mr-4"
					onClick={handlePrev}
				>
					<SkipBack />
				</button>
				<button
					className="bg-white text-black rounded-full p-2 mr-4"
					onClick={togglePlayPause}
				>
					{isPlaying ? (
						<Pause className="fill-black stroke-black" />
					) : (
						<Play className="fill-black stroke-black" />
					)}
				</button>
				<button
					className="rounded-full p-2"
					onClick={handleNext}
				>
					<SkipForward />
				</button>
			</div>
			<div className="flex items-center lg:space-x-14">
				<div className="flex items-center justify-center lg:space-x-4 w-[450px]">
					<div>{formatTime(currentTime)}</div>

					<Slider
						defaultValue={[currentTime]}
						max={duration}
						step={0.01}
						value={[currentTime]}
						onValueChange={handleSeek}
						className="w-48 lg:w-80"
					/>

					<div>{isFinite(duration) ? `${formatTime(duration)}` : ""}</div>
				</div>
			</div>

			<div className="flex gap-2">
				<Volume2 className="h-5 w-5" />
				<Slider
					defaultValue={[volume]}
					max={1}
					step={0.01}
					value={[volume]}
					onValueChange={handleVolumeChange}
					className="w-28"
				/>
			</div>

			<audio
				ref={audioRef}
				src={songUrl}
				onTimeUpdate={handleTimeUpdate}
			/>
		</div>
	)
}
