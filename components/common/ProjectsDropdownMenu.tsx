import { getCurrentUserRelatedProjects } from '@/utils/data-access/getCurrentUserRelatedProjects';
import Link from 'next/link';
import { SidebarMenuSubItem } from '../ui/sidebar';
import { AddProjectButton } from './AddProjectButton';
import { FolderKanban } from 'lucide-react';

export const ProjectsDropdownMenu = async () => {
    const currentUserRelatedProjects = await getCurrentUserRelatedProjects();

    if ('data' in currentUserRelatedProjects) {
        return (
            <>
                {currentUserRelatedProjects.data.length > 0 ? (
                    currentUserRelatedProjects.data.map(
                        ({ id, title }: { id: string; title: string }) => (
                            <SidebarMenuSubItem
                                key={id}
                                className="my-2 flex h-[32px] w-full cursor-pointer items-center gap-2 rounded-lg text-center text-[15px] font-normal text-black duration-300 hover:bg-[#F0F0EF]"
                            >
                                <span className="w-fit rounded-md bg-[#DD4A78] p-1">
                                    <FolderKanban
                                        color="#DD4A78"
                                        fill="white"
                                        size={18}
                                    />
                                </span>
                                <Link href={`/projects/${id}`}>{title}</Link>
                            </SidebarMenuSubItem>
                        )
                    )
                ) : (
                    <SidebarMenuSubItem className="px-3 py-1 text-center text-sm font-light text-gray-600 dark:text-gray-200">
                        There is no projects yet
                    </SidebarMenuSubItem>
                )}
                <SidebarMenuSubItem>
                    <AddProjectButton className="px-2 py-1" />
                </SidebarMenuSubItem>
            </>
        );
    } else {
        return <span>error</span>;
    }
};
