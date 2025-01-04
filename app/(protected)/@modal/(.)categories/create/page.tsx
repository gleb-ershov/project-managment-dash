import dynamic from "next/dynamic";
import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import { Suspense } from "react";
import { FormLoadingFallback } from "@/src/presentation/components/shared/form-loading-fallback";
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

export default function CreateProjectCategoryPage() {
	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Create New Category">
									<Suspense fallback={<FormLoadingFallback />}>
				
				<CreateCategoryForm />
				</Suspense>
			</Modal>
		</Suspense>
	);
}
