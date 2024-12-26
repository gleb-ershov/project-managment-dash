import { ProjectCategoryEntity } from "@/src/domain/enitites/project-category.entity";
import { ProjectCategory } from "@prisma/client";

export class PrismaProjectCategoryMapper {
	static toDomain(prismaCategory: ProjectCategory): ProjectCategoryEntity {
		return ProjectCategoryEntity.reconstitute({
			id: prismaCategory.id,
			name: prismaCategory.name,
		});
	}

	static toDomainList(
		prismaCategories: ProjectCategory[]
	): ProjectCategoryEntity[] {
		return prismaCategories.map(this.toDomain);
	}

	static toPrisma(
		entity: ProjectCategoryEntity
	): Omit<ProjectCategory, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			name: entity.name,
		};
	}
}
