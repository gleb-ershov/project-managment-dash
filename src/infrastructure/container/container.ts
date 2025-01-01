import { UserService } from "@/src/application/services/user.service";
import { JWTService } from "../services/jwt.service";
import { TeamService } from "@/src/application/services/team.service";
import { ProjectService } from "@/src/application/services/project.service";
import { TaskCommentService } from "@/src/application/services/task-comment.service";
import { TaskService } from "@/src/application/services/task.service";
import { ProjectCategoryService } from "@/src/application/services/project-category.service";
import { AuthService } from "@/src/application/services/auth.service";
import { createUserService } from "../factories/User.factory";
import { createAuthService } from "../factories/Auth.factory";
import { createProjectService } from "../factories/Project.factory";
import { createProjectCategoryService } from "../factories/ProjectCategory.factory";
import { createTaskService } from "../factories/Task.factory";
import { createTaskCommentService } from "../factories/TaskComment.factory";
import { createTeamService } from "../factories/Team.factory";
import { createTeamMemberService } from "../factories/TeamMember.factory";

type Dependencies = {
	UserService: UserService;
	ProjectService: ProjectService;
	TaskService: TaskService;
	TeamService: TeamService;
	ProjectCategoryService: ProjectCategoryService;
	TaskCommentService: TaskCommentService;
	AuthService: AuthService;
	JWTService: typeof JWTService;
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

		this.dependencies.set("UserService", createUserService());
		this.dependencies.set("AuthService", createAuthService());
		this.dependencies.set("ProjectService", createProjectService());
		this.dependencies.set(
			"ProjectCategoryService",
			createProjectCategoryService()
		);
		this.dependencies.set("TaskService", createTaskService());
		this.dependencies.set("TaskCommentService", createTaskCommentService());
		this.dependencies.set("TeamService", createTeamService());
		this.dependencies.set("TeamMemberService", createTeamMemberService());

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
