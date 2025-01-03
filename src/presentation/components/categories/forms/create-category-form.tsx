"use client";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useCategoryForm } from "@/src/presentation/hooks/project-categories/use-category-form";

interface CreateCategoryInitialState {
	name: string;
}

interface CreateCategoryFormProps {
	initialState?: CreateCategoryInitialState;
	categoryId?: string;
	mode?: "create" | "update";
	onSuccess?: () => void;
}

export const CreateCategoryForm = (props: CreateCategoryFormProps) => {
	const { initialState, mode = "create", onSuccess, categoryId } = props;
	const { formAction, formError, BUTTON_LABEL, IS_PENDING } = useCategoryForm(
		mode,
		categoryId,
		onSuccess
	);

	return (
		<form action={formAction}>
			<Input
				type="text"
				placeholder="Category Name"
				required
				name="name"
				defaultValue={initialState?.name}
			/>
			<Button type="submit" disabled={IS_PENDING}>
				{BUTTON_LABEL}
			</Button>
		</form>
	);
};
