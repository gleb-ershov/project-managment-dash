import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import { formatUserName } from "@/src/presentation/utils/user/format-user-name";
import { getUser } from "@/src/application/queries/user/get-user";
import { ShareButton } from "../../shared/share-button";

export const UserProfile = async ({ userId }: { userId: string }) => {
	const USER_DATA = await getUser(userId);
	const USER_FULL_NAME = formatUserName(USER_DATA?.name, USER_DATA?.surname);
	const IMG_URL = USER_DATA?.imageUrl || "/avatar-placeholder.png";

	return (
		<Card className="dark:bg-[#18181B] p-4">
			<CardContent className="flex flex-row gap-8">
				<Image
					src={IMG_URL}
					alt={`${USER_FULL_NAME}'s profile`}
					width={140}
					height={140}
					className="rounded-full"
				/>
				<div className="flex flex-col w-full">
					<div className="flex items-start gap-4 flex-1">
						<div className="flex flex-col gap-2">
							<span className="text-sm text-muted-foreground">
								Name
							</span>
							<span className="font-medium text-white">
								{USER_FULL_NAME}
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm text-muted-foreground">
								Email
							</span>
							<span className="font-medium text-white">
								{USER_DATA?.email}
							</span>
						</div>
						<Badge variant="outline" className="ml-auto">
							{USER_DATA?.plan}
						</Badge>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm text-muted-foreground">
							Bio
						</span>
						<p className="font-normal text-muted-foreground">
							{USER_DATA?.description?.length
								? USER_DATA.description
								: "No additional info about this user."}
						</p>
					</div>
				</div>
			</CardContent>
			<ShareButton
				size="sm"
				className="border-0 dark:hover:bg-[#141414]"
			/>
		</Card>
	);
};
