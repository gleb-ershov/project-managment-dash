"use client";

import { useActionState, useEffect, useMemo } from "react";
import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { ProjectStatusSelect } from "../form-elements/project-status-select";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { ProjectCategorySearchInput } from "../form-elements/project-category-search-input";
import { createProjectAction } from "@/app/actions/project/create-project.action";
import { Button } from "../../ui/button";
import { ProjectStatus } from "@prisma/client";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { toast } from "sonner";
import { FORM_STATES } from "@/src/presentation/consts/forms-consts";
import { generateButtonLabel } from "@/src/presentation/utils/shared/generate-button-label";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { updateProjectAction } from "@/app/actions/project/update-project.action";
interface CreateProjectFormInitialState {
	title: string;
	description: string;
	status: ProjectStatus;
	due_date: string;
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
	const { user } = useAuth();
	const { initialState, mode = "create", onSuccess, projectId } = props;

	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);

	const boundUpdateAction = useMemo(
		() => updateProjectAction.bind(null, projectId || ""),
		[projectId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createProjectAction.bind(null, user?.id || ""),
		undefined
	);

	const [updateState, updateAction, isUpdatePending] = useActionState(
		boundUpdateAction,
		undefined
	);

	const IS_PENDING = isCreatePending || isUpdatePending;

	useEffect(() => {
		const hasResult = updateState?.id || createState?.id;
		if (hasResult) {
			onSuccess?.();
			toast.success(
				`Project was successfully ${
					IS_UPDATE_FORM ? "updated" : "created"
				}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM, onSuccess]);

	return (
		<form action={IS_UPDATE_FORM ? updateAction : createAction}>
			<EntityTitleInput
				id="create_project_form--title"
				defaultValue={initialState?.title}
			/>
			<EntityDescriptionInput
				id="create_project_form--description"
				required={false}
				defaultValue={initialState?.description}
			/>
			<ProjectStatusSelect
				id="create_project_form--status"
				defaultValue={initialState?.status}
			/>
			<EntityDueDateInput
				id="create_project_form--due_date"
				defaultValue={initialState?.due_date}
			/>
			<MemberSearchInput
				name="members"
				defaultMembers={initialState?.members}
			/>
			<ProjectCategorySearchInput
				name="categories"
				defaultCategories={initialState?.categories}
			/>
			<Button type="submit" disabled={IS_PENDING}>
				{BUTTON_LABEL}
			</Button>
		</form>
	);
};
