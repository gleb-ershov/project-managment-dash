import { getTasksByDay } from '@/utils/data-access/getTasksByDay';
import { TaskByDayCard } from './TaskByDayCard';

interface ITasksByDayBlockProps {
    day: number;
}
export const TasksByDayBlock = async (props: ITasksByDayBlockProps) => {
    const currentDate = new Date(Date.now());
    const { day } = props;

    const requestPayload = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
    );

    const tasks = await getTasksByDay(requestPayload);

    if ('data' in tasks) {
        return (
            <>
                {tasks.data.length > 0 ? (
                    tasks.data.map((task) => (
                        <TaskByDayCard {...task} key={task.id} />
                    ))
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-[#BBBBBC]">
                        There is no deadlines for this day
                    </span>
                )}
            </>
        );
    }
    return (
        <>
            <span>error</span>
        </>
    );
};
