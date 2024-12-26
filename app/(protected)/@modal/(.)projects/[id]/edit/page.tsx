import { getProjectById } from "@/src/application/queries/project/get-project-by-id";
import { CreateProjectForm } from "@/src/presentation/components/project/forms/create-project-form";
import { Modal } from "@/src/presentation/components/shared/modal";
import { ProjectStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const currentProject = await getProjectById(id);

	if (!currentProject) {
		notFound();
	}

	const updateFormInitialState = {
		...currentProject,
		status: currentProject.status as ProjectStatus,
	};

	return (
		<Modal title="Update project">
			<CreateProjectForm
				mode="update"
				projectId={id}
				initialState={updateFormInitialState}
			/>
		</Modal>
	);
}
