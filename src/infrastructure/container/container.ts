import { CreateTaskUseCase } from "./../../application/use-cases/task/create-task.use-case";
import { FindUsersByQuery } from "./../../application/use-cases/user/find-users-by-query.use-case";
import { FindWithFiltersAndSortUseCase } from "./../../application/use-cases/project/find-with-filters-and-sort.use-case";
import { GetUserTeamsCountUseCase } from "./../../application/use-cases/team/get-user-teams-count.use-case";
import { GetUserFinishedProjectsCountUseCase } from "./../../application/use-cases/project/get-user-finished-projects-count.use-case";
import { DeleteProjectUseCase } from "./../../application/use-cases/project/delete-project.use-case";
import { prisma } from "@/prisma/db";
import { PrismaUserRepository } from "../repositories/prisma.user.repository";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-user.use-case";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import { UserService } from "@/src/application/services/user.service";
import { LoginUseCase } from "@/src/application/use-cases/auth/login.use-case";
import { JWTService } from "../services/jwt.service";
import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { RegisterUseCase } from "@/src/application/use-cases/auth/register.use-case";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.use-case";
import { RefreshTokenUseCase } from "@/src/application/use-cases/auth/refresh-token.use-case";
import { CreateProjectUseCase } from "@/src/application/use-cases/project/create-project.use-case";
import { PrismaProjectRepository } from "../repositories/prisma.project.repository";
import { SoftDeleteProjectUseCase } from "@/src/application/use-cases/project/soft-delete-project.use-case";
import { FindProjectsByUserIdUseCase } from "@/src/application/use-cases/project/find-projects-by-user-id.use-case";
import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { UpdateProjectUseCase } from "@/src/application/use-cases/project/update-project.use-case";
import { FindProjectByIdUseCase } from "@/src/application/use-cases/project/find-project-by-id.use-case";
import { PrismaProjectCategoryRepository } from "../repositories/prisma.project-category.repository";
import { CreateProjectCategoryUseCase } from "@/src/application/use-cases/project-category/create-project-category.use-case";
import { UpdateProjectCategoryUseCase } from "@/src/application/use-cases/project-category/update-project-category.use-case";
import { DeleteProjectCategoryUseCase } from "@/src/application/use-cases/project-category/delete-project-category.use-case";
import { PrismaTeamRepository } from "../repositories/prisma.team.repository";
import { TeamService } from "@/src/application/services/team.service";
import { PrismaTaskRepository } from "../repositories/prisma.task.repository";
import { GetUserLatestTasksUseCase } from "@/src/application/use-cases/task/get-user-latest-tasks.use-case";
import { FindProjectCategoriesByQueryUseCase } from "@/src/application/use-cases/project-category/find-project-category-by-query.use-case";
import { FindProjectsByQueryAndUserUseCase } from "@/src/application/use-cases/project/find-projects-by-query-and-user.use-case";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { PrismaTeamMemberRepository } from "../repositories/prisma.team-member.repository";
import { TeamMemberService } from "@/src/application/services/team-member.service";
import { GetUserTeamsUseCase } from "@/src/application/use-cases/team/get-user-teams-with-members.use-case";
import { CreateTaskCommentUseCase } from "@/src/application/use-cases/task-comment/create-task-comment.use-case";
import { UpdateTaskCommentUseCase } from "@/src/application/use-cases/task-comment/update-task-comment.use-case";
import { PrismaTaskCommentRepository } from "../repositories/prisma.task-comment.repository";
import { GetUserTasksGroupedByDateUseCase } from "@/src/application/use-cases/task/get-user-tasks-grouped-by-date";
import { ProjectService } from "@/src/application/services/project.service";
import { FindTaskByIdUseCase } from "@/src/application/use-cases/task/find-task-by-id.use-case";
import { TaskCommentService } from "@/src/application/services/task-comment.service";
import { TaskService } from "@/src/application/services/task.service";
import { ProjectCategoryService } from "@/src/application/services/project-category.service";
import { UpdateTaskUseCase } from "@/src/application/use-cases/task/update-task.use-case";
import { UpdateTeamUseCase } from "@/src/application/use-cases/team/update-team.use-case";
import { DeleteTaskUseCase } from "@/src/application/use-cases/task/delete-task.use-case";
import { DeleteTaskCommentUseCase } from "@/src/application/use-cases/task-comment/delete-task-comment.use-case";
import { DeleteTeamUseCase } from "@/src/application/use-cases/team/delete-team.use-case";
import { AuthService } from "@/src/application/services/auth.service";
import { FindTeamByIdUseCase } from "@/src/application/use-cases/team/find-team-by-id.use-case";
import { FindProjectCategoryByIdUseCase } from "@/src/application/use-cases/project-category/find-project-category-by-id.use-case";

