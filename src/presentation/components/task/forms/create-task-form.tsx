"use client";

import { useActionState, useEffect, useMemo } from "react";
import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { Button } from "../../ui/button";
import { UrlInput } from "../../shared/url-input";
import { TaskStatusSelect } from "../form-elements/task-status-select";
import { TagsInput } from "../../ui/tags-input";
import { createTaskAction } from "@/app/actions/task/create-task.action";
import { ProjectSearchInput } from "../../project/form-elements/project-search-input";
import { TaskPrioritySelect } from "../form-elements/task-priority-select";
import { toast } from "sonner";
import { ProjectStatus } from "@prisma/client";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { FORM_STATES } from "@/src/presentation/consts/forms-consts";
import { generateButtonLabel } from "@/src/presentation/utils/shared/generate-button-label";
import { updateTaskAction } from "@/app/actions/task/update-task.action";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";

interface CreateTaskFormInitialState {
	title: string;
	description: string;
	due_date: string;
	members: UserViewModel[];
	status: ProjectStatus;
	project: ProjectViewModel;
	priority: string;
	tags: string[];
	externalLinks: string[];
}

interface CreateTaskFormProps {
	initialState?: Partial<CreateTaskFormInitialState>;
	mode?: "create" | "update";
	onSuccess?: () => void;
	taskId?: string;
}

export const CreateTaskForm = (props: CreateTaskFormProps) => {
	const { user } = useAuth();
	const { initialState, mode = "create", onSuccess, taskId } = props;
	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);

	const boundUpdateAction = useMemo(
		() => updateTaskAction.bind(null, taskId || ""),
		[taskId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createTaskAction.bind(null, user?.id || ""),
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
				`Task was successfully ${
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
			<EntityDueDateInput
				id="create_project_form--due_date"
				defaultValue={initialState?.due_date}
			/>
			<MemberSearchInput
				name="members"
				defaultMembers={initialState?.members}
			/>
			<TaskStatusSelect
				name="status"
				defaultValue={initialState?.status}
			/>
			<ProjectSearchInput
				name="projectId"
				defaultProject={initialState?.project}
			/>
			<TaskPrioritySelect defaultValue={initialState?.priority} />
			<TagsInput
				value={initialState?.tags || []}
				name="tags"
				defaultValue={initialState?.tags}
			/>
			<UrlInput
				name="externalLinks"
				defaultValue={initialState?.externalLinks?.join(",")}
			/>
			<Button type="submit" disabled={IS_PENDING}>
				{BUTTON_LABEL}
			</Button>
		</form>
	);
};
