import { ProtectedRoute } from "@/src/presentation/components/auth/protected-route";
import { SidebarProjectsList } from "@/src/presentation/components/project/lists/sidebar-projects-list";
import { Sidebar } from "@/src/presentation/components/shared/sidebar";
import { SidebarProvider } from "@/src/presentation/components/ui/sidebar";
import { AuthProvider } from "@/src/presentation/providers/auth/auth-provider";

export default function ProtectedRoutesLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			{/* <ProtectedRoute> */}
			<SidebarProvider>
				<Sidebar>
					<SidebarProjectsList />
				</Sidebar>
				{children}
				{modal}
			</SidebarProvider>
			{/* </ProtectedRoute> */}
		</AuthProvider>
	);
}
