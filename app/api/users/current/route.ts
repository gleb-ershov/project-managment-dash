import { NextResponse } from "next/server";
import { Container } from "@/src/infrastructure/container/container";
import { withAuth } from "@/src/infrastructure/middleware/auth.middleware";
import { AuthenticatedRequest } from "@/src/types/requests";

export const GET = withAuth(async (request: AuthenticatedRequest) => {
	try {
		const userService = Container.getInstance().resolve("UserService");

		if (!request.user?.userId) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		const user = await userService.getUser(request.user.userId);
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch current user" },
			{ status: 500 }
		);
	}
});
