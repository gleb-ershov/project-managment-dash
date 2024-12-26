import { Task } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";

export const OngoingTaskCard = (props: TaskViewModel) => {
	const { id, tags, description, title } = props;
	return (
		<div className="group flex flex-col gap-2 rounded-lg border-[1px] border-[#E5E5E5] p-4 duration-300 hover:bg-[#FFA800] hover:shadow-lg hover:shadow-[#FFF1D6]">
			<div className="flex items-center gap-1">
				{tags.map((tag) => (
					<Badge
						key={tag}
						className="rounded-lg bg-[#F2F2F1] p-1 px-2 font-normal text-[#7A7A7C] shadow-none duration-300 group-hover:bg-[#FFBD3E] group-hover:text-white"
					>
						{tag}
					</Badge>
				))}
			</div>
			<span className="font-medium duration-300 group-hover:text-white">
				{title}
			</span>
			<p className="overflow-hidden text-sm text-[#828283] duration-300 group-hover:text-white line-clamp-3">
				{description}
			</p>
			<Link
				href={`/tasks/${id}`}
				className="flex items-center gap-2 text-[14px] font-medium text-[#6d6d6d] duration-300 group-hover:text-white"
			>
				Details <ArrowRight size={14} />
			</Link>
		</div>
	);
};
