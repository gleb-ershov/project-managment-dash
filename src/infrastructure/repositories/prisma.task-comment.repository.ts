import { TaskCommentEntity } from "@/src/domain/enitites/task-comment.entity";
import { ITaskCommentRepository } from "@/src/domain/repositories/task-comment.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaTaskCommentMapper } from "../mappers/prisma.task-comment.mapper";

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
		const comment = await this.prisma.taskComment.findUnique({
			where: { id },
			include: { ...this.defaultInclude },
		});

		if (!comment) return null;

		return PrismaTaskCommentMapper.toDomain(comment);
	}

	async findByTaskId(taskId: string): Promise<TaskCommentEntity[]> {
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
	}

	async findByAuthorId(authorId: string): Promise<TaskCommentEntity[]> {
		const comments = await this.prisma.taskComment.findMany({
			where: { authorId },
			include: { ...this.defaultInclude },
		});

		return comments.map((comment) =>
			PrismaTaskCommentMapper.toDomain(comment)
		);
	}

	async create(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
		const created = await this.prisma.taskComment.create({
			data: PrismaTaskCommentMapper.toPrisma(comment),
			include: { ...this.defaultInclude },
		});

		return PrismaTaskCommentMapper.toDomain(created);
	}

	async update(comment: TaskCommentEntity): Promise<TaskCommentEntity> {
		const updated = await this.prisma.taskComment.update({
			where: { id: comment.id },
			data: PrismaTaskCommentMapper.toPrisma(comment),
			include: { ...this.defaultInclude },
		});

		return PrismaTaskCommentMapper.toDomain(updated);
	}

	async delete(id: string): Promise<void> {
		await this.prisma.taskComment.delete({
			where: { id },
		});
	}

	async deleteAllByTaskId(taskId: string): Promise<void> {
		await this.prisma.taskComment.deleteMany({
			where: { taskId },
		});
	}
}
