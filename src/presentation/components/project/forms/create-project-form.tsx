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
import { ProjectStatus } from "@prisma/client";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
interface CreateProjectFormInitialState {
	title: string;
	description: string;
	status: ProjectStatus;
	due_date: string;
	members: UserViewModel[];
	categories: ProjectCategoryViewModel[];
}

export const CreateProjectForm = ({
	initialState,
	mode = "create",
}: {
	initialState: Partial<CreateProjectFormInitialState>;
	mode?: string;
}) => {
	const { user } = useAuth();
	const { title, description, status, due_date, members, categories } =
		initialState;

	const [formState, action, isPending] = useActionState(
		createProjectAction.bind(null, {
			userId: user?.id || "",
		}),
		undefined
	);

	const buttonLabel = mode === "create" ? "Create" : "Update";

	return (
		<form className="space-y-4" action={action}>
			<EntityTitleInput
				id="create_project_form--title"
				defaultValue={title}
			/>
			<EntityDescriptionInput
				id="create_project_form--description"
				required={false}
				defaultValue={description}
			/>
			<ProjectStatusSelect
				id="create_project_form--status"
				defaultValue={status}
			/>
			<EntityDueDateInput
				id="create_project_form--due_date"
				defaultValue={due_date}
			/>
			<MemberSearchInput name="members" defaultMembers={members} />
			<ProjectCategorySearchInput
				name="categories"
				defaultCategories={categories}
			/>
			<Button type="submit" disabled={isPending}>
				{isPending
					? `${buttonLabel.slice(0, buttonLabel.length - 1)}ing...`
					: buttonLabel}
			</Button>
		</form>
	);
};
