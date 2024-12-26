import { Container } from "@/src/infrastructure/container/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchQuery = request?.nextUrl?.searchParams.get("search") || "";
		const userService = Container.getInstance().resolve("UserService");

		const users = await userService.findUsersByQuery(searchQuery);
		if (!users || users.length === 0) {
			return NextResponse.json({ users: [] }, { status: 200 });
		}
		return NextResponse.json({ users }, { status: 200 });
	} catch (error) {
		console.error("User search error:", error);
		return NextResponse.json(
			{ error: "Failed to search users" },
			{ status: 500 }
		);
	}
}
