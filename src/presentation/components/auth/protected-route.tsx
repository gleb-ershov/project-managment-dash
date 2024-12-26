"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../hooks/auth/use-auth";
import { Progress } from "../ui/progress";
import { useProgress } from "../../hooks/shared/use-simulated-progress";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	const progressStatus = useProgress(isLoading);

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isLoading, isAuthenticated, router]);

	// if (isLoading) {
	// 	return (
	// 		<div className="flex h-screen w-full items-center justify-center">
	// 			<Progress value={progressStatus} className="w-1/5" />
	// 		</div>
	// 	);
	// }
	return isAuthenticated ? <>{children}</> : null;
};
