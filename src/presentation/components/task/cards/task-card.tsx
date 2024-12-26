import { Badge } from "../../ui/badge";
import { CalendarDays, Clock, Link as LinkIcon, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";

type TaskCardProps = TaskViewModel;

export const TaskCard = (props: TaskCardProps) => {
	const {
		title,
		description,
		tags,
		status,
		createdAt,
		updatedAt,
		priority,
		externalLinks,
		members,
	} = props;

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "HIGH":
				return "bg-red-100 text-red-800";
			case "MEDIUM":
				return "bg-orange-100 text-orange-800";
			case "LOW":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="flex flex-col gap-6 rounded-xl border border-[#E5E5E5] bg-white p-6">
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold text-gray-900">
						{title}
					</h1>
					<div className="flex items-center gap-2">
						<Badge
							className={`px-3 py-1 ${getPriorityColor(
								priority
							)}`}
						>
							<Flag className="mr-1 h-3 w-3" />
							{priority}
						</Badge>
						<Badge
							className={`px-3 py-1 ${
								status === "COMPLETED"
									? "bg-green-100 text-green-800"
									: status === "ONGOING"
									? "bg-blue-100 text-blue-800"
									: "bg-yellow-100 text-yellow-800"
							}`}
						>
							{status.replace("_", " ")}
						</Badge>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Badge
							key={tag}
							className="rounded-lg bg-[#F2F2F1] px-3 py-1 text-sm font-normal text-[#7A7A7C]"
						>
							{tag}
						</Badge>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="text-lg font-medium text-gray-900">
					Description
				</h2>
				<p className="whitespace-pre-wrap text-gray-600">
					{description}
				</p>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="text-lg font-medium text-gray-900">Members</h2>
				{members ? <LinkedUsersAvatarList members={members} /> : null}
			</div>

			{externalLinks && externalLinks.length > 0 && (
				<div className="flex flex-col gap-2">
					<h2 className="text-lg font-medium text-gray-900">
						External Links
					</h2>
					<div className="flex flex-col gap-2">
						{externalLinks.map((link, index) => (
							<Link
								key={index}
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
							>
								<LinkIcon className="h-4 w-4" />
								{link}
							</Link>
						))}
					</div>
				</div>
			)}

			<div className="flex flex-col gap-2 border-t border-[#E5E5E5] pt-4">
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<CalendarDays size={16} />
					<span>Created {createdAt}</span>
				</div>
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<Clock size={16} />
					<span>Last updated {updatedAt}</span>
				</div>
			</div>
		</div>
	);
};
