export interface JWTPayload {
	// Standard JWT claims
	iss?: string; // issuer
	sub?: string; // subject (usually user id)
	aud?: string; // audience
	exp?: number; // expiration time
	nbf?: number; // not before
	iat?: number; // issued at
	jti?: string; // JWT ID

	// Custom claims
	userId: string;
	email: string;
}

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}
