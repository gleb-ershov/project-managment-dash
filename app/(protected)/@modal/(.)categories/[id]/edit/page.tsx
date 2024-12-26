import { getProjectById } from "@/src/application/queries/project/get-project-by-id";
import { CreateCategoryForm } from "@/src/presentation/components/categories/forms/create-category-form";
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
	//TODO
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
