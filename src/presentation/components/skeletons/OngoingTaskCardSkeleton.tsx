import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

export const OngoingTaskCardSkeleton = () => {
	return (
		<div className="group flex flex-col gap-3 rounded-lg border-[1px] border-[#E5E5E5] p-4 duration-300">
			<div className="flex items-center gap-1">
				<Badge className="h-[26px] w-[57px] rounded-lg bg-[#F2F2F1] shadow-none group-hover:text-white" />
				<Badge className="h-[26px] w-[57px] rounded-lg bg-[#F2F2F1] shadow-none group-hover:text-white" />
				<Badge className="h-[26px] w-[57px] rounded-lg bg-[#F2F2F1] shadow-none group-hover:text-white" />
			</div>
			<span className="h-[16px] w-2/3 rounded-lg bg-[#f3f3f3]" />
			<p className="h-[14px] rounded-lg bg-[#f3f3f3]" />
			<span className="flex items-center gap-2 text-[14px] font-medium text-[#6d6d6d] duration-300">
				Details <ArrowRight size={14} />
			</span>
		</div>
	);
};
