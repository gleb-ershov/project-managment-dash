import { JWTPayload, TokenPair } from "@/src/types/jwt";

export interface IJWTService {
	generateAccessToken(
		payload: Omit<JWTPayload, "iat" | "exp">
	): Promise<string>;
	generateRefreshToken(
		payload: Omit<JWTPayload, "iat" | "exp">
	): Promise<string>;
	generateTokenPair(
		payload: Omit<JWTPayload, "iat" | "exp">
	): Promise<TokenPair>;
	verifyAccessToken(token: string): Promise<JWTPayload>;
	verifyRefreshToken(token: string): Promise<JWTPayload>;
	decodeToken(token: string): Promise<JWTPayload | null>;
}
