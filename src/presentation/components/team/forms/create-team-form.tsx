"use client";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { Button } from "../../ui/button";
import { useTeamForm } from "@/src/presentation/hooks/shared/use-team-form";
import { InputErrorMessage } from "../../shared/input-error-message";

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
	const { initialState, mode = "create", onSuccess, teamId } = props;
	const { IS_PENDING, IS_UPDATE_FORM, BUTTON_LABEL, formError, formAction } =
		useTeamForm(mode, teamId, onSuccess);

	return (
		<form action={formAction} className="w-[320px] space-y-4 mx-auto">
			<Label htmlFor="create_team_form--name">Team name</Label>
			<div>
				<Input
					name="name"
					id="create_team_form--name"
					defaultValue={initialState?.name}
				/>
				<InputErrorMessage message={formError?.name} />
			</div>
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
