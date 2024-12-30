"use client";

import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { Button } from "../../ui/button";
import { UrlInput } from "../../shared/url-input";
import { TaskStatusSelect } from "../form-elements/task-status-select";
import { TagsInput } from "../../ui/tags-input";
import { ProjectSearchInput } from "../../project/form-elements/project-search-input";
import { TaskPrioritySelect } from "../form-elements/task-priority-select";
import { ProjectStatus } from "@prisma/client";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { useTaskForm } from "@/src/presentation/hooks/shared/use-task-form";

interface CreateTaskFormInitialState {
	title: string;
	description: string;
	dueDate: string;
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
	const { initialState, mode = "create", onSuccess, taskId } = props;

	const {
		IS_UPDATE_FORM,
		IS_PENDING,
		BUTTON_LABEL,
		createAction,
		updateAction,
	} = useTaskForm(mode, taskId, onSuccess);

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
				defaultValue={initialState?.dueDate}
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
