import { TaskPriority, TaskStatus } from "@prisma/client";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "./project.entity";
import { TaskCommentEntity } from "./task-comment.entity";

export class TaskEntity {
	private _members?: UserEntity[];
	private _project?: ProjectEntity;
	private _comments?: TaskCommentEntity[];
	private _createdBy?: UserEntity;
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly userId: string,
		public readonly projectId: string,
		public readonly priority: TaskPriority = TaskPriority.NORMAL,
		public readonly status: TaskStatus = TaskStatus.TODO,
		public readonly dueDate: Date,
		public readonly externalLinks: string[] = [],
		public readonly tags: string[] = [],
		public readonly description: string | null,
		public readonly membersIds: string[] = [],
		public readonly createdAt: Date = new Date(),
		public readonly updatedAt: Date = new Date(),
		public readonly deletedAt: Date | null = null,
		members?: UserEntity[],
		project?: ProjectEntity,
		createdBy?: UserEntity,
		comments?: TaskCommentEntity[]
	) {
		this._members = members;
		this._project = project;
		this._createdBy = createdBy;
		this._comments = comments;
	}

	get members(): UserEntity[] | undefined {
		return this._members;
	}

	get project(): ProjectEntity | undefined {
		return this._project;
	}

	get comments(): TaskCommentEntity[] | undefined {
		return this._comments;
	}

	get createdBy(): UserEntity | undefined {
		return this._createdBy;
	}

	isOverdue(): boolean {
		return this.dueDate < new Date();
	}

	isCompleted(): boolean {
		return this.status === TaskStatus.COMPLETED;
	}

	static async create(props: {
		userId: string;
		priority: TaskPriority;
		status: TaskStatus;
		dueDate: Date;
		title: string;
		externalLinks: string[] | undefined;
		tags: string[] | undefined;
		projectId: string;
		description: string | null;
		membersIds: string[] | undefined;
		project?: ProjectEntity;
		createdBy?: UserEntity;
		members?: UserEntity[];
		comments?: TaskCommentEntity[];
	}): Promise<TaskEntity> {
		return new TaskEntity(
			crypto.randomUUID(),
			props.title,
			props.userId,
			props.projectId,
			props.priority || TaskPriority.NORMAL,
			props.status || TaskStatus.TODO,
			props.dueDate,
			props.externalLinks || [],
			props.tags || [],
			props.description,
			props.membersIds || [],
			new Date(),
			new Date(),
			null,
			props.members || [],
			props.project,
			props.createdBy,
			props.comments || []
		);
	}

	static reconstitute(props: {
		id: string;
		title: string;
		userId: string;
		projectId: string;
		priority: TaskPriority;
		status: TaskStatus;
		dueDate: Date;
		externalLinks: string[];
		tags: string[];
		description: string | null;
		membersIds: string[];
		createdAt?: Date;
		updatedAt?: Date;
		deletedAt: Date | null;
		project?: ProjectEntity;
		createdBy?: UserEntity;
		members?: UserEntity[];
		comments?: TaskCommentEntity[];
	}): TaskEntity {
		return new TaskEntity(
			props.id,
			props.title,
			props.userId,
			props.projectId,
			props.priority,
			props.status,
			props.dueDate,
			props.externalLinks,
			props.tags,
			props.description,
			props.membersIds,
			props.createdAt || new Date(),
			props.updatedAt || new Date(),
			props.deletedAt,
			props.members || [],
			props.project,
			props.createdBy,
			props.comments || []
		);
	}
}
