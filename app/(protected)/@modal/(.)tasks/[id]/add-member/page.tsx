import { AddMembersForm } from "@/src/presentation/components/shared/add-members-form";
import { Modal } from "@/src/presentation/components/shared/modal";

export default async function AddTaskMemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const TASK_ID = (await params).id;

	return (
		<Modal>
			<AddMembersForm entity="task" entityId={TASK_ID} />
		</Modal>
	);
}
