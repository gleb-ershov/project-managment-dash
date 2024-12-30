import { useRouter } from "next/navigation";

export const useNavigateBack = () => {
	const { back } = useRouter();
	return back;
};
