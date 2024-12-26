"use client";

import { Switch } from "../ui/switch";
import { useTheme } from "../../providers/theme/theme-provider";
import { ComponentPropsWithoutRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

export const ThemeToggle = ({
	className,
	props,
}: {
	className?: string;
	props?: ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;
}) => {
	const { theme, setTheme } = useTheme();

	return (
		<Switch
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			checked={theme === "dark"}
			className={`data-[state=checked]:bg-gray-500 data-[state=unchecked]:bg-textGrayRegular ${className}`}
			{...props}
		/>
	);
};
