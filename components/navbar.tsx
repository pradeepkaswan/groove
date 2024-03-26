"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { AddSongModal } from "@/components/add-song-modal"

export const Navbar = () => {
	return (
		<nav className="bg-[#121212] rounded-lg py-4 m-2">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
				<Link
					href="/"
					className="font-bold text-2xl "
				>
					Groove
				</Link>
				<div className="flex items-center">
					<AddSongModal />

					<UserButton />
				</div>
			</div>
		</nav>
	)
}
