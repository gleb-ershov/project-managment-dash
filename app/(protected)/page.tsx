import { OverviewPageProjectsListWrapper } from "@/src/presentation/components/project/wrappers/overview-page-projects-list-wrapper";
import { SearchButton } from "@/src/presentation/components/shared/search-button";
import { ShareButton } from "@/src/presentation/components/shared/share-button";
import { WelcomeMessageBlock } from "@/src/presentation/components/shared/welcome-message-block";
import { StatsWrapper } from "@/src/presentation/components/stats/stats-wrapper";
import { TasksByDay } from "@/src/presentation/components/task/lists/task-by-day-list";
import { AddTaskButton } from "@/src/presentation/components/task/ui/add-task-button";
import { OngoingTasksWrapper } from "@/src/presentation/components/task/wrappers/ongoing-tasks-wrapper";
import { OverviewPageTeamsList } from "@/src/presentation/components/team/lists/overview-page-teams-list";
import { getUserLatestTasks } from "@/src/application/queries/task/get-latest-tasks";
import Link from "next/link";

export default async function OverviewPage(props: {
	searchParams?: Promise<{
		date?: string;
		projectName?: string;
		filterBy?: string;
		sortBy?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const projectFilters = {
		projectName: searchParams?.projectName || "",
		filterBy: searchParams?.filterBy || "",
		sortBy: searchParams?.sortBy || "",
	};

	const tasks = await getUserLatestTasks();

	return (
		<div className="flex w-full justify-between dark:bg-[#212125]">
			<div className="flex flex-1 flex-col">
				<header className="mx-auto mt-6 flex w-[90%] items-center justify-between">
					<WelcomeMessageBlock />
					<div className="flex items-center gap-4">
						<SearchButton />
						<ShareButton />
						<AddTaskButton />
					</div>
				</header>
				<main className="flex h-full w-full flex-col gap-4">
					<StatsWrapper />
					<OngoingTasksWrapper />
					<OverviewPageProjectsListWrapper {...projectFilters} />
				</main>
			</div>
			<div className="ml-auto w-[22%] border-l-[1px] border-[#eeeeeeee] dark:border-[#555556a8]">
				<section className="mx-auto mt-6 flex w-[90%] flex-col gap-4">
					<h5 className="text-gray-700">Tasks by day</h5>
					<TasksByDay tasks={tasks} />
				</section>
				<section className="mx-auto mt-6 flex w-[90%] flex-col gap-4">
					<div className="flex items-center justify-between">
						<h5 className="text-gray-700">Your teams</h5>
						<Link href="/teams" className="text-sm text-[#A3A2A4]">
							View all
						</Link>
					</div>
					<OverviewPageTeamsList />
				</section>
			</div>
		</div>
	);
}
