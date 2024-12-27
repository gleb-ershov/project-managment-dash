import { getProjectCategoryById } from "@/src/application/queries/project-categories/get-project-category-by-id";
import { CreateCategoryForm } from "@/src/presentation/components/categories/forms/create-category-form";
import { Modal } from "@/src/presentation/components/shared/modal";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const currentCategory = await getProjectCategoryById(id);

	if (!currentCategory) {
		notFound();
	}
	return (
		<Modal title="Update project">
			<CreateCategoryForm
				mode="update"
				categoryId={id}
				initialState={currentCategory}
			/>
		</Modal>
	);
}
