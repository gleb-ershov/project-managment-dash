import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export const getTheme = async (): Promise<Theme> => {
	"server-only";

	const cookieStore = await cookies();
	const theme = cookieStore.get("theme");

	return (theme?.value as Theme) || "light";
};
