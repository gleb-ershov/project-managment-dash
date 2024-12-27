"use server";

import { Container } from "@/src/infrastructure/container/container";
import { redirect } from "next/navigation";

export const deleteProjectAction = async (projectId: string): Promise<void> => {
	try {
		const PROJECT_SERVICE =
			Container.getInstance().resolve("ProjectService");
		await PROJECT_SERVICE.deleteProject(projectId);
		redirect("/");
	} catch (error) {
		throw new Error("Failed to delete project");
	}
};
