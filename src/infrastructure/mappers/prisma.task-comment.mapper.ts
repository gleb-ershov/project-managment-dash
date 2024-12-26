import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { TaskComment } from "@prisma/client";
import { PrismaUserMapper } from "./prisma.user.mapper";
import { PrismaTaskMapper } from "./prisma.task.mapper";
import { TaskCommentWithRelations } from "./mapper.types";

export class PrismaTaskCommentMapper {
	static toDomain(
		prismaComment: TaskCommentWithRelations
	): TaskCommentEntity {
		return TaskCommentEntity.reconstitute({
			id: prismaComment.id,
			content: prismaComment.content,
			taskId: prismaComment.taskId,
			authorId: prismaComment.authorId,
			createdAt: prismaComment.createdAt,
			updatedAt: prismaComment.updatedAt,
			author: PrismaUserMapper.toDomain(prismaComment.author),
			task: PrismaTaskMapper.toDomain(prismaComment.task),
		});
	}

	static toPrisma(
		entity: TaskCommentEntity
	): Omit<TaskComment, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			content: entity.content,
			taskId: entity.taskId,
			authorId: entity.authorId,
		};
	}
}
