"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useQuery } from "convex/react"
import { useEffect, useRef, useState } from "react"

type PlayerProps = {
	id: Id<"files">
	songUrl: string
	title: string
	artist: string
	converArt: string | null
	handleNext: () => void
	handlePrev: () => void
}

export const Player = ({
	id,
	songUrl,
	title,
	artist,
	converArt,
	handleNext,
	handlePrev,
}: PlayerProps) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(1)

	const isFavorite = useQuery(api.files.getFavorite, { id })
	const { mutate: favorite, pending: favoritePending } = useApiMutation(
		api.files.favorite,
	)
	const { mutate: unfavorite, pending: unfavoritePending } = useApiMutation(
		api.files.unfavorite,
	)

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
			setVolume(audi)
		}
	}

	return
}
