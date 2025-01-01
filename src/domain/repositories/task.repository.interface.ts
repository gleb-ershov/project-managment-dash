import { TaskEntity } from "../enitites/task.enitity";

export interface FindLatestUserTasksOptions {
	userId: string;
	limit: number;
	status: "ONGOING" | "TODO";
}

export interface TaskGroup {
	label: string;
	tasks: TaskEntity[];
}

export interface ITaskRepository {
	create(task: TaskEntity): Promise<TaskEntity>;
	update(id: string, task: Partial<TaskEntity>): Promise<TaskEntity>;
	delete(id: string): Promise<void>;
	findUserTasksGroupedByDueDate(userId: string): Promise<TaskGroup[]>;
	findById(id: string): Promise<TaskEntity | null>;
	findByUserId(userId: string): Promise<TaskEntity[]>;
	findByProjectId(projectId: string): Promise<TaskEntity[]>;
	findLatestUserTasks(
		options: FindLatestUserTasksOptions
	): Promise<TaskEntity[]>;
	addMember(taskId: string, membersIds: string[]): Promise<TaskEntity>;
	findUsersSharedTasks(
		currentUserId: string,
		userId: string
	): Promise<TaskEntity[]>;
}
