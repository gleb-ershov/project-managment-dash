"use client";

import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { cn } from "@/src/presentation/utils/shared/cn";
import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react";

interface UserSettingsButtonProps extends Partial<LinkProps> {
	userId: string;
	className?: string;
}

export const UserSettingsButton = (props: UserSettingsButtonProps) => {
	const { userId, className } = props;
	const { user } = useAuth();
	return (
		<>
			{user?.id === userId ? (
				<Link
					href={`/users/${userId}/settings`}
					className={cn(
						"flex items-center gap-2 rounded-xl bg-[#664BDD] px-4 py-3 text-white shadow-sm",
						className
					)}
				>
					Settings
				</Link>
			) : null}
		</>
	);
};
