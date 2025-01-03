"use client";

import { useActionState, useEffect, useMemo } from "react";
import { FORM_STATES } from "../../consts/forms-consts";
import { useAuth } from "../auth/use-auth";
import { useRouter } from "next/navigation";
import { generateButtonLabel } from "../../utils/generate-button-label";
import { toast } from "sonner";
import { updateProjectAction } from "@/app/actions/project/update-project.action";
import { createProjectAction } from "@/app/actions/project/create-project.action";

export const useProjectForm = (
	mode: "create" | "update",
	projectId?: string,
	onSuccess?: () => void,
	toastMessage?: string
) => {
	const { user } = useAuth();
	const { back } = useRouter();

	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const boundAction = useMemo(() => {
		if (mode === "create") {
			return createProjectAction.bind(null, user?.id || "");
		} else {
			return updateProjectAction.bind(null, projectId || "");
		}
	}, [mode, projectId, user?.id]);

	const [createState, createAction, isCreatePending] = useActionState(
		boundAction,
		{ success: false, error: null, data: null }
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundAction,
		{ success: false, error: null, data: null }
	);

	const IS_PENDING = isCreatePending || isUpdatePending;

	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);
	const formState = IS_UPDATE_FORM ? updateState : createState;
	useEffect(() => {
		const hasResult = updateState?.success || createState?.success;
		if (hasResult) {
			onSuccess?.();
			back();
			toast.success(
				toastMessage ||
					`Project was successfully ${
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
		updateState,
		createState,
		IS_PENDING,
		BUTTON_LABEL,
		formAction,
		formError,
	};
};
