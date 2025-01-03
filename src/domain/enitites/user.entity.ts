import { UserPlan } from "@prisma/client";
import { Password } from "../value-objects/password.value-object";
import { Email } from "../value-objects/email.value-object";
import { TaskEntity } from "./task.enitity";
import { ProjectEntity } from "./project.entity";
import { TaskCommentEntity } from "./task-comment.entity";
import { TeamMemberEntity } from "./team-member.entity";

export class UserEntity {
	private _tasks?: TaskEntity[];
	private _projects?: ProjectEntity[];
	private _taskComments?: TaskCommentEntity[];
	private _teamMembers?: TeamMemberEntity[];

	constructor(
		public readonly id: string,
		public readonly email: Email,
		public readonly name: string,
		public readonly surname: string,
		public readonly imageUrl: string,
		public readonly plan: UserPlan = UserPlan.FREE,
		public readonly description: string | null,
		public readonly password?: Password,
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date,
		public readonly deletedAt?: Date,
		tasks?: TaskEntity[],
		projects?: ProjectEntity[],
		taskComments?: TaskCommentEntity[],
		teamMembers?: TeamMemberEntity[]
	) {
		this._tasks = tasks;
		this._projects = projects;
		this._taskComments = taskComments;
		this._teamMembers = teamMembers;
	}

	get tasks(): TaskEntity[] | undefined {
		return this._tasks;
	}

	get projects(): ProjectEntity[] | undefined {
		return this._projects;
	}

	get taskComments(): TaskCommentEntity[] | undefined {
		return this._taskComments;
	}

	get teamMemberships(): TeamMemberEntity[] | undefined {
		return this._teamMembers;
	}

	static create(props: {
		email: Email;
		password: Password;
		name: string;
		surname: string;
		imageUrl: string;
		plan?: UserPlan;
		description: string | null;
		tasks?: TaskEntity[];
		projects?: ProjectEntity[];
		taskComments?: TaskCommentEntity[];
		teamMembers?: TeamMemberEntity[];
	}): UserEntity {
		return new UserEntity(
			crypto.randomUUID(),
			props.email,
			props.name,
			props.surname,
			props.imageUrl,
			props.plan,
			props.description,
			props.password,
			undefined,
			undefined,
			undefined,
			props.tasks || [],
			props.projects || [],
			props.taskComments || [],
			props.teamMembers || []
		);
	}

	static reconstitute(props: {
		id: string;
		email: string;
		password: string;
		name: string;
		surname: string;
		imageUrl: string;
		plan: UserPlan;
		description: string | null;
		deletedAt: Date | null;
		createdAt?: Date;
		updatedAt?: Date;
		tasks?: TaskEntity[];
		projects?: ProjectEntity[];
		taskComments?: TaskCommentEntity[];
		teamMembers?: TeamMemberEntity[];
	}): UserEntity {
		return new UserEntity(
			props.id,
			Email.create(props.email),
			props.name,
			props.surname,
			props.imageUrl,
			props.plan,
			props.description,
			Password.fromHash(props.password),
			props.createdAt,
			props.updatedAt,
			props.deletedAt || undefined,
			props.tasks || [],
			props.projects || [],
			props.taskComments || [],
			props.teamMembers || []
		);
	}
}
