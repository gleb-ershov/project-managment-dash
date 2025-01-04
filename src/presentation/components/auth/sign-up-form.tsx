"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/actions/auth/register.action";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../shared/spinner";

export const SignUpForm = () => {
	const router = useRouter();

	const [state, submitAction, isPending] = useActionState(
		async (currentState: unknown, formData: FormData) => {
			try {
				const userData = {
					name: formData.get("firstName") as string,
					surname: formData.get("lastName") as string,
					email: formData.get("email") as string,
					password: formData.get("password") as string,
					confirmPassword: formData.get("confirmPassword") as string,
				};

				// Validate passwords match
				if (userData.password !== userData.confirmPassword) {
					throw new Error("Passwords do not match");
				}

				// You'll need to implement this action
				const response = await register(userData);
				router.push("/login");

				return {
					data: response,
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					error:
						error instanceof Error
							? error.message
							: "Registration failed",
				};
			}
		},
		undefined
	);

	return (
		<form className="mt-8 space-y-6 w-[90%] mx-auto" action={submitAction}>
			<div className="rounded-md shadow-sm space-y-4">
				<div className="flex gap-4">
					<div>
						<Label htmlFor="firstName" className="sr-only">
							First Name
						</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							required
							className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="First Name"
						/>
					</div>
					<div>
						<Label htmlFor="lastName" className="sr-only">
							Last Name
						</Label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
							required
							className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Last Name"
						/>
					</div>
				</div>

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
						required
						className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>

				<div>
					<Label htmlFor="confirmPassword" className="sr-only">
						Confirm Password
					</Label>
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						required
						className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Confirm Password"
					/>
				</div>
			</div>

			{state && state.error && (
				<div className="text-red-500 text-sm text-center">
					{state.error}
				</div>
			)}

			<div>
				<button
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
							<Spinner className="-ml-1 mr-3" />
							Creating account...
						</span>
					) : (
						"Sign up"
					)}
				</button>
			</div>

			<div className="text-sm text-center">
				<span className="text-gray-600">Already have an account?</span>{" "}
				<Link href="/login" className="font-medium">
					Sign in
				</Link>
			</div>
		</form>
	);
};
