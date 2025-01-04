import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import { formatUserName } from "@/src/presentation/utils/format-user-name";
import { getUser } from "@/src/application/queries/user/get-user";
import { ShareButton } from "../../shared/share-button";
import { memo } from "react";

const InfoField = memo(({ label, value }: { label: string; value: string }) => (
	<div className="flex flex-col gap-1 sm:gap-2">
		<span className="text-xs sm:text-sm text-muted-foreground">
			{label}
		</span>
		<span className="text-sm sm:text-base font-medium text-white break-words">
			{value}
		</span>
	</div>
));

const UserBadge = memo(
	({ plan, className }: { plan: string; className: string }) => (
		<Badge
			variant="outline"
			className={`text-xs sm:text-sm whitespace-nowrap ${className}`}
		>
			{plan}
		</Badge>
	)
);

export const UserProfileSkeleton = () => (
	<Card className="dark:bg-[#18181B] p-3 sm:p-4 w-full max-w-[95%] mx-auto transition-all duration-300 ease-in-out">
		<CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-8">
			<div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-[140px] lg:h-[140px] rounded-full bg-[#383838] animate-pulse mx-auto sm:mx-0" />
			<div className="flex flex-col w-full gap-4">
				<div className="flex flex-col sm:flex-row items-start gap-4">
					{["Name", "Email"].map((label) => (
						<div
							key={label}
							className="flex flex-col gap-2 w-full sm:w-auto"
						>
							<span className="text-xs sm:text-sm text-muted-foreground animate-pulse">
								{label}
							</span>
							<span className="text-sm sm:text-base font-medium text-white animate-pulse">
								Loading...
							</span>
						</div>
					))}
					<Badge
						variant="outline"
						className="hidden sm:inline-flex ml-auto animate-pulse"
					>
						Loading...
					</Badge>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-xs sm:text-sm text-muted-foreground animate-pulse">
						Bio
					</span>
					<p className="text-sm sm:text-base font-normal text-muted-foreground animate-pulse">
						Loading...
					</p>
				</div>
			</div>
		</CardContent>
		<div className="flex items-center justify-between mt-3 sm:mt-4">
			<ShareButton
				disabled
				size="sm"
				className="border-0 dark:hover:bg-[#141414]"
			/>
			<Badge variant="outline" className="sm:hidden animate-pulse">
				Loading...
			</Badge>
		</div>
	</Card>
);

export const UserProfile = memo(async ({ userId }: { userId: string }) => {
	const { data } = await getUser(userId);
	const userFullName = formatUserName(data?.name, data?.surname);
	const imgUrl = data?.imageUrl || "/avatar-placeholder.png";
	const description = data?.description?.length
		? data.description
		: "No additional info about this user.";

	return (
		<Card className="dark:bg-[#18181B] p-3 w-full sm:p-4 mx-auto transition-all duration-300 ease-in-out">
			<CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-8">
				{/* Profile Image */}
				<div className="flex justify-center sm:block">
					<div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[140px] lg:h-[140px]">
						<Image
							src={imgUrl}
							alt={`${userFullName}'s profile`}
							width={140}
							height={140}
							className="
             rounded-full object-cover transition-transform 
             duration-300 hover:scale-105"
						/>
					</div>
				</div>

				{/* User Information */}
				<div className="flex flex-col w-full gap-4 sm:gap-6">
					{/* Main Info Section */}
					<div className="flex flex-col sm:flex-row items-start gap-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
							<InfoField label="Name" value={userFullName} />
							<InfoField
								label="Email"
								value={data?.email || ""}
							/>
						</div>
						<UserBadge
							plan={data?.plan || ""}
							className="hidden sm:inline-flex ml-auto"
						/>
					</div>

					{/* Bio Section */}
					<div className="flex flex-col gap-2">
						<span className="text-xs sm:text-sm text-muted-foreground">
							Bio
						</span>
						<p
							className="text-sm sm:text-base font-normal text-muted-foreground
                                    line-clamp-3 sm:line-clamp-none"
						>
							{description}
						</p>
					</div>
				</div>
			</CardContent>

			{/* Footer Section */}
			<div
				className="flex items-center justify-between mt-3 sm:mt-4 
                          border-t dark:border-gray-700 pt-3 sm:pt-4"
			>
				<ShareButton
					size="sm"
					className="border-0 dark:hover:bg-[#141414] transition-colors"
				/>
				<UserBadge plan={data?.plan || ""} className="sm:hidden" />
			</div>
		</Card>
	);
});

// Add display names for better debugging
UserProfile.displayName = "UserProfile";
UserProfileSkeleton.displayName = "UserProfileSkeleton";
InfoField.displayName = "InfoField";
UserBadge.displayName = "UserBadge";
