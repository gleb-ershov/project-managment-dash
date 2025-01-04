import { getProjectCategoryById } from "@/src/application/queries/project-categories/get-project-category-by-id";
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

const CreateCategoryForm = dynamic(() =>
	import(
		"@/src/presentation/components/categories/forms/create-category-form"
	).then((mod) => mod.CreateCategoryForm)
);

export default async function EditProjectCategoryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_CATEGORY = await getProjectCategoryById(id);

	if (!CURRENT_CATEGORY.data) {
		notFound();
	}
	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Update project" redirectPath={`/projects/${id}`}>
				{CURRENT_CATEGORY.data && !CURRENT_CATEGORY.error ? (
					<Suspense fallback={<FormLoadingFallback />}>
					<CreateCategoryForm
						mode="update"
						categoryId={id}
						initialState={CURRENT_CATEGORY.data}
					/>
					</Suspense>
				) : (
					<div>
						<span>{CURRENT_CATEGORY.error?.name}</span>
						<span>{CURRENT_CATEGORY.error?.message}</span>
					</div>
				)}
			</Modal>
		</Suspense>
	);
}
