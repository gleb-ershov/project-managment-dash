import { OngoingTaskCardSkeleton } from './OngoingTaskCardSkeleton';

export const OngoingTasksListSkeleton = () => {
    return (
        <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
            <OngoingTaskCardSkeleton />
            <OngoingTaskCardSkeleton />
            <OngoingTaskCardSkeleton />
            <OngoingTaskCardSkeleton />
        </div>
    );
};
