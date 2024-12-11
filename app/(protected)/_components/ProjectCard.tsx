import { Project, User } from '@prisma/client';
import { FolderKanban, FolderOpen } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

interface IProjectCardProps extends Project {
    members: { imageUrl: string; name: string; surname: string; id: string }[];
    createdBy: User;
}

export const ProjectCard = (props: IProjectCardProps) => {
    const { deadline, title, createdBy, status, members, id } = props;
    return (
        <div className="mx-auto flex w-[95%] items-center">
            <div className="flex h-[50px] w-1/2 items-center gap-2">
                <span className="w-fit rounded-xl bg-[#DD4A78] p-2">
                    <FolderKanban color="#DD4A78" fill="white" />
                </span>
                <div className="flex flex-col gap-1">
                    <Link
                        className="text-sm font-medium"
                        href={`/projects/${id}`}
                    >
                        {title}
                    </Link>
                    <span className="flex items-center gap-1 text-[13px] font-normal text-[#777778]">
                        <FolderOpen size={14} />
                        {createdBy.name + ' ' + createdBy.surname}
                    </span>
                </div>
            </div>
            <div className="flex h-[50px] w-1/2 items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-[#777778]">Status</span>
                    <span className="flex items-center gap-2 text-[12px]">
                        <span className="h-[8px] w-[8px] rounded-full bg-green-300" />
                        {`${status[0].toUpperCase()}${status.slice(1)}`}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-[#777778]">Deadline</span>
                    <span className="flex items-center gap-2 text-[12px]">
                        {format(deadline, 'do LLLL')}
                    </span>
                </div>
                <TooltipProvider>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-[#777778]">Members</span>
                        <span className="flex items-center gap-2 text-[12px]">
                            {members.map((user) => (
                                <Tooltip key={user.id}>
                                    <TooltipTrigger>
                                        <Link
                                            href={`/users/${user.id}/profile`}
                                        >
                                            <Image
                                                src={user.imageUrl}
                                                width={24}
                                                height={24}
                                                alt=""
                                                className="max-h-[24px] max-w-[24px] rounded-full object-cover"
                                            />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {user.name + ` ${user.surname}`}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </span>
                    </div>
                </TooltipProvider>
            </div>
        </div>
    );
};
