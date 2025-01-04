import { FormLoadingFallback } from "@/src/presentation/components/shared/form-loading-fallback";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Create New Project" redirectPath="/projects">
				<Suspense fallback={<FormLoadingFallback />}>
					<CreateProjectForm />
				</Suspense>
			</Modal>
		</Suspense>
	);
}
