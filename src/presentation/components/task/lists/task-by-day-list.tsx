"use client";

import { useState } from "react";
import { Calendar } from "../../ui/calendar";
import { TaskByDayCardSkeleton } from "../../skeletons/TaskByDayCardSkeleton";
import { format } from "date-fns";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";

interface Task {
	id: string;
	title: string;
	description: string | null;
	dueDate: string;
}

interface TasksByDayProps {
	tasks: TaskViewModel[];
	isLoading?: boolean;
}

export const TasksByDay = ({ tasks, isLoading = false }: TasksByDayProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		new Date()
	);

	const filteredTasks = tasks.filter((task) => {
		if (!selectedDate) return false;
		return (
			task.dueDate ===
			format(selectedDate, "PPP")
		);
	});

	return (
		<div className="flex flex-col gap-6">
			<Calendar
				mode="single"
				selected={selectedDate}
				onSelect={setSelectedDate}
				className="rounded-md border mx-auto dark:bg-[#18181B]"
			/>

			<div className="flex flex-col gap-4">
				{isLoading ? (
					Array(3)
						.fill(0)
						.map((_, index) => (
							<TaskByDayCardSkeleton key={index} />
						))
				) : filteredTasks.length === 0 ? (
					<span className="text-[#BBBBBC] text-center">
						No tasks for this day
					</span>
				) : (
					filteredTasks.map((task) => (
						<div
							key={task.id}
							className="flex w-full items-center gap-4"
						>
							<div className="flex w-full flex-col gap-2">
								<span className="font-medium">
									{task.title}
								</span>
								{task.description && (
									<span className="text-sm text-gray-500">
										{task.description}
									</span>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
