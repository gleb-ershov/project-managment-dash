import Link from "next/link";
import { Suspense } from "react";
import { OngoingTasksListSkeleton } from "../../skeletons/ongoing-tasks-list-skeleton";
import { OngoingTasksList } from "../lists/ongoing-tasks-list";

export const OngoingTasksWrapper = async () => {
	return (
		<section className="mx-auto mt-8 w-[90%]">
			<div className="flex w-full items-center justify-between">
				<h2 className="text-2xl font-semibold">Ongoing tasks</h2>
				<Link href="/tasks" className="text-sm text-[#A3A2A4]">
					View all
				</Link>
			</div>
			<Suspense fallback={<OngoingTasksListSkeleton />}>
				<OngoingTasksList />
			</Suspense>
		</section>
	);
};
