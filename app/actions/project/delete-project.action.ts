"use server";

import { Container } from "@/src/infrastructure/container/container";
import { redirect } from "next/navigation";

export const deleteProjectAction = async (projectId: string): Promise<void> => {
	try {
		const projectService =
			Container.getInstance().resolve("ProjectService");
		await projectService.deleteProject(projectId);
		redirect("/");
	} catch (error) {
		throw new Error("Failed to delete project");
	}
};
