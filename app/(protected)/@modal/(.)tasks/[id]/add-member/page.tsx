import { FormLoadingFallback } from "@/src/presentation/components/shared/form-loading-fallback";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const AddMembersForm = dynamic(() =>
	import("@/src/presentation/components/shared/add-members-form").then(
		(component) => component.AddMembersForm
	)
);

export default async function AddTaskMemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const TASK_ID = (await params).id;

	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Add members" redirectPath={`/tasks/${TASK_ID}`}>
								<Suspense fallback={<FormLoadingFallback />}>
			
				<AddMembersForm entity="task" entityId={TASK_ID} />
				</Suspense>
			</Modal>
		</Suspense>
	);
}