type Dependencies = {
	UserRepository: IUserRepository;
	ProjectRepository: IProjectRepository;

	UserService: UserService;
	ProjectService: ProjectService;
	TaskService: TaskService;
	TeamService: TeamService;
	ProjectCategoryService: ProjectCategoryService;
	TaskCommentService: TaskCommentService;
	AuthService: AuthService;
	JWTService: typeof JWTService;

	CreateUserUseCase: CreateUserUseCase;
	GetUserUseCase: GetUserUseCase;
	LoginUseCase: LoginUseCase;
	RefreshTokenUseCase: RefreshTokenUseCase;
	RegisterUseCase: RegisterUseCase;
	UpdateUserUseCase: UpdateUserUseCase;
	FindUsersByQuery: FindUsersByQuery;

	CreateProjectUseCase: CreateProjectUseCase;
	FindProjectsByUserIdUseCase: FindProjectsByUserIdUseCase;
	SoftDeleteProjectUseCase: SoftDeleteProjectUseCase;
	DeleteProjectUseCase: DeleteProjectUseCase;
	FindProjectByIdUseCase: FindProjectByIdUseCase;
	UpdateProjectUseCase: UpdateProjectUseCase;
	GetUserFinishedProjectsCountUseCase: GetUserFinishedProjectsCountUseCase;
	FindWithFiltersAndSortUseCase: FindWithFiltersAndSortUseCase;
	FindProjectsByQueryAndUserUseCase: FindProjectsByQueryAndUserUseCase;

	CreateProjectCategoryUseCase: CreateProjectCategoryUseCase;
	UpdateProjectCategoryUseCase: UpdateProjectCategoryUseCase;
	DeleteProjectCategoryUseCase: DeleteProjectCategoryUseCase;
	FindProjectCategoriesByQueryUseCase: FindProjectCategoriesByQueryUseCase;

	CreateTaskCommentUseCase: CreateTaskCommentUseCase;
	UpdateTaskCommentUseCase: UpdateTaskCommentUseCase;
	DeleteTaskCommentUseCase: DeleteTaskCommentUseCase;

	CreateTeamWithMembersUseCase: CreateTeamWithMembersUseCase;
	GetUserTeamsCountUseCase: GetUserTeamsCountUseCase;
	GetUserTeamsUseCase: GetUserTeamsUseCase;
	UpdateTeamUseCase: UpdateTeamUseCase;
	DeleteTeamUseCase: DeleteTeamUseCase;

	GetUserLatestTasksUseCase: GetUserLatestTasksUseCase;
	CreateTaskUseCase: CreateTaskUseCase;
	FindTaskByIdUseCase: FindTaskByIdUseCase;
	GetUserTasksGroupedByDateUseCase: GetUserTasksGroupedByDateUseCase;
	UpdateTaskUseCase: UpdateTaskUseCase;
	DeleteTaskUseCase: DeleteTaskUseCase;
};

export class Container {
	private static instance: Container | null;
	private dependencies: Map<string, any>;
	private initialized: boolean = false;

	private constructor() {
		this.dependencies = new Map();
	}

	static getInstance(): Container {
		if (!Container.instance) {
			Container.instance = new Container();
			Container.instance.initialize();
		}
		return Container.instance;
	}

