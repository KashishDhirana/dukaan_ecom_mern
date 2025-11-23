import { Info, X } from "lucide-react";

export default function Alert() {
	// const message = "This is important";
	const message = "";

	if (!message) return null;

	return (
		<div className="bg-gray-600">
			<div className="px-2 w-full h-10 flex items-center justify-between gap-x-2 bg-red-600/30 border border-red-600 text-red-500">
				<div className="flex items-center gap-x-2">
					<Info size={16} /> {message}
				</div>
				<X />
			</div>
		</div>
	);
}
