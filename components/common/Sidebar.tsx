'use client';

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
} from '@/components/ui/sidebar';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { Input } from '../ui/input';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
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
    Search,
    Settings,
    Sun,
} from 'lucide-react';
import { cn } from '@/utils/helpers/cn';
import { usePathname } from 'next/navigation';
import { CurrentUserBlock } from './CurrentUserBlock';
import { ToggleColorModeSwitch } from './ToggleColorModeSwitch';
import { useColorMode } from '@/hooks/useColorMode';
import { useCurrentUser } from '../providers/AuthProvider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Sidebar = ({ children }: { children: ReactNode }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { state: isSidebarOpened, toggleSidebar } = useSidebar();
    const sidebarStatus = isSidebarOpened === 'collapsed';
    const { currentTheme } = useColorMode();
    const pathname = usePathname();
    const {
        currentUser: { plan },
    } = useCurrentUser();
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
                            {plan.slice(0, 1).toUpperCase() + plan.slice(1)}
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
            {sidebarStatus ? null : (
                <div className="mx-auto mt-4 flex w-[85%] items-center rounded-lg border-[1px] border-[#F7F7F7] bg-white px-2 py-0.5 shadow-sm has-[:focus]:border-accentPink">
                    <Search className="text-accentPink" />
                    <Input
                        type="search"
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        value={searchValue}
                        placeholder="Search anything"
                        className="rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                </div>
            )}
            <SidebarContent className="mt-8">
                <SidebarMenu className="flex flex-col gap-4">
                    <SidebarItemExtended
                        link="/"
                        textContent="Dashboard"
                        sidebarStatus={sidebarStatus}
                    >
                        <Home size={20} strokeWidth={1.5} />
                    </SidebarItemExtended>
                    <SidebarItemExtended
                        link="/tasks"
                        textContent="My Tasks"
                        sidebarStatus={sidebarStatus}
                    >
                        <CheckCircle size={20} strokeWidth={1.5} />
                    </SidebarItemExtended>

                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem
                            className={cn(
                                'mx-auto flex w-[90%] flex-col font-medium text-[#848485]',
                                {
                                    'w-full justify-center': sidebarStatus,
                                }
                            )}
                        >
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    isActive={pathname.startsWith('/projects')}
                                    className={cn(
                                        'mx-auto flex h-10 items-center px-4 duration-300 hover:bg-[#F0F0EF] hover:text-[#101010]',
                                        {
                                            'justify-center': sidebarStatus,
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
                        <Calendar size={20} strokeWidth={1.5} />
                    </SidebarItemExtended>

                    <SidebarItemExtended
                        link="/activities"
                        textContent="Activities"
                        sidebarStatus={sidebarStatus}
                    >
                        <ActivitySquare size={20} strokeWidth={1.5} />
                    </SidebarItemExtended>

                    <SidebarItemExtended
                        link="/settings"
                        textContent="Settings"
                        sidebarStatus={sidebarStatus}
                    >
                        <Settings size={20} strokeWidth={1.5} />
                    </SidebarItemExtended>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-0">
                <SidebarMenu>
                    <SidebarMenuItem className="mx-auto flex w-[90%] font-medium text-[#848485]">
                        <span className="flex h-10 w-full items-center justify-between px-4 py-2 text-sm">
                            <span className="flex w-full items-center gap-2">
                                {currentTheme === 'light' ? (
                                    <Moon size={20} strokeWidth={1.5} />
                                ) : (
                                    <Sun size={20} strokeWidth={1.5} />
                                )}
                                <span>
                                    {currentTheme === 'light'
                                        ? 'Dark mode'
                                        : 'Light mode'}
                                </span>
                            </span>
                            <ToggleColorModeSwitch />
                        </span>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mx-auto flex w-[90%] font-medium text-[#848485]">
                        <span className="flex h-10 w-full items-center justify-between px-4 py-2 text-sm">
                            <span className="flex w-full items-center gap-2">
                                <MessageCircleQuestion
                                    size={20}
                                    strokeWidth={1.5}
                                />
                                <span>Help</span>
                            </span>
                        </span>
                    </SidebarMenuItem>
                </SidebarMenu>
                <CurrentUserBlock />
            </SidebarFooter>
        </ShadcnSidebar>
    );
};

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
            className={cn('mx-auto flex w-[90%] font-medium text-[#848485]', {
                'w-full justify-center': sidebarStatus,
            })}
        >
            <SidebarMenuButton
                isActive={pathname.endsWith(link)}
                className={cn(
                    'flex h-10 items-center px-4 duration-300 hover:bg-[#F0F0EF] hover:text-[#101010] dark:hover:bg-[#27272a] dark:hover:text-white',
                    {
                        'justify-center': sidebarStatus,
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
