import { Card, CardContent, CardHeader } from "../../ui/card";
import { getUsersSharedTasks } from "@/src/application/queries/task/get-users-shared-tasks";
import { Separator } from "../../ui/separator";
import { SharedEntityListCard } from "../../shared/shared-entity-list-card";
import { CheckSquare2Icon } from "lucide-react";

interface SharedTasksListProps {
	userId: string;
	currentUserId: string;
}

export const SharedTasksList = async ({
	userId,
	currentUserId,
}: SharedTasksListProps) => {
	const tasks = await getUsersSharedTasks(userId, currentUserId);
	return (
		<Card className="dark:bg-[#18181B] flex-1 h-[500px]">
			<CardHeader className="py-4 flex items-center justify-between flex-row">
				Shared tasks
				<CheckSquare2Icon
					size={20}
					strokeWidth={1.5}
					className="text-muted-foreground"
				/>
			</CardHeader>
			<Separator className="w-[90%] mx-auto" />
			<CardContent className="overflow-y-auto max-h-[80%] flex flex-col gap-4 w-[95%] pt-4">
				{tasks.map((task) => (
					<SharedEntityListCard
						key={task.id}
						entity={task}
						type="task"
					/>
				))}
			</CardContent>
		</Card>
	);
};
