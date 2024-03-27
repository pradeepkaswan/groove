import { CirclePlus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { UploadArea } from "./upload-area"

export const UploadSongModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="mr-6 cursor-pointer">
					<CirclePlus className="h-6 w-6" />
				</div>
			</DialogTrigger>
			<DialogContent className="bg-[#282828] border-0">
				<UploadArea />
			</DialogContent>
		</Dialog>
	)
}
