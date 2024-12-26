"use client";

import { formatDistanceToNow } from "date-fns";
import { CreateCommentForm } from "../forms/create-task-comment-form";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { TaskCommentViewModel } from "@/src/application/view-models/task-comment.view-model";

interface TaskCommentsCardProps {
	taskId: string;
	comments: TaskCommentViewModel[];
}

export const TaskCommentsCard = ({
	taskId,
	comments,
}: TaskCommentsCardProps) => {
	const currentUserId = useAuth().user?.id;
	const [editingCommentId, setEditingCommentId] = useState<string | null>(
		null
	);

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 space-y-4 overflow-y-auto max-h-[600px] p-4">
				{comments.map((comment) =>
					comment.author && currentUserId ? (
						<div
							key={comment.id}
							className={`flex gap-3 items-center ${
								comment.author.id === currentUserId
									? "flex-row-reverse"
									: ""
							}`}
						>
							<LinkedUsersAvatarList
								members={[comment.author]}
								labelVisible={false}
							/>
							<div
								className={`flex flex-col w-[85%] ${
									comment.author.id === currentUserId
										? "items-end"
										: "items-start"
								}`}
							>
								{editingCommentId === comment.id ? (
									<div className="w-full min-w-[200px]">
										<CreateCommentForm
											taskId={taskId}
											commentId={comment.id}
											initialContent={comment.content}
											onCancel={() =>
												setEditingCommentId(null)
											}
											onSubmit={() =>
												setEditingCommentId(null)
											}
											submitLabel="Update"
										/>
									</div>
								) : (
									<>
										<div
											className={`rounded-lg p-3 relative group flex items-center duration-300 gap-2 ${
												comment.author.id ===
												currentUserId
													? "bg-blue-500 text-white"
													: "bg-gray-100"
											}`}
										>
											<p className="text-sm">
												{comment.content}
											</p>
											{comment.author.id ===
												currentUserId && (
												<Button
													variant="ghost"
													size="sm"
													className={`absolute bg-transparent opacity-0 group-hover:opacity-100 -left-10 hover:bg-transparent ${
														comment.author.id ===
														currentUserId
															? "text-gray-600 hover:text-gray-900"
															: ""
													}`}
													onClick={() =>
														setEditingCommentId(
															comment.id
														)
													}
												>
													<Pencil className="h-4 w-4" />
												</Button>
											)}
										</div>
										<span className="text-xs text-gray-500 mt-1">
											{comment.createdAt}
											{comment.updatedAt >
												comment.createdAt && (
												<span className="ml-1">
													(edited)
												</span>
											)}
										</span>
									</>
								)}
							</div>
						</div>
					) : null
				)}
			</div>

			{/* Comment form */}
			<div className="border-t p-4">
				<CreateCommentForm taskId={taskId} />
			</div>
		</div>
	);
};
