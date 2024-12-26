import { FolderIcon } from "lucide-react";
import { ProjectFilterSearch } from "../form-elements/project-filter-search";
import { ProjectsFilterSelect } from "../form-elements/project-filter-select";
import { ProjectsSortSelect } from "../form-elements/project-sort-select";
import { AddEntityButton } from "../../shared/add-entity-button";
import { ProjectListCard } from "../cards/projects-page-list-card";
import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import { getFilteredAndSortedProjects } from "@/src/application/queries/project/get-filtered-and-sorted-projects";
import { ProjectStatus } from "@/src/domain/value-objects/project-status.value-object";

interface ProjectsListProps {
	projectName: string;
	sortBy: string;
	filterBy: string;
}

export const ProjectsList = async (props: ProjectsListProps) => {
	const { projectName, sortBy, filterBy } = props;

	const requestParams = {
		status: filterBy as ProjectStatus,
		sortBy: (sortBy || "latest") as "latest" | "oldest",
		userId: (await getCurrentUser())?.id || "",
		searchQuery: projectName,
	};

	const projects = (await getFilteredAndSortedProjects(requestParams)) || [];

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<ProjectFilterSearch />
				<div className="flex gap-2">
					<ProjectsFilterSelect />
					<ProjectsSortSelect />
				</div>
			</div>

			{projects.length === 0 ? (
				<EmptyState />
			) : (
				<div className="grid gap-4">
					{projects.map((project) => (
						<ProjectListCard key={project.id} project={project} />
					))}
				</div>
			)}
		</div>
	);
};

const EmptyState = () => (
	<div className="flex flex-col items-center justify-center h-[400px] text-center">
		<div className="rounded-full bg-gray-100 p-3 mb-4">
			<FolderIcon className="h-6 w-6 text-gray-400" />
		</div>
		<h3 className="text-lg font-medium text-gray-900">No projects found</h3>
		<p className="mt-1 text-sm text-gray-500">
			Get started by creating a new project
		</p>
		<AddEntityButton path="/projects/create" label="Create new project" />
	</div>
);
