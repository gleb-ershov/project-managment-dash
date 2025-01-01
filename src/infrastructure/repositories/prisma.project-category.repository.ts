import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaProjectCategoryMapper } from "../mappers/prisma.project-category.mapper";
import { DatabaseError } from "@/src/domain/errors/application.error";

export class PrismaProjectCategoryRepository
	implements IProjectCategoryRepository
{
	constructor(private prisma: PrismaClient) {}

	async delete(id: string): Promise<void> {
		try {
			await this.prisma.projectCategory.delete({
				where: { id },
			});
		} catch (error) {
			throw new DatabaseError("Failed deleting project category:", error);
		}
	}

	async findByQuery(query: string): Promise<ProjectCategoryEntity[]> {
		try {
			const categories = await this.prisma.projectCategory.findMany({
				where: {
					name: {
						contains: query,
						mode: "insensitive",
					},
				},
			});
			return PrismaProjectCategoryMapper.toDomainList(categories);
		} catch (error) {
			throw new DatabaseError(
				"Failed to fetch categories by query:",
				error
			);
		}
	}

	async findById(id: string): Promise<ProjectCategoryEntity | null> {
		try {
			const category = await this.prisma.projectCategory.findUnique({
				where: { id },
			});

			if (!category) return null;

			return PrismaProjectCategoryMapper.toDomain(category);
		} catch (error) {
			throw new DatabaseError("Failed to fetch category by id:", error);
		}
	}

	async findAll(): Promise<ProjectCategoryEntity[]> {
		try {
			const categories = await this.prisma.projectCategory.findMany();
			return PrismaProjectCategoryMapper.toDomainList(categories);
		} catch (error) {
			throw new DatabaseError("Failed to fetch all categories:", error);
		}
	}

	async create(
		category: ProjectCategoryEntity
	): Promise<ProjectCategoryEntity> {
		try {
			const prismaCategory =
				PrismaProjectCategoryMapper.toPrisma(category);

			const created = await this.prisma.projectCategory.create({
				data: prismaCategory,
			});

			return PrismaProjectCategoryMapper.toDomain(created);
		} catch (error) {
			throw new DatabaseError("Failed creating project category:", error);
		}
	}

	async update(
		category: ProjectCategoryEntity
	): Promise<ProjectCategoryEntity> {
		try {
			const prismaCategory =
				PrismaProjectCategoryMapper.toPrisma(category);

			const updated = await this.prisma.projectCategory.update({
				where: { id: category.id },
				data: prismaCategory,
			});

			return PrismaProjectCategoryMapper.toDomain(updated);
		} catch (error) {
			throw new DatabaseError("Failed updating project category:", error);
		}
	}
}
