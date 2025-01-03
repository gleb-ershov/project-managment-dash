import { Mail } from 'lucide-react';

export const UserTeamsMembersListCardSkeleton = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2">
                <div className="h-[40px] w-[40px] rounded-lg bg-[#FAFAFA]" />
                <div className="flex w-[calc(100%-50px)] flex-col gap-2">
                    <span className="h-[16px] w-1/3 rounded-lg bg-[#FAFAFA]" />
                    <span className="h-[14px] w-1/2 rounded-lg bg-[#FAFAFA]" />
                </div>
            </div>
            <Mail />
        </div>
    );
};
