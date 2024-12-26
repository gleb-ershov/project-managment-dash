import { NextRequest } from "next/server";

interface UserPayload {
	userId: string;
	email: string;
}

export interface AuthenticatedRequest extends NextRequest {
	user?: UserPayload;
}
