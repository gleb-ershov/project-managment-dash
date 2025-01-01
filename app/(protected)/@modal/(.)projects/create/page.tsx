import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const CreateProjectForm = dynamic(() =>
	import(
		"@/src/presentation/components/project/forms/create-project-form"
	).then((mod) => mod.CreateProjectForm)
);

export default function CreateProjectPage() {
	return (
		<Modal title="Create New Project">
			<CreateProjectForm />
		</Modal>
	);
}
