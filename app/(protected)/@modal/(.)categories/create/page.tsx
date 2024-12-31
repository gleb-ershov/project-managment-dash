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

export default function CreateProjectPage() {
	return (
		<Modal title="Create New Category">
			<CreateCategoryForm />
		</Modal>
	);
}
