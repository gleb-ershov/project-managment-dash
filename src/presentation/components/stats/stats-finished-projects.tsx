import { Ellipsis, FolderCheck } from "lucide-react";
import { getUserFinishedProjectsCount } from "../../../application/queries/project/get-finished-projects-count";

export const StatsFinishedProjectsBlock = async () => {
	const finishedProjectsCount = await getUserFinishedProjectsCount();

	return (
		<div className="flex h-36 w-[200px] flex-col gap-2 rounded-lg border-[1px] border-[#f3f3f3] p-4 shadow-sm duration-300 hover:border-transparent">
			<div className="flex w-full justify-between">
				<span className="w-fit rounded-lg bg-[#FAFAFA] p-2">
					<FolderCheck fill="#6449DD" color="white" size={28} />
				</span>
				<Ellipsis size={22} color="#8A8A8E" />
			</div>
			<span className="text-xl font-semibold text-[#050402]">
				{finishedProjectsCount}
			</span>
			<span className="text-[#8A8A8E]">Projects finished</span>
		</div>
	);
};
