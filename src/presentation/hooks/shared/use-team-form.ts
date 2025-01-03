import { useActionState, useEffect, useMemo } from "react";
import { FORM_STATES } from "../../consts/forms-consts";
import { useRouter } from "next/navigation";
import { generateButtonLabel } from "../../utils/shared/generate-button-label";
import { toast } from "sonner";
import { createTeamAction } from "@/app/actions/team/create-team.action";
import { updateTeamAction } from "@/app/actions/team/update-team.action";

export const useTeamForm = (
	userId: string,
	mode: "create" | "update",
	teamId?: string,
	onSuccess?: () => void,
	toastMessage?: string
) => {
	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const boundUpdateAction = useMemo(
		() => updateTeamAction.bind(null, teamId || ""),
		[teamId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createTeamAction.bind(null, userId),
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundUpdateAction,
		undefined
	);

	const IS_PENDING = isCreatePending || isUpdatePending;
	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);
	const { back } = useRouter();
	const formState = IS_UPDATE_FORM ? updateState : createState;

	useEffect(() => {
		const hasResult = updateState?.success || createState?.success;
		if (hasResult) {
			onSuccess?.();
			back();
			toast.success(
				toastMessage ||
					`Team was successfully ${
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
        IS_UPDATE_FORM,
		createState,
		updateState,
		IS_PENDING,
		BUTTON_LABEL,
		formAction,
		formError,
	};
};
