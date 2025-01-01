import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
		)
	);

const CreateTaskForm = dynamic(() =>
	import("@/src/presentation/components/task/forms/create-task-form").then(
		(component) => component.CreateTaskForm
	)
);

export default function CreateTaskPage() {
	return (
		<Modal title="Create New Task">
			<CreateTaskForm />
		</Modal>
	);
}
