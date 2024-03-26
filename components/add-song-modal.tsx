import { CirclePlus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { UploadArea } from "./upload-area"

export const AddSongModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="mr-6">
					<CirclePlus className="h-6 w-6" />
				</div>
			</DialogTrigger>
			<DialogContent className="bg-[#282828] border-0">
				<UploadArea />
			</DialogContent>
		</Dialog>
	)
}
