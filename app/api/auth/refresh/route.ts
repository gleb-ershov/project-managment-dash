import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const REQUEST_BODY = await request.json();
		const REFRESH_TOKEN = REQUEST_BODY.refreshToken;

		if (!REFRESH_TOKEN) {
			return NextResponse.json(
				{ error: "Refresh token is required" },
				{ status: 400 }
			);
		}

		const AUTH_SERVICE = Container.getInstance().resolve("AuthService");
		const TOKENS = AUTH_SERVICE.refreshToken(REFRESH_TOKEN);
		return NextResponse.json(TOKENS, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		return NextResponse.json(
			{ error: "Failed to refresh token" },
			{ status: 500 }
		);
	}
}
