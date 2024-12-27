"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth/login.action";
import { setAuthCookies } from "@/src/infrastructure/utils/cookies";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";

export const LoginForm = () => {
	const router = useRouter();

	const [state, submitAction, isPending] = useActionState(
		async (currentState: unknown, formData: FormData) => {
			try {
				const credentials = {
					email: formData.get("email") as string,
					password: formData.get("password") as string,
				};

				const response = await login(credentials);
				const { data } = response;
				if (data?.accessToken && data?.refreshToken) {
					await setAuthCookies(data.accessToken, data.refreshToken);
				}

				router.push("/");
				return {
					data: response,
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					error:
						error instanceof Error ? error.message : "Login failed",
				};
			}
		},
		undefined
	);

	return (
		<form className="mt-8 space-y-6 w-[90%] mx-auto" action={submitAction}>
			<div className="rounded-md shadow-sm space-y-4">
				<div>
					<Label htmlFor="email" className="sr-only">
						Email address
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>

				<div>
					<Label htmlFor="password" className="sr-only">
						Password
					</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			{state && state.error && (
				<div className="text-red-500 text-sm text-center">
					{state.error}
				</div>
			)}
			<div>
				<Button
					type="submit"
					disabled={isPending}
					className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
						isPending
							? "cursor-not-allowed"
							: "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					}`}
				>
					{isPending ? (
						<span className="flex items-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Signing in...
						</span>
					) : (
						"Sign in"
					)}
				</Button>

				<Link
					href="/sign-up"
					className="text-sm text-center text-gray-700 mx-auto mt-4"
				>
					Don&apos;t have an account? Sign up
				</Link>
			</div>
		</form>
	);
};
