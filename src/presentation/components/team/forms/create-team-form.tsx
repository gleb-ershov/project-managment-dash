"use client";

import { useActionState, useEffect, useMemo } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { Button } from "../../ui/button";
import { createTeamAction } from "@/app/actions/team/create-team.action";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { toast } from "sonner";
import { FORM_STATES } from "@/src/presentation/consts/forms-consts";
import { generateButtonLabel } from "@/src/presentation/utils/shared/generate-button-label";
import { updateTeamAction } from "@/app/actions/team/update-team.action";

interface CreateTeamFormInitialState {
	name: string;
	description: string;
}

interface CreateTeamFormProps {
	initialState?: Partial<CreateTeamFormInitialState>;
	mode?: "create" | "update";
	onSuccess?: () => void;
	teamId?: string;
	actionId?: string;
}

export const CreateTeamForm = (props: CreateTeamFormProps) => {
	const { user } = useAuth();
	const { initialState, mode = "create", onSuccess, teamId } = props;

	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const boundUpdateAction = useMemo(
		() => updateTeamAction.bind(null, teamId || ""),
		[teamId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createTeamAction.bind(null, user?.id || ""),
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
	useEffect(() => {
		const hasResult = updateState?.id || createState?.id;
		if (hasResult) {
			onSuccess?.();
			toast.success(
				`Team was successfully ${
					IS_UPDATE_FORM ? "updated" : "created"
				}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM, onSuccess]);

	return (
		<form action={IS_UPDATE_FORM ? updateAction : createAction}>
			<Label htmlFor="create_team_form--name">Team name</Label>
			<Input
				name="name"
				id="create_team_form--name"
				defaultValue={initialState?.name}
			/>
			<EntityDescriptionInput
				name="description"
				defaultValue={initialState?.description}
			/>
			{IS_UPDATE_FORM ? null : <MemberSearchInput name="members" />}
			<Button type="submit" disabled={IS_PENDING}>
				{BUTTON_LABEL}
			</Button>
		</form>
	);
};
