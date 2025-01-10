import type { Metadata } from "next";
import "./globals.css";
import { getTheme } from "@/lib/utils/theme";
import { ThemeProvider } from "@/src/presentation/providers/theme-provider";
import { Poppins } from "next/font/google";

const font = Poppins({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Project Managment Dashboard",
	description: "Created by Gleb Ershov",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await getTheme();
	return (
		<html lang="en">
			<body className={`${font.className} antialiased`}>
				<ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
			</body>
		</html>
	);
}
