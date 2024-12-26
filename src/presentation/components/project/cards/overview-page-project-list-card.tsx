import { memo } from "react";
import { FolderKanban, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../ui/tooltip";
import { LinkedUsersAvatarList } from "../../shared/linked-users-avatar-list";
import { cn } from "@/src/presentation/utils/shared/cn";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";

// Separate status configuration for better maintainability
const STATUS_CONFIG = {
	IN_PROGRESS: { color: "bg-blue-300" },
	COMPLETED: { color: "bg-green-300" },
	ON_HOLD: { color: "bg-yellow-300" },
	CANCELLED: { color: "bg-red-300" },
} as const;

// Separate components for better organization and reusability
const ProjectIcon = memo(() => (
	<span className="w-fit rounded-xl bg-[#DD4A78] p-2">
		<FolderKanban color="#DD4A78" fill="white" />
	</span>
));
ProjectIcon.displayName = "ProjectIcon";

const ProjectTitle = memo(({ id, title }: { id: string; title: string }) => (
	<Link
		className="text-sm font-medium hover:underline transition-all"
		href={`/projects/${id}`}
	>
		{title}
	</Link>
));
ProjectTitle.displayName = "ProjectTitle";

const ProjectCreator = memo(({ name }: { name: string }) => (
	<span className="flex items-center gap-1 text-[13px] font-normal text-[#777778]">
		<FolderOpen size={14} />
		{name}
	</span>
));
ProjectCreator.displayName = "ProjectCreator";

const ProjectCategories = memo(
	({
		categories = [],
	}: {
		categories: Array<{ id: string; name: string }>;
	}) => {
		const displayCategories = categories.slice(0, 3);
		const remainingCount = categories.length - 3;

		return (
			<div className="flex flex-col gap-1">
				<span className="text-sm text-[#777778]">Categories</span>
				<span className="flex items-center gap-2 text-[12px]">
					{displayCategories.length > 0 ? (
						<div className="flex items-center gap-1">
							{displayCategories.map((category, index) => (
								<span
									key={category.id}
									className="flex items-center"
								>
									<span>{category.name}</span>
									{index < displayCategories.length - 1 &&
										index < 2 &&
										categories.length > 1 && (
											<span className="mx-1">•</span>
										)}
								</span>
							))}
							{remainingCount > 0 && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<span className="text-[#777778]">
												{`+${remainingCount}`}
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<div className="flex flex-col gap-1">
												{categories
													.slice(3)
													.map((category) => (
														<span key={category.id}>
															{category.name}
														</span>
													))}
											</div>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>
					) : (
						"No categories"
					)}
				</span>
			</div>
		);
	}
);
ProjectCategories.displayName = "ProjectCategories";

const ProjectStatus = memo(
	({ status }: { status: keyof typeof STATUS_CONFIG }) => (
		<div className="flex flex-col gap-1">
			<span className="text-sm text-[#777778]">Status</span>
			<span className="flex items-center gap-2 text-[12px]">
				<span
					className={cn(
						"h-[8px] w-[8px] rounded-full",
						STATUS_CONFIG[status].color
					)}
				/>
				{`${status.replace("_", " ").toLowerCase()}`}
			</span>
		</div>
	)
);
ProjectStatus.displayName = "ProjectStatus";

const ProjectDeadline = memo(({ date }: { date: string }) => (
	<div className="flex flex-col gap-1">
		<span className="text-sm text-[#777778]">Deadline</span>
		<span className="flex items-center gap-2 text-[12px]">
			{date}
		</span>
	</div>
));
ProjectDeadline.displayName = "ProjectDeadline";

interface OverviewPageProjectsListCardProps extends ProjectViewModel {
	className?: string;
}

export const OverviewPageProjectsListCard = memo(
	(props: OverviewPageProjectsListCardProps) => {
		const {
			id,
			title,
			createdBy,
			status,
			members,
			categories,
			dueDate,
			className,
		} = props;
		return (
			<div className={cn("mx-auto flex w-[95%] items-center", className)}>
				<div className="flex h-[50px] w-1/2 items-center gap-2">
					<ProjectIcon />
					<div className="flex flex-col gap-1">
						<ProjectTitle id={id} title={title} />
						{createdBy ? (
							<ProjectCreator
								name={`${createdBy.name} ${createdBy.surname}`}
							/>
						) : null}
					</div>
				</div>
				<div className="grid grid-cols-4 h-[50px] w-1/2">
					{categories ? <ProjectCategories categories={categories} /> : null}
					<ProjectStatus status={status as keyof typeof STATUS_CONFIG} />
					<ProjectDeadline date={dueDate} />
					{members ? <LinkedUsersAvatarList members={members} /> : null}
				</div>
			</div>
		);
	}
);

OverviewPageProjectsListCard.displayName = "OverviewPageProjectsListCard";
