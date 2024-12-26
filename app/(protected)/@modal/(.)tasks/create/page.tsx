import { Modal } from "@/src/presentation/components/shared/modal";
import { CreateTaskForm } from "@/src/presentation/components/task/forms/create-task-form";

export default function CreateTaskPage() {
	return (
		<Modal title="Create New Task">
			<CreateTaskForm />
		</Modal>
	);
}
