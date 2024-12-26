import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { IProjectCategoryRepository } from "@/src/domain/repositories/project-category.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaProjectCategoryMapper } from "../mappers/prisma.project-category.mapper";

export class PrismaProjectCategoryRepository
	implements IProjectCategoryRepository
{
	constructor(private prisma: PrismaClient) {}

	async delete(id: string): Promise<void> {
		await this.prisma.projectCategory.delete({
			where: { id },
		});
	}

	async findByQuery(query: string): Promise<ProjectCategoryEntity[]> {
		const categories = await this.prisma.projectCategory.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
		});

		return PrismaProjectCategoryMapper.toDomainList(categories);
	}

	async findById(id: string): Promise<ProjectCategoryEntity | null> {
		const category = await this.prisma.projectCategory.findUnique({
			where: { id },
		});

		if (!category) return null;

		return PrismaProjectCategoryMapper.toDomain(category);
	}

	async findAll(): Promise<ProjectCategoryEntity[]> {
		const categories = await this.prisma.projectCategory.findMany();

		return PrismaProjectCategoryMapper.toDomainList(categories);
	}

	async create(
		category: ProjectCategoryEntity
	): Promise<ProjectCategoryEntity> {
		const prismaCategory = PrismaProjectCategoryMapper.toPrisma(category);

		const created = await this.prisma.projectCategory.create({
			data: prismaCategory,
		});

		return PrismaProjectCategoryMapper.toDomain(created);
	}

	async update(
		category: ProjectCategoryEntity
	): Promise<ProjectCategoryEntity> {
		const prismaCategory = PrismaProjectCategoryMapper.toPrisma(category);

		const updated = await this.prisma.projectCategory.update({
			where: { id: category.id },
			data: prismaCategory,
		});

		return PrismaProjectCategoryMapper.toDomain(updated);
	}
}
