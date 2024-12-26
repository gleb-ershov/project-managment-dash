import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTService } from "@/src/infrastructure/services/jwt.service";

// Define public routes that don't require authentication
const authRoutes = ["/login", "/sign-up"];
// Define routes that should skip middleware (like api routes, static files)
const skipMiddlewareRoutes = ["/api/auth", "/_next", "/favicon.ico"];
const DEFAULT_REDIRECT_ROUTE = "/";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for specific routes
	if (skipMiddlewareRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Create base response
	let response = NextResponse.next();

	try {
		// Get tokens from cookies
		const accessToken = request.cookies.get("accessToken")?.value;
		const refreshToken = request.cookies.get("refreshToken")?.value;

		const isAuthRoute = authRoutes.includes(pathname);
		// If no tokens exist, redirect to login
		if (!accessToken && !refreshToken) {
			if (isAuthRoute) {
				return NextResponse.next();
			}
			return redirectToLogin(request);
		}

		// Try to validate access token first
		// let isAuthenticated = false;
		if (accessToken) {
			try {
				await JWTService.verifyAccessToken(accessToken);
				// isAuthenticated = true;

				// If user is authenticated and trying to access auth routes,
				// redirect to default page
				if (isAuthRoute) {
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
		if (!refreshToken) {
			if (isAuthRoute) {
				return NextResponse.next();
			}
			return redirectToLogin(request);
		}

		try {
			// Validate refresh token
			const refreshPayload = await JWTService.verifyRefreshToken(
				refreshToken
			);

			// Generate new token pair
			const {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			} = await JWTService.generateTokenPair({
				userId: refreshPayload.userId,
				email: refreshPayload.email,
			});

			// Create response with new tokens
			response = isAuthRoute
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
			if (authRoutes.includes(pathname)) {
				return NextResponse.next();
			}
			return clearTokensAndRedirect(request);
		}
	} catch (error) {
		// Handle any unexpected errors
		console.error("Middleware error:", error);
		if (authRoutes.includes(pathname)) {
			return NextResponse.next();
		}
		return clearTokensAndRedirect(request);
	}
}

// Helper function to redirect to login
function redirectToLogin(request: NextRequest): NextResponse {
	const loginUrl = new URL("/login", request.url);
	// Store the original URL to redirect back after login
	loginUrl.searchParams.set("callbackUrl", request.url);
	return NextResponse.redirect(loginUrl);
}

// Helper function to clear tokens and redirect
function clearTokensAndRedirect(request: NextRequest): NextResponse {
	const response = redirectToLogin(request);
	response.cookies.delete("accessToken");
	response.cookies.delete("refreshToken");
	return response;
}

// Configure middleware to run on all routes except those specified
export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)"],
};
