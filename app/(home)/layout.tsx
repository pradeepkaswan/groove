import { Navbar } from "@/components/navbar"

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			<Navbar />
			<main className="flex h-full">
				<div className="h-full w-full">{children}</div>
			</main>
		</div>
	)
}
