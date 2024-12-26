import { ValidationError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const refreshToken = body.refreshToken;

		if (!refreshToken) {
			return NextResponse.json(
				{ error: "Refresh token is required" },
				{ status: 400 }
			);
		}

		const refreshTokenUseCase = Container.getInstance().resolve(
			"RefreshTokenUseCase"
		);
		const tokens = refreshTokenUseCase.execute(refreshToken);
		return NextResponse.json(tokens, { status: 200 });
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
