import { getFilteredAndSortedProjects } from "@/src/application/queries/project/get-filtered-and-sorted-projects";
import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import { OverviewPageProjectsListCard } from "../cards/overview-page-project-list-card";
import { ProjectStatus } from "@/src/domain/value-objects/project-status.value-object";

interface OverviewPageProjectsListProps {
	projectName: string;
	sortBy: string;
	filterBy: string;
}

export const OverviewPageProjectsList = async (
	props: OverviewPageProjectsListProps
) => {
	const { projectName, sortBy, filterBy } = props;

	const requestParams = {
		status: filterBy as ProjectStatus,
		sortBy: (sortBy || "latest") as "latest" | "oldest",
		userId: (await getCurrentUser())?.id || "",
		searchQuery: projectName,
	};

	const projects = await getFilteredAndSortedProjects(requestParams);
	return (
		<>
			{projects.data ? (
				projects.data.map((project) => (
					<OverviewPageProjectsListCard
						key={project.id}
						{...project}
					/>
				))
			) : (
				<p className="text-center text-gray-500">No projects found</p>
			)}
		</>
	);
};
