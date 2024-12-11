import { Suspense } from 'react';
import { StatsBlockSkeleton } from './StatsBlockSkeleton';
import { StatsFinishedProjectsBlock } from './StatsFinishedProjectsBlock';
import { StatsTotalTeamsBlock } from './StatsTotalTeamsBlock';
import { Clock, DollarSign, Ellipsis } from 'lucide-react';

export const StatsWrapper = () => {
    return (
        <section className="mx-auto mt-8 flex w-[95%] items-center justify-center gap-16">
            <Suspense
                fallback={<StatsBlockSkeleton />}
                key="finished_projects_stat"
            >
                <StatsFinishedProjectsBlock />
            </Suspense>
            <Suspense fallback={<StatsBlockSkeleton />} key="total_teams_stat">
                <StatsTotalTeamsBlock />
            </Suspense>
            <div className="flex h-36 w-[200px] flex-col gap-2 rounded-lg border-[1px] border-[#f3f3f3] p-4 shadow-sm duration-300 hover:border-transparent">
                <div className="flex w-full justify-between">
                    <span className="w-fit rounded-lg bg-[#FAFAFA] p-2">
                        <Clock fill="#F3B947" color="white" size={28} />
                    </span>
                    <Ellipsis size={22} color="#8A8A8E" />
                </div>
                <span className="text-xl font-semibold text-[#050402]">
                    20h 30m
                </span>
                <span className="text-sm text-[#8A8A8E]">
                    Time Tracked (Week)
                </span>
            </div>
            <div className="flex h-36 w-[200px] flex-col gap-2 rounded-lg border-[1px] border-[#f3f3f3] p-4 shadow-sm duration-300 hover:border-transparent">
                <div className="flex w-full justify-between">
                    <span className="w-fit rounded-lg bg-[#FAFAFA] p-2">
                        <DollarSign color="#DC49F3" size={28} />
                    </span>
                    <Ellipsis size={22} color="#8A8A8E" />
                </div>
                <span className="text-xl font-semibold text-[#050402]">
                    2130$
                </span>
                <span className="text-[#8A8A8E]">Total Revenue</span>
            </div>
        </section>
    );
};
