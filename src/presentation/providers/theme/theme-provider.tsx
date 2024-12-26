"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/lib/utils/theme";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme: Theme;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined
);

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}, [theme]);

	const handleThemeChange = (newTheme: Theme) => {
		setTheme(newTheme);
		document.cookie = `theme=${newTheme};path=/;max-age=${
			60 * 60 * 24 * 365
		}`;
	};

	return (
		<ThemeProviderContext.Provider
			value={{ theme, setTheme: handleThemeChange }}
		>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
