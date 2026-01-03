import { json } from "@tanstack/react-start";
import { HTTPCODE } from "@/lib/httpcode";

export const handleServerError = (
	error: unknown,
	duplicateMessage = "Duplicate record found",
) => {
	console.log(error);

	if (
		error instanceof Object &&
		"code" in error &&
		(error as { code: number }).code === 11000
	) {
		return json(
			{ success: false, message: duplicateMessage },
			{ status: HTTPCODE.BADREQUEST },
		);
	}

	if (error instanceof Error) {
		return json(
			{ success: false, message: error.message },
			{ status: HTTPCODE.INTERNALSERVERERROR },
		);
	}

	return json(
		{ success: false, message: "An unexpected error occurred" },
		{ status: HTTPCODE.INTERNALSERVERERROR },
	);
};
