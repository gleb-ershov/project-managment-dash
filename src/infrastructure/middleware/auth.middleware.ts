import { NextRequest, NextResponse } from "next/server";
import { JWTService } from "@/src/infrastructure/services/jwt.service";
import { AuthenticatedRequest } from "@/src/types/requests";

type HandlerFunction = (
	req: AuthenticatedRequest
) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: HandlerFunction) {
	return async (request: NextRequest) => {
		try {
			const accessToken = request.cookies.get("accessToken")?.value;

			if (!accessToken) {
				return NextResponse.json(
					{ error: "Authentication required" },
					{ status: 401 }
				);
			}

			try {
				const payload = await JWTService.verifyAccessToken(accessToken);

				const authenticatedRequest = new NextRequest(request.url, {
					method: request.method,
					headers: request.headers,
					body: request.body,
					cache: request.cache,
					credentials: request.credentials,
					integrity: request.integrity,
					keepalive: request.keepalive,
					mode: request.mode,
					redirect: request.redirect,
					referrer: request.referrer,
					referrerPolicy: request.referrerPolicy,
					signal: request.signal,
				}) as AuthenticatedRequest;

				authenticatedRequest.user = payload;

				return await handler(authenticatedRequest);
			} catch (error) {
				if (
					error instanceof Error &&
					(error.message === "Token has expired" ||
						error.name === "JWTExpired")
				) {
					const refreshToken =
						request.cookies.get("refreshToken")?.value;

					if (!refreshToken) {
						return NextResponse.json(
							{ error: "Refresh token not found" },
							{ status: 401 }
						);
					}

					try {
						const refreshPayload =
							await JWTService.verifyRefreshToken(refreshToken);
						const { accessToken: newAccessToken } =
							await JWTService.generateTokenPair({
								userId: refreshPayload.userId,
								email: refreshPayload.email,
							});

						const headers = new Headers(request.headers);
						const authenticatedRequest = new NextRequest(
							request.url,
							{
								method: request.method,
								headers: headers,
								body: request.body,
								cache: request.cache,
								credentials: request.credentials,
								integrity: request.integrity,
								keepalive: request.keepalive,
								mode: request.mode,
								redirect: request.redirect,
								referrer: request.referrer,
								referrerPolicy: request.referrerPolicy,
								signal: request.signal,
							}
						) as AuthenticatedRequest;

						authenticatedRequest.user = refreshPayload;
						const response = await handler(authenticatedRequest);

						response.cookies.set("accessToken", newAccessToken, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							sameSite: "lax",
							path: "/",
						});

						return response;
					} catch (error) {
						console.log("Refresh token error:", error);
						const response = NextResponse.json(
							{ error: "Session expired" },
							{ status: 401 }
						);

						response.cookies.delete("accessToken");
						response.cookies.delete("refreshToken");

						return response;
					}
				}

				return NextResponse.json(
					{ error: "Invalid authentication" },
					{ status: 401 }
				);
			}
		} catch (error) {
			console.error("Current user route error:", error);
			return NextResponse.json(
				{ error: "Server error" },
				{ status: 500 }
			);
		}
	};
}
