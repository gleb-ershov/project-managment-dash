"use client";

import { useActionState, useEffect, useState } from "react";
import { EntityTitleInput } from "../../shared/entity-title-input";
import { EntityDescriptionInput } from "../../shared/entity-description-input";
import { EntityDueDateInput } from "../../shared/entity-due-date-input";
import { MemberSearchInput } from "../../user/form-elements/user-search-input";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { Button } from "../../ui/button";
import { UrlInput } from "../../shared/url-input";
import { TaskStatusSelect } from "../form-elements/task-status-select";
import { TagsInput } from "../../ui/tags-input";
import { createTaskAction } from "@/app/actions/task/create-task-action";
import { ProjectSearchInput } from "../../project/form-elements/project-search-input";
import { TaskPrioritySelect } from "../form-elements/task-priority-select";

export const CreateTaskForm = () => {
	const { user } = useAuth();

	const [tags, setTags] = useState<string[]>([]);
	const [state, action, isPending] = useActionState(
		createTaskAction.bind(null, { userId: user?.id || "" }),
		undefined
	);

	return (
		<form className="space-y-4" action={action}>
			<EntityTitleInput id="create_project_form--title" />
			<EntityDescriptionInput
				id="create_project_form--description"
				required={false}
			/>
			<EntityDueDateInput id="create_project_form--due_date" />
			<MemberSearchInput name="members" />
			<TaskStatusSelect name="status" />
			<ProjectSearchInput name="projectId" />
			<TaskPrioritySelect />
			<TagsInput
				value={tags}
				onValueChange={(val) => setTags(val)}
				name="tags"
			/>
			<UrlInput name="externalLinks" />
			<Button type="submit" disabled={isPending}>
				{isPending ? "Creating..." : "Create"}
			</Button>
		</form>
	);
};
