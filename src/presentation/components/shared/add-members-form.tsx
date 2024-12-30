"use client";
import { Button } from "react-day-picker";
import { MemberSearchInput } from "../user/form-elements/user-search-input";
import { useActionState, useMemo } from "react";
import { updateProjectAction } from "@/app/actions/project/update-project.action";
import { updateTeamAction } from "@/app/actions/team/update-team.action";
import { updateTaskAction } from "@/app/actions/task/update-task.action";

interface AddMembersFormProps {
	entityId: string;
	entity: "project" | "team" | "task";
}

export const AddMembersForm = (props: AddMembersFormProps) => {
	const { entity, entityId } = props;

	const boundAction = useMemo<any>(() => {
		if (entity === "project") {
			return updateProjectAction.bind(null, entityId);
		}
		if (entity === "team") {
			return updateTeamAction.bind(null, entityId);
		}
		if (entity === "task") {
			return updateTaskAction.bind(null, entityId);
		}
	}, [entity, entityId]);

	const [formState, action, isPending] = useActionState(
		boundAction,
		undefined
	);

	return (
		<form action={action}>
			<MemberSearchInput name="members" />
			<Button type="submit">Add members</Button>
		</form>
	);
};
