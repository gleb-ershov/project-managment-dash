import { JWT_CONFIG } from "../config/jwt.config";
import { JWTPayload } from "../../types/jwt";
import * as jose from "jose";

export class JWTService {
	static async generateAccessToken(payload: Omit<JWTPayload, "iat" | "exp">) {
		const secret = new TextEncoder().encode(JWT_CONFIG.ACCESS_TOKEN_SECRET);

		const token = await new jose.SignJWT({ ...payload })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN)
			.sign(secret);

		return token;
	}

	static async generateRefreshToken(
		payload: Omit<JWTPayload, "iat" | "exp">
	) {
		const secret = new TextEncoder().encode(
			JWT_CONFIG.REFRESH_TOKEN_SECRET
		);

		const token = await new jose.SignJWT({ ...payload })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN)
			.sign(secret);

		return token;
	}

	static async generateTokenPair(payload: Omit<JWTPayload, "iat" | "exp">) {
		const accessToken = await new jose.SignJWT({ ...payload })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN)
			.sign(new TextEncoder().encode(JWT_CONFIG.ACCESS_TOKEN_SECRET));

		const refreshToken = await new jose.SignJWT({ ...payload })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN)
			.sign(new TextEncoder().encode(JWT_CONFIG.REFRESH_TOKEN_SECRET));

		return { accessToken, refreshToken };
	}

	static async verifyAccessToken(token: string): Promise<JWTPayload> {
		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const secret = new TextEncoder().encode(
				JWT_CONFIG.ACCESS_TOKEN_SECRET
			);

			const { payload } = await jose.jwtVerify(token, secret);

			if (!payload.userId || !payload.email) {
				console.error("Invalid payload structure:", payload);
				throw new Error("Invalid token payload structure");
			}

			return {
				userId: payload.userId as string,
				email: payload.email as string,
				iat: payload.iat as number,
				exp: payload.exp as number,
			};
		} catch (error) {
			if (error instanceof jose.errors.JWTExpired) {
				throw new Error("Token has expired");
			}

			throw new Error("Invalid access token");
		}
	}

	static async verifyRefreshToken(token: string): Promise<JWTPayload> {

		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const secret = new TextEncoder().encode(
				JWT_CONFIG.REFRESH_TOKEN_SECRET
			);

			const { payload } = await jose.jwtVerify(token, secret);

			if (!payload.userId || !payload.email) {
				console.error("Invalid payload structure:", payload);
				throw new Error("Invalid token payload structure");
			}

			return {
				userId: payload.userId as string,
				email: payload.email as string,
				iat: payload.iat as number,
				exp: payload.exp as number,
			};
		} catch (error) {
			if (error instanceof jose.errors.JWTExpired) {
				throw new Error("Token has expired");
			}

			throw new Error("Invalid access token");
		}
	}

	static async decodeToken(token: string): Promise<JWTPayload | null> {
		try {
			const decoded = jose.decodeJwt(token);

			if (!decoded.userId || !decoded.email) {
				return null;
			}

			return {
				userId: decoded.userId as string,
				email: decoded.email as string,
				role: decoded.role as string | undefined,
				iat: decoded.iat,
				exp: decoded.exp,
			} as JWTPayload;
		} catch {
			return null;
		}
	}
}