	private initialize() {
		if (this.initialized) return;
		// Repositories
		const userRepository = new PrismaUserRepository(prisma);
		this.dependencies.set("UserRepository", userRepository);

		const projectRepository = new PrismaProjectRepository(prisma);
		this.dependencies.set("ProjectRepository", projectRepository);

		const projectCategoryRepository = new PrismaProjectCategoryRepository(
			prisma
		);
		this.dependencies.set(
			"ProjectCategoryRepository",
			projectCategoryRepository
		);

		const teamRepository = new PrismaTeamRepository(prisma);
		this.dependencies.set("TeamRepository", teamRepository);

		const taskRepository = new PrismaTaskRepository(prisma);
		this.dependencies.set("TaskRepository", taskRepository);

		const taskCommentRepository = new PrismaTaskCommentRepository(prisma);
		this.dependencies.set("TaskCommentRepository", taskCommentRepository);

		const teamMemberRepository = new PrismaTeamMemberRepository(prisma);
		this.dependencies.set("TeamMemberRepository", teamMemberRepository);

		// Use-cases
		// User
		const createUserUseCase = new CreateUserUseCase(userRepository);
		this.dependencies.set("CreateUserUseCase", createUserUseCase);

		const getUserUseCase = new GetUserUseCase(userRepository);
		this.dependencies.set("GetUserUseCase", getUserUseCase);

		const updateUserUseCase = new UpdateUserUseCase(userRepository);
		this.dependencies.set("UpdateUserUseCase", updateUserUseCase);

		const findUsersByQueryUseCase = new FindUsersByQuery(userRepository);
		this.dependencies.set("FindUsersByQuery", findUsersByQueryUseCase);

		// Auth
		const loginUseCase = new LoginUseCase(userRepository, JWTService);
		this.dependencies.set("LoginUseCase", loginUseCase);

		const registerUseCase = new RegisterUseCase(userRepository, JWTService);
		this.dependencies.set("RegisterUseCase", registerUseCase);

		const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
		this.dependencies.set("RefreshTokenUseCase", refreshTokenUseCase);

		// Project
		const createProjectUseCase = new CreateProjectUseCase(
			projectRepository
		);
		this.dependencies.set("CreateProjectUseCase", createProjectUseCase);

		const findProjectByIdUseCase = new FindProjectByIdUseCase(
			projectRepository
		);
		this.dependencies.set("FindProjectByIdUseCase", findProjectByIdUseCase);

		const updateProjectUseCase = new UpdateProjectUseCase(
			projectRepository
		);
		this.dependencies.set("UpdateProjectUseCase", updateProjectUseCase);

		const deleteProjectUseCase = new DeleteProjectUseCase(
			projectRepository
		);
		this.dependencies.set("DeleteProjectUseCase", deleteProjectUseCase);

		const softDeleteProjectUseCase = new SoftDeleteProjectUseCase(
			projectRepository
		);
		this.dependencies.set(
			"SoftDeleteProjectUseCase",
			softDeleteProjectUseCase
		);

		const findProjectByUserIdUseCase = new FindProjectsByUserIdUseCase(
			projectRepository
		);
		this.dependencies.set(
			"FindProjectsByUserIdUseCase",
			findProjectByUserIdUseCase
		);

		const getUserFinishedProjectsCountUseCase =
			new GetUserFinishedProjectsCountUseCase(projectRepository);
		this.dependencies.set(
			"GetUserFinishedProjectsCountUseCase",
			getUserFinishedProjectsCountUseCase
		);

		const findWithFiltersAndSortUseCase = new FindWithFiltersAndSortUseCase(
			projectRepository
		);
		this.dependencies.set(
			"FindWithFiltersAndSortUseCase",
			findWithFiltersAndSortUseCase
		);

		const findProjectsByQueryUseCase =
			new FindProjectsByQueryAndUserUseCase(projectRepository);
		this.dependencies.set(
			"FindProjectsByQueryAndUserUseCase",
			findProjectsByQueryUseCase
		);

		const findProjectCategoryByIdUseCase =
			new FindProjectCategoryByIdUseCase(projectCategoryRepository);
		this.dependencies.set(
			"FindProjectCategoryByIdUseCase",
			findProjectCategoryByIdUseCase
		);

		// ProjectCategory
		const createProjectCategoryUseCase = new CreateProjectCategoryUseCase(
			projectCategoryRepository
		);
		this.dependencies.set(
			"CreateProjectCategoryUseCase",
			createProjectCategoryUseCase
		);

		const updateProjectCategoryUseCase = new UpdateProjectCategoryUseCase(
			projectCategoryRepository
		);
		this.dependencies.set(
			"UpdateProjectCategoryUseCase",
			updateProjectCategoryUseCase
		);

		const deleteProjectCategoryUseCase = new DeleteProjectCategoryUseCase(
			projectCategoryRepository
		);
		this.dependencies.set(
			"DeleteProjectCategoryUseCase",
			deleteProjectCategoryUseCase
		);

		const findProjectCategoryByQueryUseCase =
			new FindProjectCategoriesByQueryUseCase(projectCategoryRepository);
		this.dependencies.set(
			"FindProjectCategoriesByQueryUseCase",
			findProjectCategoryByQueryUseCase
		);
		// Task
		const createTaskUseCase = new CreateTaskUseCase(taskRepository);
		this.dependencies.set("CreateTaskUseCase", createTaskUseCase);

		const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
		this.dependencies.set("DeleteTaskUseCase", deleteTaskUseCase);

		const getUserLatestTasksUseCase = new GetUserLatestTasksUseCase(
			taskRepository
		);
		this.dependencies.set(
			"GetUserLatestTasksUseCase",
			getUserLatestTasksUseCase
		);

		const findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository);
		this.dependencies.set("FindTaskByIdUseCase", findTaskByIdUseCase);

		const getUserTasksGroupedByDateUseCase =
			new GetUserTasksGroupedByDateUseCase(taskRepository);
		this.dependencies.set(
			"GetUserTasksGroupedByDateUseCase",
			getUserTasksGroupedByDateUseCase
		);

