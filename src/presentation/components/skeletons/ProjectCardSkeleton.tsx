import { FolderKanban, FolderOpen } from "lucide-react";

export const ProjectCardSkeleton = () => {
	return (
		<div className="mx-auto flex w-[95%] items-center animate-pulse">
			<div className="flex h-[50px] w-1/2 items-center gap-2">
				<span className="w-fit rounded-xl bg-[#DD4A78] p-2">
					<FolderKanban color="#DD4A78" fill="white" />
				</span>
				<div className="flex flex-col gap-1">
					<span className="h-[12px] w-[80px] rounded-lg bg-[#F2F2F1]" />
					<span className="flex items-center gap-1 text-[13px] font-normal text-[#777778]">
						<FolderOpen size={14} />
						<span className="h-[12px] flex-1 rounded-lg bg-[#F2F2F1]" />
					</span>
				</div>
			</div>
			<div className="flex h-[50px] w-1/2 items-center justify-between">
				<div className="flex flex-col">
					<span className="text-sm text-[#777778]">Status</span>
					<span className="h-[12px] w-[80px] rounded-lg bg-[#F2F2F1]" />
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-[#777778]">Deadline</span>
					<span className="h-[12px] w-[50px] rounded-lg bg-[#F2F2F1]" />
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-[#777778]">Members</span>
					<span className="h-[12px] w-[50px] rounded-lg bg-[#F2F2F1]" />
				</div>
			</div>
		</div>
	);
};
