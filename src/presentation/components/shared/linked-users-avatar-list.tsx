import { memo } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { UserViewModel } from "@/src/application/view-models/user.view-model";

export const LinkedUserAvatar = memo(
	({ id, name, surname, imageUrl }: UserViewModel) => (
		<Tooltip key={id}>
			<TooltipTrigger>
				<Link href={`/users/${id}/profile`}>
					<Image
						src={imageUrl || "/avatar-placeholder.png"}
						width={24}
						height={24}
						alt={`${name} ${surname}`}
						className="max-h-[24px] max-w-[24px] rounded-full object-cover"
					/>
				</Link>
			</TooltipTrigger>
			<TooltipContent>{`${name} ${surname}`}</TooltipContent>
		</Tooltip>
	)
);
LinkedUserAvatar.displayName = "LinkedUserAvatar";

export const LinkedUsersAvatarList = memo(
	({
		members,
		labelVisible = true,
	}: {
		members: UserViewModel[];
		labelVisible?: boolean;
	}) => {
		const visibleMembers = members.slice(0, 3);
		const remainingCount = members.length - visibleMembers.length;

		return (
			<TooltipProvider>
				<div className="flex flex-col gap-1">
					{labelVisible ? (
						<span className="text-sm text-[#777778]">Members</span>
					) : null}
					<span className="flex items-center gap-2 text-[12px]">
						{members.length > 0 ? (
							<>
								{visibleMembers.map((member) => (
									<LinkedUserAvatar
										key={member.id}
										{...member}
									/>
								))}
								{remainingCount > 0 && (
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
												+{remainingCount}
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-xs">
												{members
													.slice(3)
													.map((m) => m.name)
													.join(", ")}
											</p>
										</TooltipContent>
									</Tooltip>
								)}
							</>
						) : (
							"No members"
						)}
					</span>
				</div>
			</TooltipProvider>
		);
	}
);

LinkedUsersAvatarList.displayName = "LinkedUsersAvatarList";
