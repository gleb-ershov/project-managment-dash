import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTService } from "@/src/infrastructure/services/jwt.service";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("accessToken")?.value;

		if (!token) {
			return new NextResponse(null, { status: 401 });
		}

		const payload = await JWTService.verifyAccessToken(token);

		return NextResponse.json({
			user: {
				userId: payload.userId,
				email: payload.email,
			},
		});
	} catch {
		return new NextResponse(null, { status: 401 });
	}
}
