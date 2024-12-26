import { Suspense } from "react";
import { AddEntityButton } from "../../shared/add-entity-button";
import { ProjectCardSkeleton } from "../../skeletons/ProjectCardSkeleton";
import { OverviewPageProjectsList } from "../lists/overview-page-projects-list";
import { ProjectsFilterSelect } from "../form-elements/project-filter-select";
import { ProjectsSortSelect } from "../form-elements/project-sort-select";
import { ProjectFilterSearch } from "../form-elements/project-filter-search";
import Link from "next/link";

interface OverviewPageProjectsListWrapperProps {
	projectName: string;
	sortBy: string;
	filterBy: string;
}

export const OverviewPageProjectsListWrapper = (
	props: OverviewPageProjectsListWrapperProps
) => {
	return (
		<section className="mx-auto mt-8 w-[90%] flex flex-col gap-4">
			<div className="flex w-full items-center justify-between">
				<h2 className="text-2xl font-semibold">Projects</h2>
				<Link href="/projects" className="text-sm text-[#A3A2A4]">
					View all
				</Link>
			</div>
			<div className="flex items-center gap-2 w-full">
				<ProjectsFilterSelect />
				<ProjectsSortSelect />
				<ProjectFilterSearch containerclassname="ml-auto" />
			</div>
			<div className="mb-4 flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4 shadow-[0px_0px_20px_2px_#e3e2e4]">
				<AddEntityButton
					path="/projects/create"
					label="Create new project"
				/>
				<Suspense fallback={<ProjectCardSkeleton />}>
					<OverviewPageProjectsList {...props} />
				</Suspense>
			</div>
		</section>
	);
};
