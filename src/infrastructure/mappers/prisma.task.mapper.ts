import { PrismaUserMapper } from "./prisma.user.mapper";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { Task } from "@prisma/client";
import { PrismaProjectMapper } from "./prisma.project.mapper";
import { TaskWithRelations } from "./mapper.types";
import { PrismaTaskCommentMapper } from "./prisma.task-comment.mapper";

export class PrismaTaskMapper {
	public static toDomain(prismaTask: TaskWithRelations): TaskEntity {
		return TaskEntity.reconstitute({
			id: prismaTask.id,
			title: prismaTask.title,
			projectId: prismaTask.projectId,
			userId: prismaTask.userId,
			priority: prismaTask.priority,
			status: prismaTask.status,
			dueDate: prismaTask.dueDate,
			externalLinks: prismaTask.externalLinks,
			tags: prismaTask.tags,
			description: prismaTask.description ?? null,
			membersIds: prismaTask.members
				? prismaTask.members.map((member) => member.id)
				: [],
			createdAt: new Date(prismaTask.createdAt),
			updatedAt: new Date(prismaTask.updatedAt),
			deletedAt: prismaTask.deletedAt
				? new Date(prismaTask.deletedAt)
				: null,
			project: PrismaProjectMapper.toDomain(prismaTask.project),
			createdBy: PrismaUserMapper.toDomain(prismaTask.createdBy),
			members: prismaTask.members
				? prismaTask.members.map((member) =>
						PrismaUserMapper.toDomain(member)
				  )
				: [],
			comments: prismaTask.comments
				? prismaTask.comments.map((comment) =>
						PrismaTaskCommentMapper.toDomain(comment)
				  )
				: [],
		});
	}

	public static toPrisma(task: TaskEntity): Task {
		return {
			id: task.id,
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			dueDate: task.dueDate,
			projectId: task.projectId,
			tags: task.tags,
			externalLinks: task.externalLinks,
			userId: task.userId,
			deletedAt: task.deletedAt,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt,
		};
	}
}
