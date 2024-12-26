"use client";

import { useActionState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { Button } from "../../ui/button";
import { createTeamAction } from "@/app/actions/team/create-team-action";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";

export const CreateTeamForm = () => {
	const { user } = useAuth();
	const [state, action, isPending] = useActionState(
		createTeamAction.bind(null, { userId: user?.id || "" }),
		undefined
	);

	return (
		<form action={action}>
			<Label htmlFor="create_team_form--name">Team name</Label>
			<Input name="name" id="create_team_form--name" />
			<EntityDescriptionInput name="description" />
			<MemberSearchInput name="members" />
			<Button type="submit" disabled={isPending}>
				{isPending ? "Creating..." : "Create Team"}
			</Button>
		</form>
	);
};
