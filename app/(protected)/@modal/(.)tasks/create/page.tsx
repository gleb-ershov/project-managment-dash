import { FormLoadingFallback } from "@/src/presentation/components/shared/form-loading-fallback";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Create New Task" redirectPath={`/`}>
								<Suspense fallback={<FormLoadingFallback />}>
			
				<CreateTaskForm />
			</Suspense>
			</Modal>
		</Suspense>
	);
}
