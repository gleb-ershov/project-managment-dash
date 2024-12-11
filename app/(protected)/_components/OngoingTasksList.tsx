import { getLatestOngoingTasks } from '@/utils/data-access/getLatestOngoingTasks';
import { OngoingTaskCard } from './OngoingTaskCard';

export const OngoingTasksList = async () => {
    const ongoingTasksResponse = await getLatestOngoingTasks();

    if ('data' in ongoingTasksResponse) {
        return (
            <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
                {ongoingTasksResponse.data.length === 0 ? (
                    <span className="col-span-2 flex h-full w-full items-center justify-center text-[#BBBBBC]">
                        There is no ongoing tasks
                    </span>
                ) : (
                    ongoingTasksResponse.data.map((task) => (
                        <OngoingTaskCard {...task} key={task.id} />
                    ))
                )}
            </div>
        );
    }
    return <>error</>;
};
