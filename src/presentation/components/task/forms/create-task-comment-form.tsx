import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useActionState, useEffect, useMemo } from "react";
import { createTaskCommentAction } from "@/app/actions/task-comment/create-task-comment.action";
import { updateTaskCommentAction } from "@/app/actions/task-comment/update-task-comment.action";
import { FORM_STATES } from "@/src/presentation/consts/forms-consts";
import { generateButtonLabel } from "@/src/presentation/utils/shared/generate-button-label";
import { toast } from "sonner";

interface CreateTaskFormProps {
	commentId?: string;
	taskId: string;
	initialContent?: string;
	onCancel?: () => void;
	mode?: "create" | "update";
}

export const CreateTaskForm = (props: CreateTaskFormProps) => {
	const { user } = useAuth();
	const {
		initialContent,
		mode = "create",
		taskId,
		commentId,
		onCancel,
	} = props;
	const IS_UPDATE_FORM = useMemo(() => mode === FORM_STATES.UPDATE, [mode]);

	const BUTTON_LABEL = useMemo(
		() => generateButtonLabel(IS_PENDING, mode),
		[mode]
	);

	const boundUpdateAction = useMemo(
		() =>
			updateTaskCommentAction.bind(null, {
				commentId: commentId || "",
				userId: user?.id || "",
				taskId: taskId || "",
			}),
		[taskId]
	);

	const [createState, createAction, isCreatePending] = useActionState(
		createTaskCommentAction.bind(null, taskId, user?.id || ""),
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
			toast.success(
				`Comment was successfully ${
					IS_UPDATE_FORM ? "updated" : "created"
				}!`
			);
		}
	}, [updateState?.id, createState?.id, IS_UPDATE_FORM]);

	return (
		<form action={IS_UPDATE_FORM ? updateAction : createAction}>
			<Textarea
				name="content"
				defaultValue={initialContent}
				placeholder="Type your comment..."
				className="min-h-[50px] flex-1"
			/>
			<div className="flex flex-col gap-2 self-end">
				<Button type="submit" disabled={IS_PENDING} size="sm">
					{BUTTON_LABEL}
				</Button>
				{onCancel && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={onCancel}
					>
						Cancel
					</Button>
				)}
			</div>
		</form>
	);
};
