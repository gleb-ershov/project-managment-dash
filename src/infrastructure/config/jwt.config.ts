export const JWT_CONFIG = {
	ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? "",
	REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET ?? "",
	ACCESS_TOKEN_EXPIRES_IN: "30m",
	REFRESH_TOKEN_EXPIRES_IN: "7d",
} as const;

if (!JWT_CONFIG.ACCESS_TOKEN_SECRET) {
	throw new Error("JWT_ACCESS_TOKEN_SECRET is not set");
}

if (!JWT_CONFIG.REFRESH_TOKEN_SECRET) {
	throw new Error("JWT_REFRESH_TOKEN_SECRET is not set");
}