import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/presentation/components/ui/tabs";
import { UpdateUserForm } from "@/src/presentation/components/user/forms/update-user-form";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

export default async function UserSettingsPage() {
	const CURRENT_USER = await getCurrentUser();

	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="User Settings">
				<Tabs className="flex flex-col gap-2">
					<TabsList>
						<TabsTrigger value="overview" className="w-1/2">
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="settings"
							className="w-1/2"
							disabled
						>
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
		</Suspense>
	);
}
