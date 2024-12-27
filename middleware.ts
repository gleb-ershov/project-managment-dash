import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTService } from "@/src/infrastructure/services/jwt.service";

// Define public routes that don't require authentication
const AUTH_ROUTES = ["/login", "/sign-up"];
// Define routes that should skip middleware (like api routes, static files)
const SKIP_MIDDLEWARE_ROUTES = ["/api/auth", "/_next", "/favicon.ico"];
const DEFAULT_REDIRECT_ROUTE = "/";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for specific routes
	if (SKIP_MIDDLEWARE_ROUTES.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Create base response
	let response = NextResponse.next();

	try {
		// Get tokens from cookies
		const ACCESS_TOKEN = request.cookies.get("accessToken")?.value;
		const REFRESH_TOKEN = request.cookies.get("refreshToken")?.value;

		const IS_AUTH_ROUTE = AUTH_ROUTES.includes(pathname);
		// If no tokens exist, redirect to login
		if (!ACCESS_TOKEN && !REFRESH_TOKEN) {
			if (IS_AUTH_ROUTE) {
				return NextResponse.next();
			}
			return redirectToLogin(request);
		}

		// Try to validate access token first
		if (ACCESS_TOKEN) {
			try {
				await JWTService.verifyAccessToken(ACCESS_TOKEN);
				// isAuthenticated = true;

				// If user is authenticated and trying to access auth routes,
				// redirect to default page
				if (IS_AUTH_ROUTE) {
					return NextResponse.redirect(
						new URL(DEFAULT_REDIRECT_ROUTE, request.url)
					);
				}
				return response; // Access token is valid, continue
			} catch (error) {
				// Access token is invalid or expired, try refresh token
				console.log("Access token validation failed:", error);
			}
		}

		// At this point, either no access token or it's invalid
		// Try to use refresh token
		if (!REFRESH_TOKEN) {
			if (IS_AUTH_ROUTE) {
				return NextResponse.next();
			}
			return redirectToLogin(request);
		}

		try {
			// Validate refresh token
			const REFRESH_PAYLOAD = await JWTService.verifyRefreshToken(
				REFRESH_TOKEN
			);

			// Generate new token pair
			const {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			} = await JWTService.generateTokenPair({
				userId: REFRESH_PAYLOAD.userId,
				email: REFRESH_PAYLOAD.email,
			});

			// Create response with new tokens
			response = IS_AUTH_ROUTE
				? NextResponse.redirect(
						new URL(DEFAULT_REDIRECT_ROUTE, request.url)
				  )
				: NextResponse.next();

			// Set new tokens in cookies
			response.cookies.set("accessToken", newAccessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
			});

			response.cookies.set("refreshToken", newRefreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
			});

			return response;
		} catch (error) {
			// Refresh token is invalid
			console.error("Refresh token validation failed:", error);
			if (AUTH_ROUTES.includes(pathname)) {
				return NextResponse.next();
			}
			return clearTokensAndRedirect(request);
		}
	} catch (error) {
		// Handle any unexpected errors
		console.error("Middleware error:", error);
		if (AUTH_ROUTES.includes(pathname)) {
			return NextResponse.next();
		}
		return clearTokensAndRedirect(request);
	}
}

// Helper function to redirect to login
function redirectToLogin(request: NextRequest): NextResponse {
	const LOGIN_URL = new URL("/login", request.url);
	// Store the original URL to redirect back after login
	LOGIN_URL.searchParams.set("callbackUrl", request.url);
	return NextResponse.redirect(LOGIN_URL);
}

// Helper function to clear tokens and redirect
function clearTokensAndRedirect(request: NextRequest): NextResponse {
	const RESPONSE = redirectToLogin(request);
	RESPONSE.cookies.delete("accessToken");
	RESPONSE.cookies.delete("refreshToken");
	return RESPONSE;
}

// Configure middleware to run on all routes except those specified
export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)"],
};
