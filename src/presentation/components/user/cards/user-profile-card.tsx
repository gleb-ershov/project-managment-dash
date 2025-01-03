import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import { formatUserName } from "@/src/presentation/utils/user/format-user-name";
import { getUser } from "@/src/application/queries/user/get-user";
import { ShareButton } from "../../shared/share-button";

export const UserProfile = async ({ userId }: { userId: string }) => {
	const USER_DATA = await getUser(userId);
	const { data } = USER_DATA;
	const USER_FULL_NAME = formatUserName(data?.name, data?.surname);
	const IMG_URL = data?.name || "/avatar-placeholder.png";

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
								{data?.email}
							</span>
						</div>
						<Badge variant="outline" className="ml-auto">
							{data?.plan}
						</Badge>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm text-muted-foreground">
							Bio
						</span>
						<p className="font-normal text-muted-foreground">
							{data?.description?.length
								? data.description
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
