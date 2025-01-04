import { Spinner } from "./spinner";

export const FormLoadingFallback = () => {
	return (
		<div className="w-[200px] h-[120px] rounded-lg shadow-sm p-4 flex items-center flex-col justify-center gap-2">
			<div className="animate-pulse">Loading form for you</div>
			<Spinner className="h-8 w-8 p-0 text-[#212121]" />
		</div>
	);
};
