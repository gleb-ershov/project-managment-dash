import { differenceInDays, parse } from "date-fns";
import { ProjectViewModel } from "../../view-models/project.view-model";

export const getProjectStats = (project: ProjectViewModel) => {
	const totalTasks = project.tasks?.length || 0;
	const completedTasks =
		project.tasks?.filter((task) => task.status === "COMPLETED").length ||
		0;
	const teamMembers = project.members?.length || 0;

	let daysRemaining = 0;
	if (project.dueDate) {
		const parsedDueDate = parse(project.dueDate, "PPP", new Date());
		daysRemaining = Math.max(
			0,
			differenceInDays(parsedDueDate, new Date())
		);
	}
	return {
		totalTasks,
		completedTasks,
		teamMembers,
		daysRemaining,
	};
};
