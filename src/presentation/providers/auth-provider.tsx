"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextUser } from "@/src/types/auth-context";

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const [user, setUser] = useState<AuthContextUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			// Call API endpoint to verify auth status
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}api/users/current`,
				{
					method: "GET",
					credentials: "include", // Important for cookies
				}
			);

			if (!response.ok) {
				throw new Error("Not authenticated");
			}

			const data = await response.json();
			setUser(data.user);
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async () => {
		await checkAuth();
	};

	const logout = async () => {
		try {
			// Call logout API endpoint to clear cookies
			await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
				method: "POST",
				credentials: "include",
			});
			setUser(null);
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const refreshTokens = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
				{
					method: "POST",
					credentials: "include",
				}
			);

			if (!response.ok) throw new Error("Refresh failed");

			await checkAuth(); // Verify and set user state
		} catch {
			logout();
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				logout,
				refreshTokens,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
