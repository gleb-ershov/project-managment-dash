import {
	FindLatestUserTasksOptions,
	ITaskRepository,
	TaskGroup,
} from "@/src/domain/repositories/task.repository.interface";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { PrismaClient } from "@prisma/client";
import { DatabaseError } from "@/src/domain/errors/application.error";
import { PrismaTaskMapper } from "../mappers/prisma.task.mapper";
import { format, isToday, isTomorrow, isValid } from "date-fns";

export class PrismaTaskRepository implements ITaskRepository {
	constructor(private prisma: PrismaClient) {}

	defaultIncludes = {
		project: {
			include: {
				createdBy: true,
			},
		},
		createdBy: true,
	};

	async findByUserId(userId: string): Promise<TaskEntity[]> {
		try {
			const tasks = await this.prisma.task.findMany({
				where: {
					OR: [
						{ userId: userId },
						{
							members: {
								some: {
									id: userId,
								},
							},
						},
					],
					deletedAt: null,
				},
				include: this.defaultIncludes,
			});
			return tasks.map((task) => PrismaTaskMapper.toDomain(task));
		} catch (error) {
			throw new DatabaseError("Failed to fetch tasks", { error });
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.prisma.task.delete({
				where: { id },
			});
		} catch (error) {
			throw new DatabaseError("Failed to delete task", { error });
		}
	}

	async findByProjectId(projectId: string): Promise<TaskEntity[]> {
		try {
			const tasks = await this.prisma.task.findMany({
				where: { projectId },
				include: this.defaultIncludes,
			});

			return tasks.map((task) => PrismaTaskMapper.toDomain(task));
		} catch (error) {
			throw new DatabaseError("Failed to fetch tasks", { error });
		}
	}

	async findUserTasksGroupedByDueDate(userId: string): Promise<TaskGroup[]> {
		try {
			const tasks = await this.prisma.task.findMany({
				where: {
					OR: [
						{ userId: userId },
						{
							members: {
								some: {
									id: userId,
								},
							},
						},
					],
					deletedAt: null,
				},
				include: this.defaultIncludes,
				orderBy: {
					dueDate: "asc",
				},
			});

			// Group tasks by day
			const groupedTasks = tasks.reduce((acc, task) => {
				if (task.dueDate && isValid(task.dueDate)) {
					const date = new Date(task.dueDate);
					const label = this.formatDateLabel(date);

					const existingGroup = acc.find(
						(group) => group.label === label
					);

					if (existingGroup) {
						existingGroup.tasks.push(
							PrismaTaskMapper.toDomain(task)
						);
					} else {
						acc.push({
							label,
							tasks: [PrismaTaskMapper.toDomain(task)],
						});
					}
				}
				return acc;
			}, [] as TaskGroup[]);

			return groupedTasks;
		} catch (error) {
			throw new DatabaseError("Failed to fetch grouped tasks", { error });
		}
	}

	private formatDateLabel(date: Date): string {
		if (isToday(date)) {
			return "Today";
		}

		if (isTomorrow(date)) {
			return "Tomorrow";
		}

		return format(date, "do MMMM");
	}

	async update(id: string, data: Partial<TaskEntity>): Promise<TaskEntity> {
		try {
			const task = await this.prisma.task.update({
				where: { id },
				data: {
					title: data.title,
					status: data.status,
					description: data.description,
					priority: data.priority,
					dueDate: data.dueDate,
					externalLinks: data.externalLinks,
					tags: data.tags,
					members: data.membersIds
						? {
								set: data.membersIds.map((id) => ({ id })),
						  }
						: undefined,
				},
				include: this.defaultIncludes,
			});

			return PrismaTaskMapper.toDomain(task);
		} catch (error) {
			throw new DatabaseError("Failed to update task", { error });
		}
	}

	async findById(id: string): Promise<TaskEntity | null> {
		try {
			const task = await this.prisma.task.findUnique({
				where: { id },
				include: {
					...this.defaultIncludes,
					comments: {
						include: {
							author: true,
							task: {
								include: {
									project: {
										include: {
											createdBy: true,
										},
									},
									createdBy: true,
								},
							},
						},
					},
				},
			});
			return task ? PrismaTaskMapper.toDomain(task) : null;
		} catch (error) {
			throw new DatabaseError("Failed to find task", { error });
		}
	}

	async create(payload: TaskEntity): Promise<TaskEntity> {
		try {
			const task = await this.prisma.task.create({
				data: {
					title: payload.title,
					userId: payload.userId,
					dueDate: payload.dueDate,
					status: payload.status,
					description: payload.description,
					priority: payload.priority,
					externalLinks: payload.externalLinks,
					projectId: payload.projectId,
					tags: payload.tags,
					members: {
						connect: payload.membersIds.map((memberId) => ({
							id: memberId,
						})),
					},
				},
				include: this.defaultIncludes,
			});
			return PrismaTaskMapper.toDomain(task);
		} catch (error) {
			throw new DatabaseError("Failed to create task", { error });
		}
	}

	async findLatestUserTasks({
		userId,
		limit,
		status,
	}: FindLatestUserTasksOptions): Promise<TaskEntity[]> {
		const tasks = await this.prisma.task.findMany({
			where: {
				AND: [
					{
						OR: [
							{ userId },
							{
								members: {
									some: {
										id: userId,
									},
								},
							},
						],
					},
					{ status },
					{ deletedAt: null },
				],
			},
			include: this.defaultIncludes,
			orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
			take: limit,
		});

		return tasks.map((task) => PrismaTaskMapper.toDomain(task));
	}
}
