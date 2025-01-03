import { getProjectById } from "@/src/application/queries/project/get-project-by-id";

import { ProjectStatus } from "@prisma/client";
import { notFound } from "next/navigation";
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

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_PROJECT = await getProjectById(id);

	if (!CURRENT_PROJECT.data) {
		notFound();
	}

	const UPDATE_FORM_INITIAL_STATE = {
		...CURRENT_PROJECT,
		status: CURRENT_PROJECT.data?.status as ProjectStatus,
	};

	return (
		<Suspense fallback={<ModalLoadingFallback />}></Suspense>
		<Modal title="Update project">
			{CURRENT_PROJECT.data && !CURRENT_PROJECT.error ? (
				<CreateProjectForm
					mode="update"
					projectId={id}
					initialState={UPDATE_FORM_INITIAL_STATE}
				/>
			) : (
				<div>
					<span>{CURRENT_PROJECT.error?.name}</span>
					<span>{CURRENT_PROJECT.error?.message}</span>
				</div>
			)}
		</Modal>
	);
}
