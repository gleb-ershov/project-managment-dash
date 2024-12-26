"use client";

import { useState, forwardRef } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import { Input } from "@/src/presentation/components/ui/input";
import { cn } from "@/src/presentation/utils/shared/cn";

const PasswordInput = forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);
	const disabled = props.disabled;

	return (
		<div className="relative">
			<Input
				className={cn("hide-password-toggle pr-10", className)}
				ref={ref}
				{...props}
				type={showPassword ? "text" : "password"}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
				onClick={() => setShowPassword((prev) => !prev)}
				disabled={disabled}
			>
				{!showPassword ? (
					<EyeIcon className="h-4 w-4" aria-hidden="true" />
				) : (
					<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
				)}
				<span className="sr-only">
					{showPassword ? "Hide password" : "Show password"}
				</span>
			</Button>

			<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
		</div>
	);
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
