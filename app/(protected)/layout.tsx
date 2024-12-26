import { SidebarProjectsList } from "@/src/presentation/components/project/lists/sidebar-projects-list";
import { Sidebar } from "@/src/presentation/components/shared/sidebar";
import { SidebarProvider } from "@/src/presentation/components/ui/sidebar";
import { AuthProvider } from "@/src/presentation/providers/auth/auth-provider";
import { Toaster } from "sonner";

export default function ProtectedRoutesLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<SidebarProvider>
				<Sidebar>
					<SidebarProjectsList />
				</Sidebar>
				{children}
				{modal}
				<Toaster position="bottom-right" />
			</SidebarProvider>
		</AuthProvider>
	);
}
