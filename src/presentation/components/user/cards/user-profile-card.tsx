import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import { formatUserName } from "@/src/presentation/utils/user/format-user-name";
import { getUser } from "@/src/application/queries/user/get-user";

export const UserProfile = async ({ userId }: { userId: string }) => {
	const USER_DATA = await getUser(userId);
	const USER_FULL_NAME = formatUserName(USER_DATA?.name, USER_DATA?.surname);
	const IMG_URL = USER_DATA?.imageUrl || "/avatar-placeholder.png";

	return (
		<Card>
			<CardHeader>
				<Image
					src={IMG_URL}
					alt={`${USER_FULL_NAME}'s profile`}
					width={72}
					height={72}
					className="rounded-full"
				/>
				<CardTitle>{USER_FULL_NAME}</CardTitle>
				<CardDescription>{USER_DATA?.email}</CardDescription>
			</CardHeader>

			<CardContent>
				<p>{USER_DATA?.description}</p>
				<Badge variant="outline" className="mt-2">
					{USER_DATA?.plan}
				</Badge>
			</CardContent>
		</Card>
	);
};

export default UserProfile;
