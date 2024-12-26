import { CreateProjectForm } from "@/src/presentation/components/project/forms/create-project-form";
import { Modal } from "@/src/presentation/components/shared/modal";

export default function CreateProjectPage() {
	return (
		<Modal title="Create New Project">
			<CreateProjectForm />
		</Modal>
	);
}
