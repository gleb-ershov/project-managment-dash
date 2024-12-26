import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { Project } from "@prisma/client";
import { ProjectWithRelations } from "./mapper.types";

export class PrismaProjectMapper {
	static toDomain(prismaProject: ProjectWithRelations): ProjectEntity {
		// Map createdBy user
		const createdBy = new UserEntity(
			prismaProject.createdBy.id,
			Email.create(prismaProject.createdBy.email),
			prismaProject.createdBy.name,
			prismaProject.createdBy.surname,
			prismaProject.createdBy.imageUrl,
			prismaProject.createdBy.plan,
			prismaProject.createdBy.description,
			undefined
		);

		// Map members
		const members = prismaProject.members
			? prismaProject.members.map(
					(member) =>
						new UserEntity(
							member.id,
							Email.create(member.email),
							member.name,
							member.surname,
							member.imageUrl,
							member.plan,
							member.description,
							undefined
						)
			  )
			: [];

		// Map tasks
		const tasks = prismaProject.tasks
			? prismaProject.tasks.map(
					(task) =>
						new TaskEntity(
							task.id,
							task.title,
							task.userId,
							task.projectId,
							task.priority,
							task.status,
							task.dueDate,
							task.externalLinks,
							task.tags,
							task.description,
							task.members?.map((m) => m.id),
							task.createdAt,
							task.updatedAt,
							task.deletedAt,
							[],
							new ProjectEntity(
								prismaProject.id,
								prismaProject.title,
								prismaProject.userId,
								prismaProject.dueDate,
								prismaProject.status,
								prismaProject.description,
								prismaProject.members?.map((m) => m.id),
								prismaProject.categories?.map((c) => c.id),
								prismaProject.createdAt,
								prismaProject.updatedAt,
								prismaProject.deletedAt,
								createdBy,
								[],
								[],
								[]
							),
							new UserEntity(
								task.createdBy.id,
								Email.create(task.createdBy.email),
								task.createdBy.name,
								task.createdBy.surname,
								task.createdBy.imageUrl,
								task.createdBy.plan,
								task.createdBy.description,
								undefined
							),
							[]
						)
			  )
			: [];

		const categories = prismaProject.categories
			? prismaProject.categories.map(
					(category) =>
						new ProjectCategoryEntity(category.id, category.name)
			  )
			: [];

		return new ProjectEntity(
			prismaProject.id,
			prismaProject.title,
			prismaProject.userId,
			prismaProject.dueDate,
			prismaProject.status,
			prismaProject.description,
			prismaProject.members?.map((m) => m.id),
			prismaProject.categories?.map((c) => c.id),
			prismaProject.createdAt,
			prismaProject.updatedAt,
			prismaProject.deletedAt,
			createdBy,
			members,
			tasks,
			categories
		);
	}

	static toPrisma(
		entity: ProjectEntity
	): Omit<Project, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			title: entity.title,
			userId: entity.userId,
			dueDate: entity.dueDate,
			status: entity.status,
			description: entity.description,
			deletedAt: entity.deletedAt,
		};
	}

	// Helper method for creating Prisma include object
	static includeRelations(
		options: {
			createdBy?: boolean;
			members?: boolean;
			tasks?: boolean;
			categories?: boolean;
		} = {}
	) {
		return {
			createdBy: options.createdBy ?? true,
			members: options.members ?? true,
			tasks: options.tasks ?? true,
			categories: options.categories ?? true,
		};
	}
}
