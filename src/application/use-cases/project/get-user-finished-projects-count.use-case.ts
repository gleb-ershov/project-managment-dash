import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import { ValidationError } from "@/src/domain/errors/application.error";

export class GetUserFinishedProjectsCountUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(userId: string): Promise<number> {
		if (!userId) {
			throw new ValidationError("User ID is required");
		}

		const finishedProjects =
			await this.projectRepository.findFinishedProjectsByUserId(userId);

		if (!finishedProjects) {
			return 0;
		}

		return finishedProjects.length;
	}
}
