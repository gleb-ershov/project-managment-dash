import { AddEntityButton } from "@/src/presentation/components/shared/add-entity-button";
import { ProjectsList } from "@/src/presentation/components/project/lists/projects-page-list";

export default async function ProjectsPage(props: {
	searchParams?: Promise<{
		date?: string;
		projectName?: string;
		filterBy?: string;
		sortBy?: string;
	}>;
}) {
	const SEARCH_PARAMS = await props.searchParams;
	const PROJECT_FILTERS = {
		projectName: SEARCH_PARAMS?.projectName || "",
		filterBy: SEARCH_PARAMS?.filterBy || "",
		sortBy: SEARCH_PARAMS?.sortBy || "",
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<header className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							Projects
						</h1>
						<p className="mt-1 text-sm text-gray-500">
							Manage and track your projects
						</p>
					</div>

					<AddEntityButton
						path="/projects/create"
						label="Create new project"
					/>
				</header>
				<ProjectsList {...PROJECT_FILTERS} />
			</div>
		</div>
	);
}
