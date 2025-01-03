export const StatsBlockSkeleton = () => {
	return (
		<div className="flex h-36 w-[200px] flex-col gap-2 rounded-lg border-[1px] border-[#f3f3f3] p-4 shadow-sm duration-300 hover:border-transparent">
			<span className="h-[50px] w-[50px] rounded-lg bg-[#FAFAFA]" />
			<span className="h-[16px] w-[50px] rounded-lg bg-[#FAFAFA]" />
			<span className="h-[16px] w-[70%] rounded-lg bg-[#FAFAFA]" />
		</div>
	);
};
