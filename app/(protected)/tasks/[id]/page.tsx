import { notFound } from "next/navigation";
import { TaskCard } from "@/src/presentation/components/task/cards/task-card";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/presentation/components/ui/button";
import { Separator } from "@/src/presentation/components/ui/separator";
import { getTaskById } from "@/src/application/queries/task/get-task-by-id";
import { TaskCommentsCard } from "@/src/presentation/components/task/cards/task-comments-card";

export default async function TaskPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const idParams = await params;
	const task = await getTaskById(idParams.id);
	console.log("PAGE", task);
	if (!task) {
		notFound();
	}

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/tasks">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-5 w-5" />
						</Button>
					</Link>
					<div>
						<h1 className="text-xl font-semibold">Task Details</h1>
						<p className="text-sm text-muted-foreground">
							View and manage task information
						</p>
					</div>
				</div>
				<Link href={`/tasks/${idParams.id}/edit`}>
					<Button variant="outline" className="gap-2">
						<Pencil className="h-4 w-4" />
						Edit Task
					</Button>
				</Link>
			</div>

			<Separator className="mb-6" />

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<TaskCard {...task} />
				</div>
				{task.comments ? (
					<TaskCommentsCard
						taskId={idParams.id}
						comments={task.comments}
					/>
				) : null}
			</div>
		</div>
	);
}
