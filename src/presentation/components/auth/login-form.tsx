"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth/login.action";
import { setAuthCookies } from "@/src/infrastructure/utils/cookies";

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
		<form className="mt-8 space-y-6" action={submitAction}>
			<div className="rounded-md shadow-sm space-y-4">
				<div>
					<label htmlFor="email" className="sr-only">
						Email address
					</label>
					<input
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
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
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

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label
						htmlFor="remember-me"
						className="ml-2 block text-sm text-gray-900"
					>
						Remember me
					</label>
				</div>

				<div className="text-sm">
					<a
						href="#"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={isPending}
					className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
						isPending
							? "bg-indigo-400 cursor-not-allowed"
							: "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
				</button>
			</div>
		</form>
	);
};
