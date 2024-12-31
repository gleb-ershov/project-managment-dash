import { getProjectCategoryById } from "@/src/application/queries/project-categories/get-project-category-by-id";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const CreateCategoryForm = dynamic(
	() =>
		import(
			"@/src/presentation/components/categories/forms/create-category-form"
		).then((mod) => mod.CreateCategoryForm),
	{
		ssr: false, // Отключаем серверный рендеринг для модального окна
	}
);

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_CATEGORY = await getProjectCategoryById(id);

	if (!CURRENT_CATEGORY) {
		notFound();
	}
	return (
		<Modal title="Update project">
			<CreateCategoryForm
				mode="update"
				categoryId={id}
				initialState={CURRENT_CATEGORY}
			/>
		</Modal>
	);
}
