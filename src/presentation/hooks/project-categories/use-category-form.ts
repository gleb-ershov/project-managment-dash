import { useActionState, useEffect, useMemo } from "react";
import { FORM_STATES } from "../../consts/forms-consts";
import { useRouter } from "next/navigation";
import { generateButtonLabel } from "../../utils/generate-button-label";
import { toast } from "sonner";
import { updateProjectCategoryAction } from "@/app/actions/project-category/update-project-category.action";
import { createProjectCategoryAction } from "@/app/actions/project-category/create-project-category.action";

export const useCategoryForm = (
	mode: "create" | "update",
	categoryId?: string,
	onSuccess?: () => void,
	toastMessage?: string
) => {
	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);
	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);

	const boundAction = useMemo(() => {
		if (mode === "create") {
			return createProjectCategoryAction;
		} else {
			return updateProjectCategoryAction.bind(null, categoryId || "");
		}
	}, [mode, categoryId]);

	const [createState, createAction, isCreatePending] = useActionState(
		boundAction,
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundAction,
		undefined
	);

	const IS_PENDING = isCreatePending || isUpdatePending;
	const { back } = useRouter();

	const formState = IS_UPDATE_FORM ? updateState : createState;

	useEffect(() => {
		const hasResult = updateState?.success || createState?.success;
		if (hasResult) {
			onSuccess?.();
			back();
			toast.success(
				toastMessage ||
					`Category was successfully ${
						IS_UPDATE_FORM ? "updated" : "created"
					}!`
			);
		} else if (formState?.error?.message) {
			toast.error(formState?.error?.message);
		}
	}, [updateState?.success, createState?.success, IS_UPDATE_FORM, onSuccess]);

	const createError = createState?.error?.formFieldErrors;
	const updateError = updateState?.error?.formFieldErrors;
	const formError = IS_UPDATE_FORM ? updateError : createError;

	const formAction = IS_UPDATE_FORM ? updateAction : createAction;

	return {
		createState,
		updateState,
		IS_PENDING,
		BUTTON_LABEL,
		formAction,
		formError,
	};
};
