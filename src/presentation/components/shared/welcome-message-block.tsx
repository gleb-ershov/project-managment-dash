"use client";

import { memo } from "react";
import { useAuth } from "../../hooks/auth/use-auth";
import { formatUserName } from "../../utils/user/format-user-name";
import { cn } from "@/src/presentation/utils/shared/cn";

interface WelcomeMessageBlockProps {
	className?: string;
}

export const WelcomeMessageBlock = memo(
	({ className }: WelcomeMessageBlockProps) => {
		const { user } = useAuth();

		if (!user) {
			return null;
		}

		const formattedName = formatUserName(user.name, user.surname);

		return (
			<div className={cn("flex flex-col gap-2", className)}>
				<h1
					className={cn(
						"text-5xl font-extralight",
						"text-[#505052] dark:text-gray-400",
						"transition-colors duration-300"
					)}
				>
					Hello,{" "}
					<span
						className={cn(
							"font-medium",
							"text-black dark:text-white",
							"transition-colors duration-300"
						)}
					>
						{formattedName}
					</span>
				</h1>
				<span
					className={cn(
						"text-[18px] font-normal",
						"text-[#878789] dark:text-[#cacad1]",
						"transition-colors duration-300"
					)}
				>
					Let&apos;s get things done!
				</span>
			</div>
		);
	}
);

WelcomeMessageBlock.displayName = "WelcomeMessageBlock";
