"use client";

import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	useSidebar,
} from "../ui/sidebar";

import Link from "next/link";
import { memo, ReactNode } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	ActivitySquare,
	Calendar,
	CheckCircle,
	ChevronDown,
	FolderOpen,
	Home,
	MessageCircleQuestion,
	Moon,
	PanelLeft,
	Settings,
	Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/src/presentation/utils/shared/cn";
import { CurrentUserCard } from "../user/cards/current-user-card";
import { useAuth } from "../../hooks/auth/use-auth";
import { ICON_PROPS_DEFAULT } from "../../consts";
import { ThemeToggle } from "../theme/theme-toggle";
import { useTheme } from "../../providers/theme/theme-provider";

export const Sidebar = memo(({ children }: { children: ReactNode }) => {
	const { state: isSidebarOpened, toggleSidebar } = useSidebar();
	const sidebarStatus = isSidebarOpened === "collapsed";
	const pathname = usePathname();
	const { user } = useAuth();
	const { theme } = useTheme();

	return (
		<ShadcnSidebar
			collapsible="icon"
			className="border-none bg-[#FAFAFA] duration-300"
		>
			<SidebarHeader className="mt-4">
				<button className="ml-auto md:hidden">
					<PanelLeft
						width={20}
						strokeWidth={1}
						onClick={() => toggleSidebar()}
					/>
				</button>
				<div className="mx-auto flex w-[85%] items-center gap-3">
					<div className="h-10 w-10 rounded-lg bg-[#C2DD4B]" />
					<div className="flex flex-col justify-center">
						<span className="text-sm font-semibold text-[#010100] dark:text-white">
							Current plan
						</span>
						<span className="text-[13px] text-[#808080]">
							{user?.plan
								? user?.plan.slice(0, 1) +
								  user?.plan.slice(1).toLowerCase()
								: null}
						</span>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger className="ml-auto outline-none">
							<ChevronDown color="#808080" size={20} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Plan</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/change-plan">Change plan</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</SidebarHeader>
			<SidebarContent className="mt-8">
				<SidebarMenu className="flex flex-col gap-4">
					<SidebarItemExtended
						link="/"
						textContent="Dashboard"
						sidebarStatus={sidebarStatus}
					>
						<Home {...ICON_PROPS_DEFAULT} />
					</SidebarItemExtended>
					<SidebarItemExtended
						link="/tasks"
						textContent="My Tasks"
						sidebarStatus={sidebarStatus}
					>
						<CheckCircle {...ICON_PROPS_DEFAULT} />
					</SidebarItemExtended>

					<Collapsible defaultOpen className="group/collapsible">
						<SidebarMenuItem
							className={cn(
								"mx-auto flex w-[90%] flex-col font-medium text-[#848485]",
								{
									"w-full justify-center": sidebarStatus,
								}
							)}
						>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									isActive={pathname.startsWith("/projects")}
									className={cn(
										"mx-auto flex h-10 items-center px-4 duration-300 hover:bg-[#F0F0EF] hover:text-[#101010]",
										{
											"justify-center": sidebarStatus,
										}
									)}
								>
									<div className="flex items-center gap-3">
										<span>
											<FolderOpen
												size={20}
												strokeWidth={1.5}
											/>
										</span>
										{sidebarStatus ? null : (
											<span>Projects</span>
										)}
									</div>
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>{children}</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>

					<SidebarItemExtended
						link="/schedule"
						textContent="Schedule"
						sidebarStatus={sidebarStatus}
					>
						<Calendar {...ICON_PROPS_DEFAULT} />
					</SidebarItemExtended>

					<SidebarItemExtended
						link="/activities"
						textContent="Activities"
						sidebarStatus={sidebarStatus}
					>
						<ActivitySquare {...ICON_PROPS_DEFAULT} />
					</SidebarItemExtended>

					<SidebarItemExtended
						link="/settings"
						textContent="Settings"
						sidebarStatus={sidebarStatus}
					>
						<Settings {...ICON_PROPS_DEFAULT} />
					</SidebarItemExtended>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="p-0">
				<SidebarMenu>
					<SidebarMenuItem className="mx-auto flex w-[90%] font-medium text-[#848485]">
						<span className="flex h-10 w-full items-center justify-between px-4 py-2 text-sm">
							<span className="flex w-full items-center gap-2">
								{theme === "light" ? (
									<Moon {...ICON_PROPS_DEFAULT} />
								) : (
									<Sun {...ICON_PROPS_DEFAULT} />
								)}
								<span>
									{theme === "light"
										? "Dark mode"
										: "Light mode"}
								</span>
							</span>
							<ThemeToggle />
						</span>
					</SidebarMenuItem>
					<SidebarMenuItem className="mx-auto flex w-[90%] font-medium text-[#848485]">
						<span className="flex h-10 w-full items-center justify-between px-4 py-2 text-sm">
							<span className="flex w-full items-center gap-2">
								<MessageCircleQuestion
									{...ICON_PROPS_DEFAULT}
								/>
								<span>Help</span>
							</span>
						</span>
					</SidebarMenuItem>
				</SidebarMenu>
				<CurrentUserCard />
			</SidebarFooter>
		</ShadcnSidebar>
	);
});

Sidebar.displayName = "Sidebar";

interface ISidebarItemProps {
	sidebarStatus: boolean;
	children: ReactNode;
	textContent: string;
	link: string;
}

const SidebarItemExtended = (props: ISidebarItemProps) => {
	const pathname = usePathname();
	const { sidebarStatus, children, textContent, link } = props;
	return (
		<SidebarMenuItem
			className={cn("mx-auto flex w-[90%] font-medium text-[#848485]", {
				"w-full justify-center": sidebarStatus,
			})}
		>
			<SidebarMenuButton
				isActive={pathname.endsWith(link)}
				className={cn(
					"flex h-10 items-center px-4 duration-300 hover:bg-[#F0F0EF] hover:text-[#101010] dark:hover:bg-[#27272a] dark:hover:text-white",
					{
						"justify-center": sidebarStatus,
					}
				)}
			>
				<Link href={link} className="flex items-center gap-3">
					<span>{children}</span>
					{sidebarStatus ? null : <span>{textContent}</span>}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
