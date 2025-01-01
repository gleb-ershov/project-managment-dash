import { prisma } from "@/prisma/db";
import { ProjectService } from "@/src/application/services/project.service";
import { PrismaProjectRepository } from "../repositories/prisma.project.repository";
import { FindUsersSharedProjectsUseCase } from "@/src/application/use-cases/project/find-users-shared-projects.use-case";
import { FindProjectsByQueryAndUserUseCase } from "@/src/application/use-cases/project/find-projects-by-query-and-user.use-case";
import { FindWithFiltersAndSortUseCase } from "@/src/application/use-cases/project/find-with-filters-and-sort.use-case";
import { GetUserFinishedProjectsCountUseCase } from "@/src/application/use-cases/project/get-user-finished-projects-count.use-case";
import { FindProjectsByUserIdUseCase } from "@/src/application/use-cases/project/find-projects-by-user-id.use-case";
import { SoftDeleteProjectUseCase } from "@/src/application/use-cases/project/soft-delete-project.use-case";
import { DeleteProjectUseCase } from "@/src/application/use-cases/project/delete-project.use-case";
import { UpdateProjectUseCase } from "@/src/application/use-cases/project/update-project.use-case";
import { FindProjectByIdUseCase } from "@/src/application/use-cases/project/find-project-by-id.use-case";
import { CreateProjectUseCase } from "@/src/application/use-cases/project/create-project.use-case";

const projectRepository = new PrismaProjectRepository(prisma);
const createProjectUseCase = new CreateProjectUseCase(projectRepository);

const findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);

const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);

const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

const softDeleteProjectUseCase = new SoftDeleteProjectUseCase(
	projectRepository
);

const findProjectByUserIdUseCase = new FindProjectsByUserIdUseCase(
	projectRepository
);

const getUserFinishedProjectsCountUseCase =
	new GetUserFinishedProjectsCountUseCase(projectRepository);
const findWithFiltersAndSortUseCase = new FindWithFiltersAndSortUseCase(
	projectRepository
);

const findProjectsByQueryUseCase = new FindProjectsByQueryAndUserUseCase(
	projectRepository
);

const findUsersSharedProjects = new FindUsersSharedProjectsUseCase(
	projectRepository
);

export function createProjectService(): ProjectService {
	return new ProjectService(
		createProjectUseCase,
		updateProjectUseCase,
		deleteProjectUseCase,
		softDeleteProjectUseCase,
		findProjectByIdUseCase,
		findProjectByUserIdUseCase,
		getUserFinishedProjectsCountUseCase,
		findWithFiltersAndSortUseCase,
		findProjectsByQueryUseCase,
		findUsersSharedProjects
	);
}
