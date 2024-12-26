import { CreateCategoryForm } from "@/src/presentation/components/categories/forms/create-category-form";
import { Modal } from "@/src/presentation/components/shared/modal";

export default function CreateProjectPage() {
	return (
		<Modal title="Create New Category">
			<CreateCategoryForm />
		</Modal>
	);
}
