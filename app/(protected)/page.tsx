import { WelcomeMessageBlock } from './_components/WelcomeMessage';
import { StatsWrapper } from './_components/StatsWrapper';
import { OngoingTasksBlock } from './_components/OngoingTasksBlock';
import { AddTaskButton } from './_components/AddTaskButton';
import { ShareButton } from './_components/ShareButton';
import { SearchButton } from './_components/SearchButton';
import { ProjectsSection } from './_components/ProjectsSection';
import { Calendar } from './_components/Calendar';
import { Separator } from '@/components/ui/separator';
import { InternalTeamsBlock } from './_components/InternalTeamsBlock';
import { TasksByDayBlock } from './_components/TasksByDayBlock';
import { UserTeamsBlock } from './_components/UserTeamsBlock';
import { UserTeamsMembersList } from './_components/UserTeamsMembersList';
import { Suspense } from 'react';
import { TaskByDayCardSkeleton } from './_components/TaskByDayCardSkeleton';
import { UserTeamsMembersListCardSkeleton } from './_components/UserTeamsMembersListCardSkeleton';

export default async function OverviewPage(props: {
    searchParams?: Promise<{
        date?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const day = searchParams?.date || new Date(Date.now()).getDate();

    return (
        <div className="flex w-full justify-between">
            <div className="flex flex-1 flex-col">
                <header className="mx-auto mt-6 flex w-[90%] items-center justify-between">
                    <WelcomeMessageBlock />
                    <div className="flex items-center gap-4">
                        <SearchButton />
                        <ShareButton />
                        <AddTaskButton />
                    </div>
                </header>
                <main className="flex h-full w-full flex-col">
                    <StatsWrapper />
                    <OngoingTasksBlock />
                    <ProjectsSection />
                </main>
            </div>
            <div className="ml-auto w-[22%] border-l-[1px] border-gray-200">
                <InternalTeamsBlock />
                <Separator className="mx-auto my-4 w-[90%]" />
                <Calendar />
                <section className="mx-auto mt-6 flex w-[90%] flex-col gap-4">
                    <h5 className="text-gray-700">Tasks</h5>
                    <Suspense
                        fallback={
                            <div className="flex flex-col gap-8">
                                <TaskByDayCardSkeleton />
                                <TaskByDayCardSkeleton />
                                <TaskByDayCardSkeleton />
                            </div>
                        }
                    >
                        <TasksByDayBlock day={Number(day)} />
                    </Suspense>
                </section>
                <Separator className="mx-auto my-4 w-[90%]" />
                <UserTeamsBlock>
                    <Suspense
                        fallback={
                            <>
                                <UserTeamsMembersListCardSkeleton />
                                <UserTeamsMembersListCardSkeleton />
                                <UserTeamsMembersListCardSkeleton />
                            </>
                        }
                    >
                        <UserTeamsMembersList />
                    </Suspense>
                </UserTeamsBlock>
            </div>
        </div>
    );
}
