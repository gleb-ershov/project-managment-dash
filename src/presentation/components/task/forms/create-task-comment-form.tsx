import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useActionState } from "react";
import { createTaskCommentAction } from "@/app/actions/task-comment/create-task-comment";
import { updateTaskCommentAction } from "@/app/actions/task-comment/update-task-comment";

interface CreateCommentFormProps {
	commentId?: string;
	taskId: string;
	initialContent?: string;
	onCancel?: () => void;
	submitLabel?: string;
	onSubmit?: () => void;
}

export const CreateCommentForm = ({
	commentId,
	taskId,
	initialContent = "",
	onCancel,
	submitLabel = "Send",
	onSubmit
}: CreateCommentFormProps) => {
	const { user } = useAuth();

	const update = updateTaskCommentAction.bind(null, {
		commentId: commentId || "",
		taskId,
		userId: String(user?.id),
	});

	const create = createTaskCommentAction.bind(null, taskId, String(user?.id));
	const [createActionState, createAction, createActionPending] =
		useActionState(create, undefined);
	const [updateActionState, updateAction, updateActionPending] =
		useActionState(update, undefined);

	return (
		<form
			action={commentId ? updateAction : createAction}
			className="flex gap-2"
		>
			<Textarea
				name="content"
				defaultValue={initialContent}
				placeholder="Type your comment..."
				className="min-h-[50px] flex-1"
			/>
			<div className="flex flex-col gap-2 self-end">
				<Button
					type="submit"
					disabled={createActionPending || updateActionPending}
					onClick={onSubmit}
					size="sm"
				>
					{submitLabel}
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
