import dynamic from "next/dynamic";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import { Suspense } from "react";
const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const CreateCategoryForm = dynamic(() =>
	import(
		"@/src/presentation/components/categories/forms/create-category-form"
	).then((mod) => mod.CreateCategoryForm)
);

export default function CreateProjectPage() {
	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Create New Category">
				<CreateCategoryForm />
			</Modal>
		</Suspense>
	);
}
