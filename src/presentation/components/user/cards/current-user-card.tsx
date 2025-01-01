"use client";

import { LogOut, Mail, Share2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../../hooks/auth/use-auth";
import Link from "next/link";

const CurrentUserCardSkeleton = () => {
	return (
		<div className="mx-auto flex w-[85%] items-center gap-1.5 h-[40px]">
			<div className="rounded-full h-[34px] w-[34px] bg-[#30294F] dark:bg-[#272525] animate-pulse" />
			<div className="flex flex-col justify-center gap-2">
				<span className="h-[13px] animate-pulse w-[140px] bg-[#30294F] dark:bg-[#272525]" />
				<span className="h-[11px] animate-pulse w-[100px] bg-[#30294F] dark:bg-[#272525]" />
			</div>
		</div>
	);
};

export const CurrentUserCard = () => {
	const { user, logout } = useAuth();

	return (
		<div className="mx-auto mb-4 mt-4 w-[90%] rounded-lg bg-[#0C0A25] py-3 shadow-sm dark:bg-[#131212]">
			{user ? (
				<div className="mx-auto flex w-[85%] items-center gap-1.5">
					<Image
						className="rounded-full"
						width={34}
						height={34}
						src={user?.imageUrl || "/avatar-placeholder.png"}
						alt="profile picture"
					/>
					<div className="flex flex-col justify-center">
						<Link
							href={`/users/${user?.id}`}
							className="text-[13px] text-white h-[20px]"
						>{`${user?.name} ${user?.surname}`}</Link>
						<span className="text-[11px] text-[#9691A9] h-[20px]">
							{user?.email}
						</span>
					</div>
				</div>
			) : (
				<CurrentUserCardSkeleton />
			)}
			<div className="mt-4 flex w-[90%] items-center gap-2">
				<button
					className="ml-4 rounded-lg bg-[#30294F] p-1.5 dark:bg-[#272525]"
					disabled={!!user}
				>
					<Mail size={14} color="white" />
				</button>
				<button
					className="rounded-lg bg-[#30294F] p-1.5 dark:bg-[#272525]"
					disabled={!!user}
				>
					<Share2 size={14} color="white" />
				</button>
				<button
					disabled={!!user}
					className="ml-auto rounded-lg bg-white p-1.5 duration-300 hover:bg-gray-200 active:scale-95"
					onClick={() => logout()}
				>
					<LogOut size={14} color="black" />
				</button>
			</div>
		</div>
	);
};
