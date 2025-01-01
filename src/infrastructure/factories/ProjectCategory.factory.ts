import { prisma } from "@/prisma/db";
import { PrismaProjectCategoryRepository } from "../repositories/prisma.project-category.repository";
import { ProjectCategoryService } from "@/src/application/services/project-category.service";
import { FindProjectCategoryByIdUseCase } from "@/src/application/use-cases/project-category/find-project-category-by-id.use-case";
import { CreateProjectCategoryUseCase } from "@/src/application/use-cases/project-category/create-project-category.use-case";
import { UpdateProjectCategoryUseCase } from "@/src/application/use-cases/project-category/update-project-category.use-case";
import { DeleteProjectCategoryUseCase } from "@/src/application/use-cases/project-category/delete-project-category.use-case";
import { FindProjectCategoriesByQueryUseCase } from "@/src/application/use-cases/project-category/find-project-category-by-query.use-case";

const projectCategoryRepository = new PrismaProjectCategoryRepository(prisma);
const findProjectCategoryByIdUseCase = new FindProjectCategoryByIdUseCase(
	projectCategoryRepository
);
const createProjectCategoryUseCase = new CreateProjectCategoryUseCase(
	projectCategoryRepository
);
const updateProjectCategoryUseCase = new UpdateProjectCategoryUseCase(
	projectCategoryRepository
);
const deleteProjectCategoryUseCase = new DeleteProjectCategoryUseCase(
	projectCategoryRepository
);
const findProjectCategoryByQueryUseCase =
	new FindProjectCategoriesByQueryUseCase(projectCategoryRepository);

export function createProjectCategoryService(): ProjectCategoryService {
	return new ProjectCategoryService(
		createProjectCategoryUseCase,
		updateProjectCategoryUseCase,
		deleteProjectCategoryUseCase,
		findProjectCategoryByQueryUseCase,
		findProjectCategoryByIdUseCase
	);
}
