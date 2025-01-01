import { IProjectRepository } from "@/src/domain/repositories/project.repository.interface";
import {
	InternalServerError,
	ValidationError,
} from "@/src/domain/errors/application.error";
import { BaseError } from "@/src/domain/errors/base.error";

export class GetUserFinishedProjectsCountUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(userId: string): Promise<number> {
		try {
			if (!userId) {
				throw new ValidationError("User ID is required");
			}

			const finishedProjects =
				await this.projectRepository.findFinishedProjectsByUserId(
					userId
				);

			if (!finishedProjects) {
				return 0;
			}

			return finishedProjects.length;
		} catch (error) {
			if (error instanceof BaseError) {
				throw error;
			}
			throw new InternalServerError("An unexpected error occured", error);
		}
	}
}
