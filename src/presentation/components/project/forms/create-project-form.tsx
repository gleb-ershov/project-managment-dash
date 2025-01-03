"use client";

import { useActionState, useEffect, useMemo } from "react";
import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { ProjectStatusSelect } from "../form-elements/project-status-select";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { ProjectCategorySearchInput } from "../form-elements/project-category-search-input";
import { Button } from "../../ui/button";
import { ProjectStatus } from "@prisma/client";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { useProjectForm } from "@/src/presentation/hooks/projects/use-project-form";
import { InputErrorMessage } from "../../shared/input-error-message";
interface CreateProjectFormInitialState {
	title: string;
	description: string;
	status: ProjectStatus;
	dueDate: string;
	members: UserViewModel[];
	categories: ProjectCategoryViewModel[];
}

interface CreateProjectFormProps {
	initialState?: Partial<CreateProjectFormInitialState>;
	mode?: "create" | "update";
	onSuccess?: () => void;
	projectId?: string;
}

export const CreateProjectForm = (props: CreateProjectFormProps) => {
	const { mode = "create", projectId, onSuccess, initialState } = props;
	const { IS_PENDING, BUTTON_LABEL, formError, formAction } = useProjectForm(
		mode,
		projectId,
		onSuccess
	);

	return (
		<form action={formAction} className="w-[320px] space-y-4 mx-auto">
			<div>
				<EntityTitleInput
					isInvalid={!!formError?.title}
					id="create_project_form--title"
					defaultValue={initialState?.title}
				/>
				<InputErrorMessage message={formError?.title} />
			</div>
			<EntityDescriptionInput
				id="create_project_form--description"
				required={false}
				defaultValue={initialState?.description}
			/>
			<ProjectStatusSelect
				id="create_project_form--status"
				defaultValue={initialState?.status}
			/>
			<div>
				<EntityDueDateInput
					id="create_project_form--due_date"
					defaultValue={initialState?.dueDate}
				/>
				<InputErrorMessage message={formError?.dueDate} />
			</div>

			<MemberSearchInput
				name="members"
				defaultMembers={initialState?.members}
			/>
			<ProjectCategorySearchInput
				name="categories"
				defaultCategories={initialState?.categories}
			/>
			<Button
				type="submit"
				disabled={IS_PENDING}
				className="w-[160px] mx-auto block"
			>
				{BUTTON_LABEL}
			</Button>
		</form>
	);
};
