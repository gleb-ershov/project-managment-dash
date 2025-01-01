"server-only";
import { UnauthorizedError } from "@/src/domain/errors/application.error";
import { Container } from "@/src/infrastructure/container/container";
import { JWTService } from "@/src/infrastructure/services/jwt.service";
import { cookies } from "next/headers";
import { UserViewModel } from "../../view-models/user.view-model";

let userCache: { [key: string]: { user: UserViewModel; timestamp: number } } =
	{};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const getCurrentUser = async (): Promise<UserViewModel | null> => {
	console.log("TRIGGERED");
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		if (!accessToken) {
			throw new UnauthorizedError("No access token found");
		}

		// Decode token first to avoid unnecessary DB calls
		const decoded = await JWTService.decodeToken(accessToken);
		if (!decoded?.userId) {
			throw new UnauthorizedError("Invalid token");
		}

		// Check cache first
		const cachedData = userCache[decoded.userId];
		if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
			return cachedData.user;
		}

		// Get user from database
		const userService = Container.getInstance().resolve("UserService");
		const user = await userService.getUser(decoded.userId);

		if (!user) {
			throw new UnauthorizedError("User not found");
		}

		// Update cache
		userCache[decoded.userId] = {
			user,
			timestamp: Date.now(),
		};

		return user;
	} catch (error) {
		// Clear cache on error
		userCache = {};

		if (error instanceof UnauthorizedError) {
			return null;
		}

		throw new Error(
			error instanceof Error ? error.message : "Unexpected error occurred"
		);
	}
};

// Add cache cleanup mechanism
const cleanupCache = () => {
	const now = Date.now();
	Object.keys(userCache).forEach((key) => {
		if (now - userCache[key].timestamp > CACHE_DURATION) {
			delete userCache[key];
		}
	});
};

// Run cache cleanup every minute
if (typeof setInterval !== "undefined") {
	setInterval(cleanupCache, 60 * 1000);
}

// Add method to manually clear cache if needed
export const clearUserCache = () => {
	userCache = {};
};
