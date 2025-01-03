import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { cn } from "@/src/presentation/utils/cn";
import Link, { LinkProps } from "next/link";

interface UserSettingsButtonProps extends Partial<LinkProps> {
	userId: string;
	currentUserId: string;
	className?: string;
}

export const UserSettingsButton = (props: UserSettingsButtonProps) => {
	const { userId, className, currentUserId } = props;
	return (
		<>
			{currentUserId === userId ? (
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
