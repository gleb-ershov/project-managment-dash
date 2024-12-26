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

	// // Methods to manage tasks created by user
	// addTask(task: TaskEntity): void {
	// 	if (!this._tasks.some((t) => t.id === task.id)) {
	// 		this._tasks.push(task);
	// 	}
	// }

	// removeTask(taskId: string): void {
	// 	this._tasks = this._tasks.filter((task) => task.id !== taskId);
	// }

	// // Methods to manage projects created by user
	// addProject(project: ProjectEntity): void {
	// 	if (!this._projects.some((p) => p.id === project.id)) {
	// 		this._projects.push(project);
	// 	}
	// }

	// removeProject(projectId: string): void {
	// 	this._projects = this._projects.filter(
	// 		(project) => project.id !== projectId
	// 	);
	// }

	// // Methods to manage task comments
	// addTaskComment(comment: TaskCommentEntity): void {
	// 	if (!this._taskComments.some((c) => c.id === comment.id)) {
	// 		this._taskComments.push(comment);
	// 	}
	// }

	// removeTaskComment(commentId: string): void {
	// 	this._taskComments = this._taskComments.filter(
	// 		(comment) => comment.id !== commentId
	// 	);
	// }

	// // Methods to manage team memberships
	// addTeamMembership(teamMember: TeamMemberEntity): void {
	// 	if (!this._teamMembers.some((tm) => tm.id === teamMember.id)) {
	// 		this._teamMembers.push(teamMember);
	// 	}
	// }

	// removeTeamMembership(teamMemberId: string): void {
	// 	this._teamMembers = this._teamMembers.filter(
	// 		(member) => member.id !== teamMemberId
	// 	);
	// }

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
