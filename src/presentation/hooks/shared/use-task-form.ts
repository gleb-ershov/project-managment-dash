"use client";

import { createTaskAction } from "@/app/actions/task/create-task.action";
import { updateTaskAction } from "@/app/actions/task/update-task.action";
import { useActionState, useEffect, useMemo } from "react";
import { FORM_STATES } from "../../consts/forms-consts";
import { useAuth } from "../auth/use-auth";
import { useRouter } from "next/navigation";
import { generateButtonLabel } from "../../utils/shared/generate-button-label";
import { toast } from "sonner";

export const useTaskForm = (
	mode: "create" | "update",
	taskId?: string,
	onSuccess?: () => void,
	toastMessage?: string
) => {
	const { user } = useAuth();
	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const boundAction = useMemo(() => {
		if (mode === "create") {
			return createTaskAction.bind(null, user?.id || "");
		} else {
			return updateTaskAction.bind(null, taskId || "");
		}
	}, [mode, taskId, user?.id]);

	const [createState, createAction, isCreatePending] = useActionState(
		boundAction,
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundAction,
		undefined
	);
	const { back } = useRouter();

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
					`Task was successfully ${
						IS_UPDATE_FORM ? "updated" : "created"
					}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM, onSuccess]);

	return {
		createState,
		updateState,
		IS_UPDATE_FORM,
		IS_PENDING,
		BUTTON_LABEL,
		createAction,
		updateAction,
	};
};