		const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
		this.dependencies.set("UpdateTaskUseCase", updateTaskUseCase);

		// TaskComment
		const createTaskCommentUseCase = new CreateTaskCommentUseCase(
			taskCommentRepository,
			taskRepository
		);
		this.dependencies.set(
			"CreateTaskCommentUseCase",
			createTaskCommentUseCase
		);

		const updateTaskCommentUseCase = new UpdateTaskCommentUseCase(
			taskCommentRepository,
			taskRepository
		);
		this.dependencies.set(
			"UpdateTaskCommentUseCase",
			updateTaskCommentUseCase
		);

		const deleteTaskCommentUseCase = new DeleteTaskCommentUseCase(
			taskCommentRepository
		);
		this.dependencies.set(
			"DeleteTaskCommentUseCase",
			deleteTaskCommentUseCase
		);

		// Team
		const getUserTeamsCountUseCase = new GetUserTeamsCountUseCase(
			teamRepository
		);
		this.dependencies.set(
			"GetUserTeamsCountUseCase",
			getUserTeamsCountUseCase
		);

		const getUserTeamsUseCase = new GetUserTeamsUseCase(teamRepository);
		this.dependencies.set("GetUserTeamsUseCase", getUserTeamsUseCase);

		const createTeamWithMembersUseCase = new CreateTeamWithMembersUseCase(
			prisma,
			teamRepository,
			teamMemberRepository
		);
		this.dependencies.set(
			"CreateTeamWithMembersUseCase",
			createTeamWithMembersUseCase
		);

		const findTeamByIdUseCase = new FindTeamByIdUseCase(teamRepository);
		this.dependencies.set("FindTeamByIdUseCase", teamRepository);

		const updateTeamUseCase = new UpdateTeamUseCase(
			prisma,
			teamRepository,
			teamMemberRepository
		);
		this.dependencies.set("UpdateTeamUseCase", getUserTeamsUseCase);

		const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository);
		this.dependencies.set("DeleteTeamUseCase", deleteTeamUseCase);

		const getUserTeams = new GetUserTeamsUseCase(teamRepository);
		this.dependencies.set("GetUserTeamsUseCase", getUserTeams);

		// Services
		const userService = new UserService(
			createUserUseCase,
			getUserUseCase,
			findUsersByQueryUseCase,
			updateUserUseCase
		);
		this.dependencies.set("UserService", userService);

		const authService = new AuthService(
			loginUseCase,
			registerUseCase,
			refreshTokenUseCase
		);
		this.dependencies.set("AuthService", authService);

		const projectService = new ProjectService(
			createProjectUseCase,
			updateProjectUseCase,
			deleteProjectUseCase,
			softDeleteProjectUseCase,
			findProjectByIdUseCase,
			findProjectByUserIdUseCase,
			getUserFinishedProjectsCountUseCase,
			findWithFiltersAndSortUseCase,
			findProjectsByQueryUseCase
		);
		this.dependencies.set("ProjectService", projectService);

		const projectCategoryService = new ProjectCategoryService(
			createProjectCategoryUseCase,
			updateProjectCategoryUseCase,
			deleteProjectCategoryUseCase,
			findProjectCategoryByQueryUseCase,
			findProjectCategoryByIdUseCase
		);
		this.dependencies.set("ProjectCategoryService", projectCategoryService);

		const teamService = new TeamService(
			getUserTeamsCountUseCase,
			getUserTeamsUseCase,
			findTeamByIdUseCase,
			createTeamWithMembersUseCase,
			updateTeamUseCase,
			deleteTeamUseCase
		);
		this.dependencies.set("TeamService", teamService);

		const taskService = new TaskService(
			createTaskUseCase,
			updateTaskUseCase,
			deleteTaskUseCase,
			findTaskByIdUseCase,
			getUserLatestTasksUseCase,
			getUserTasksGroupedByDateUseCase
		);
		this.dependencies.set("TaskService", taskService);

		const taskCommentService = new TaskCommentService(
			createTaskCommentUseCase,
			updateTaskCommentUseCase,
			deleteTaskCommentUseCase
		);
		this.dependencies.set("TaskCommentService", taskCommentService);

		const teamMemberService = new TeamMemberService(
			createTeamWithMembersUseCase
		);
		this.dependencies.set("TeamMemberService", teamMemberService);

		this.dependencies.set("JWTService", JWTService);

		this.initialized = true;
	}

	resolve<K extends keyof Dependencies>(key: K): Dependencies[K] {
		const dependency = this.dependencies.get(key);

		if (!dependency) {
			throw new Error(`Dependency ${key} not found in container`);
		}

		return dependency as Dependencies[K];
	}

	static reset(): void {
		Container.instance = null;
	}
}
