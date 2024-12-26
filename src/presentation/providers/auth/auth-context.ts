import { createContext } from "react";

export interface AuthContextUser {
	email: string;
	id: string;
	name: string;
	plan: string;
	surname: string;
	imageUrl: string;
}

interface AuthContextType {
	user: AuthContextUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
	refreshTokens: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	login: () => {},
	logout: () => {},
	refreshTokens: async () => {},
});
