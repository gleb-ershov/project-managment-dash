import { getUserLatestTasks } from "@/src/application/queries/task/get-latest-tasks";
import { getCurrentUser } from "@/src/application/queries/user/get-current-user";
import { OngoingTaskCard } from "../cards/ongoing-task-card";

export const OngoingTasksList = async () => {
	const ongoingTasksResponse = await getUserLatestTasks();

	return (
		<div className="mt-4 grid h-fit auto-rows-auto grid-cols-2 gap-4">
			{!ongoingTasksResponse.data ? (
				<span className="col-span-2 flex h-full w-full items-center justify-center text-[#BBBBBC]">
					There is no ongoing tasks
				</span>
			) : (	
				ongoingTasksResponse.data.map((task) => (
					<OngoingTaskCard {...task} key={task.id} />
				))
			)}
		</div>
	);
};
