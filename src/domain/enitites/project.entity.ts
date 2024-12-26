import { ProjectStatus } from "@prisma/client";
import { UserEntity } from "./user.entity";
import { TaskEntity } from "./task.enitity";
import { ProjectCategoryEntity } from "./project-category.entity";

export class ProjectEntity {
	private _createdBy?: UserEntity;
	private _members?: UserEntity[];
	private _tasks?: TaskEntity[];
	private _categories?: ProjectCategoryEntity[];
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly userId: string,
		public readonly dueDate: Date,
		public readonly status: ProjectStatus = ProjectStatus.IN_PROGRESS,
		public readonly description: string | null,
		public readonly membersIds: string[] = [],
		public readonly categoriesIds: string[] = [],
		public readonly createdAt: Date = new Date(),
		public readonly updatedAt: Date = new Date(),
		public readonly deletedAt: Date | null = null,
		createdBy?: UserEntity,
		members?: UserEntity[],
		tasks?: TaskEntity[],
		categories?: ProjectCategoryEntity[]
	) {
		this._createdBy = createdBy;
		this._members = members;
		this._tasks = tasks;
		this._categories = categories;
	}

	get members(): UserEntity[] | undefined {
		return this._members;
	}

	get createdBy(): UserEntity | undefined {
		return this._createdBy;
	}

	get tasks(): TaskEntity[] | undefined {
		return this._tasks;
	}

	get categories(): ProjectCategoryEntity[] | undefined {
		return this._categories;
	}

	static create(props: {
		title: string;
		userId: string;
		dueDate: Date;
		description: string | null;
		membersIds: string[] | undefined;
		categoriesIds: string[] | undefined;
		status?: ProjectStatus;
		members?: UserEntity[];
		createdBy?: UserEntity;
		tasks?: TaskEntity[];
		categories?: ProjectCategoryEntity[];
	}): ProjectEntity {
		return new ProjectEntity(
			crypto.randomUUID(),
			props.title,
			props.userId,
			props.dueDate,
			props.status || ProjectStatus.IN_PROGRESS,
			props.description,
			props.membersIds || [],
			props.categoriesIds || [],
			new Date(),
			new Date(),
			null,
			props.createdBy,
			props.members || [],
			props.tasks || [],
			props.categories || []
		);
	}

	static reconstitute(props: {
		id: string;
		title: string;
		userId: string;
		dueDate: Date;
		status: ProjectStatus;
		description: string | null;
		membersIds: string[];
		categoriesIds: string[];
		createdAt?: Date;
		updatedAt?: Date;
		deletedAt: Date | null;
		members?: UserEntity[];
		createdBy?: UserEntity;
		tasks?: TaskEntity[];
		categories?: ProjectCategoryEntity[];
	}): ProjectEntity {
		return new ProjectEntity(
			props.id,
			props.title,
			props.userId,
			props.dueDate,
			props.status,
			props.description,
			props.membersIds || [],
			props.categoriesIds || [],
			props.createdAt || new Date(),
			props.updatedAt || new Date(),
			props.deletedAt,
			props.createdBy,
			props.members || [],
			props.tasks || [],
			props.categories || []
		);
	}
}
