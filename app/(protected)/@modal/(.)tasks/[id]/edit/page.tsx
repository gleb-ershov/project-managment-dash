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
	const currentTask = await getTaskById(id);

	if (!currentTask) {
		notFound();
	}

	const updateFormInitialState = {
		...currentTask,
		status: currentTask.status as ProjectStatus,
	};

	return (
		<Modal title="Update task">
			<CreateTaskForm
				mode="update"
				taskId={id}
				initialState={updateFormInitialState}
			/>
		</Modal>
	);
}
