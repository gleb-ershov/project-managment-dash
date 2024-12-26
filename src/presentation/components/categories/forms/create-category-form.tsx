"use client";

import { useActionState, useEffect, useMemo } from "react";

import { createProjectCategoryAction } from "@/app/actions/project-category/create-project-category.action";
import { updateProjectCategoryAction } from "@/app/actions/project-category/update-project-category.action";

import { toast } from "sonner";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { FORM_STATES } from "@/src/presentation/consts/forms-consts";
import { generateButtonLabel } from "@/src/presentation/utils/shared/generate-button-label";

interface CreateCategoryInitialState {
	name: string;
}

interface CreateCategoryFormProps {
	initialState?: CreateCategoryInitialState;
	teamId?: string;
	mode?: "create" | "update";
	onSuccess?: () => void;
}

export const CreateCategoryForm = (props: CreateCategoryFormProps) => {
	const { initialState, mode = "create", onSuccess, teamId } = props;

	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);
	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);
	const boundUpdateAction = useMemo(
		() => updateProjectCategoryAction.bind(null, teamId || ""),
		[teamId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createProjectCategoryAction,
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundUpdateAction,
		undefined
	);

	const IS_PENDING = isCreatePending || isUpdatePending;

	useEffect(() => {
		const hasResult = updateState?.id || createState?.id;
		if (hasResult) {
			onSuccess?.();
			toast.success(
				`Project category ${
					IS_UPDATE_FORM ? updateState?.name : createState?.name
				} was successfully ${IS_UPDATE_FORM ? "updated" : "created"}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM, onSuccess]);

	return (
		<form action={IS_UPDATE_FORM ? updateAction : createAction}>
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
