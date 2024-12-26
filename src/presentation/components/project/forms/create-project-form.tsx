"use client";

import { useActionState } from "react";
import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { ProjectStatusSelect } from "../form-elements/project-status-select";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { ProjectCategorySearchInput } from "../form-elements/project-category-search-input";
import { createProjectAction } from "@/app/actions/project/create-project-action";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { Button } from "../../ui/button";

export const CreateProjectForm = () => {
	const { user } = useAuth();

	const [formState, action, isPending] = useActionState(
		createProjectAction.bind(null, {
			userId: user?.id || "",
		}),
		undefined
	);

	return (
		<form className="space-y-4" action={action}>
			<EntityTitleInput id="create_project_form--title" />
			<EntityDescriptionInput
				id="create_project_form--description"
				required={false}
			/>
			<ProjectStatusSelect id="create_project_form--status" />
			<EntityDueDateInput id="create_project_form--due_date" />
			<MemberSearchInput name="members" />
			<ProjectCategorySearchInput name="categories" />
			<Button type="submit" disabled={isPending}>
				{isPending ? "Creating..." : "Create"}
			</Button>
		</form>
	);
};
