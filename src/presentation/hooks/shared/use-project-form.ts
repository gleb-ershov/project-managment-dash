"use client";

import { useActionState, useEffect, useMemo } from "react";
import { FORM_STATES } from "../../consts/forms-consts";
import { useAuth } from "../auth/use-auth";
import { useRouter } from "next/navigation";
import { generateButtonLabel } from "../../utils/shared/generate-button-label";
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
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundAction,
		undefined
	);

	const IS_PENDING = isCreatePending || isUpdatePending;

	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);

	useEffect(() => {
		const hasResult = updateState?.id || createState?.id;
		if (hasResult) {
			onSuccess?.();
			back();
			toast.success(
				toastMessage ||
					`Project was successfully ${
						IS_UPDATE_FORM ? "updated" : "created"
					}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM, onSuccess]);

	return {
		IS_UPDATE_FORM,
		IS_PENDING,
		BUTTON_LABEL,
		createAction,
		updateAction,
	};
};
