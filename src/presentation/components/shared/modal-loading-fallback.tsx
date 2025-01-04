import { Spinner } from "./spinner";

export const ModalLoadingFallback = () => {
	return (
		<div className="w-[320px] rounded-lg h-[200px] bg-white shadow-sm dark:bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
			<Spinner className="text-[#212121] h-10 w-10" />
		</div>
	);
};
