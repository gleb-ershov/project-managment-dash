import { getTaskById } from "@/src/application/queries/task/get-task-by-id";
import { ProjectStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import { FormLoadingFallback } from "@/src/presentation/components/shared/form-loading-fallback";

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

export default async function EditTaskPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_TASK = await getTaskById(id);

	if (!CURRENT_TASK.data) {
		notFound();
	}

	const UPDATE_FORM_INITIAL_STATE = {
		...CURRENT_TASK,
		status: CURRENT_TASK?.data?.status as ProjectStatus,
	};

	return (
		<Suspense fallback={<ModalLoadingFallback/>}>
		<Modal title="Update task" redirectPath={`/tasks/${id}`}>
			{CURRENT_TASK.data && !CURRENT_TASK.error ? (
									<Suspense fallback={<FormLoadingFallback />}>
				
				<CreateTaskForm
					mode="update"
					taskId={id}
					initialState={UPDATE_FORM_INITIAL_STATE}
				/>
			</Suspense>
			) : (
				<div>
					<span>{CURRENT_TASK.error?.name}</span>
					<span>{CURRENT_TASK.error?.message}</span>
				</div>
			)}
		</Modal>
		</Suspense>
	);
}
