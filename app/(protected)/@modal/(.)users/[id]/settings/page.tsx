import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import { Modal } from "@/src/presentation/components/shared/modal";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/presentation/components/ui/tabs";
import { UpdateUserForm } from "@/src/presentation/components/user/forms/update-user-form";

export default async function UserSettingsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const USER_ID = (await params).id;
	const CURRENT_USER = await getCurrentUser();

	return (
		<Modal title="User Settings">
			<Tabs className="flex flex-col gap-2">
				<TabsList>
					<TabsTrigger value="overview" className="w-1/2">
						Overview
					</TabsTrigger>
					<TabsTrigger value="settings" className="w-1/2" disabled>
						Settings
					</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					{CURRENT_USER ? (
						<UpdateUserForm user={CURRENT_USER} />
					) : null}
				</TabsContent>
			</Tabs>
		</Modal>
	);
}
