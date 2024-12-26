import { NextResponse } from "next/server";

export async function POST() {
	try {
		const response = NextResponse.json({ success: true }, { status: 200 });
		response.cookies.set("accessToken", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			expires: new Date(0),
		});

		response.cookies.set("refreshToken", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			expires: new Date(0),
		});
		return response;
	} catch {
		return NextResponse.json(
			{ error: "Failed to logout" },
			{ status: 500 }
		);
	}
}
