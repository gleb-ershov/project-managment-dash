import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaTaskCommentMapper } from "../mappers/prisma.task-comment.mapper";
import { DatabaseError } from "@/src/domain/errors/application.error";

export class PrismaTaskCommentRepository implements ITaskCommentRepository {
	constructor(private prisma: PrismaClient) {}

	defaultInclude = {
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
	};

	async findById(id: string): Promise<TaskCommentEntity | null> {
		try {
			const comment = await this.prisma.taskComment.findUnique({
				where: { id },
				include: { ...this.defaultInclude },
			});

			if (!comment) return null;

			return PrismaTaskCommentMapper.toDomain(comment);
		} catch (error) {
			throw new DatabaseError("Failed to find comment by id:", error);
		}
	}

	async findByTaskId(taskId: string): Promise<TaskCommentEntity[]> {
		try {
			const comments = await this.prisma.taskComment.findMany({
				where: { taskId },
				include: { ...this.defaultInclude },
				orderBy: {
					createdAt: "desc",
				},
			});

			return comments.map((comment) =>
				PrismaTaskCommentMapper.toDomain(comment)
			);
		} catch (error) {
			throw new DatabaseError("Failed to find comments by task:", error);
		}
	}

	async findByAuthorId(authorId: string): Promise<TaskCommentEntity[]> {
		try {
			const comments = await this.prisma.taskComment.findMany({
				where: { authorId },
				include: { ...this.defaultInclude },
			});

			return comments.map((comment) =>
				PrismaTaskCommentMapper.toDomain(comment)
			);
		} catch (error) {
			throw new DatabaseError("Failed to find comment by author:", error);
		}
	}

	async create(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
		try {
			const created = await this.prisma.taskComment.create({
				data: PrismaTaskCommentMapper.toPrisma(comment),
				include: { ...this.defaultInclude },
			});

			return PrismaTaskCommentMapper.toDomain(created);
		} catch (error) {
			throw new DatabaseError("Failed to create comment:", error);
		}
	}

	async update(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
		try {
			const updated = await this.prisma.taskComment.update({
				where: { id: comment.id },
				data: PrismaTaskCommentMapper.toPrisma(comment),
				include: { ...this.defaultInclude },
			});

			return PrismaTaskCommentMapper.toDomain(updated);
		} catch (error) {
			throw new DatabaseError("Failed to update comment:", error);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.prisma.taskComment.delete({
				where: { id },
			});
		} catch (error) {
			throw new DatabaseError("Failed to delete comment:", error);
		}
	}

	async deleteAllByTaskId(taskId: string): Promise<void> {
		try {
			await this.prisma.taskComment.deleteMany({
				where: { taskId },
			});
		} catch (error) {
			throw new DatabaseError(
				"Failed to delete all comments by task:",
				error
			);
		}
	}
}
