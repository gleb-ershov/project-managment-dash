import { TaskEntity } from "./task.enitity";
import { UserEntity } from "./user.entity";

export class TaskCommentEntity {
	private _author?: UserEntity;
	private _task?: TaskEntity;
	constructor(
		public readonly id: string,
		public readonly content: string,
		public readonly taskId: string,
		public readonly authorId: string,
		public readonly createdAt: Date = new Date(),
		public readonly updatedAt: Date = new Date(),
		task?: TaskEntity,
		author?: UserEntity
	) {
		this._task = task;
		this._author = author;
	}

	get author(): UserEntity | undefined {
		return this._author;
	}

	get task(): TaskEntity | undefined {
		return this._task;
	}

	static create(props: {
		content: string;
		taskId: string;
		authorId: string;
		task?: TaskEntity;
		author?: UserEntity;
	}): TaskCommentEntity {
		return new TaskCommentEntity(
			crypto.randomUUID(),
			props.content,
			props.taskId,
			props.authorId,
			new Date(),
			new Date(),
			props.task,
			props.author
		);
	}

	static reconstitute(props: {
		id: string;
		content: string;
		taskId: string;
		authorId: string;
		createdAt?: Date;
		updatedAt?: Date;
		task?: TaskEntity;
		author?: UserEntity;
	}): TaskCommentEntity {
		return new TaskCommentEntity(
			props.id,
			props.content,
			props.taskId,
			props.authorId,
			props.createdAt || new Date(),
			props.updatedAt || new Date(),
			props.task,
			props.author
		);
	}

	update(content: string): TaskCommentEntity {
		return new TaskCommentEntity(
			this.id,
			content,
			this.taskId,
			this.authorId,
			this.createdAt,
			new Date(),
			this._task,
			this._author
		);
	}
}
