import { getTaskById } from "@/src/application/queries/task/get-task-by-id";
import { Modal } from "@/src/presentation/components/shared/modal";
import { CreateTaskForm } from "@/src/presentation/components/task/forms/create-task-form";
import { ProjectStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function EditTaskPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_TAKS = await getTaskById(id);

	if (!CURRENT_TAKS) {
		notFound();
	}

	const UPDATE_FORM_INITIAL_STATE = {
		...CURRENT_TAKS,
		status: CURRENT_TAKS.status as ProjectStatus,
	};

	return (
		<Modal title="Update task">
			<CreateTaskForm
				mode="update"
				taskId={id}
				initialState={UPDATE_FORM_INITIAL_STATE}
			/>
		</Modal>
	);
}
