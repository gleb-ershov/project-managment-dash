import { TaskCommentEntity } from "../enitites/task-comment.entity";

export interface ITaskCommentRepository {
	findById(id: string): Promise<TaskCommentEntity | null>;
	findByTaskId(taskId: string): Promise<TaskCommentEntity[]>;
	findByAuthorId(authorId: string): Promise<TaskCommentEntity[]>;
	create(comment: TaskCommentEntity): Promise<TaskCommentEntity>;
	update(comment: TaskCommentEntity): Promise<TaskCommentEntity>;
	delete(id: string): Promise<void>;
	deleteAllByTaskId(taskId: string): Promise<void>;
}
