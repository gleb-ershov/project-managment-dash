import { AddMembersForm } from "@/src/presentation/components/shared/add-members-form";
import { Modal } from "@/src/presentation/components/shared/modal";

export default async function AddProjectMemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const PROJECT_ID = (await params).id;

	return (
		<Modal title="Add members">
			<AddMembersForm entity="project" entityId={PROJECT_ID} />
		</Modal>
	);
}
