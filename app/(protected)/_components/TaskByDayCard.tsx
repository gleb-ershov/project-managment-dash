import { Task } from '@prisma/client';
import { ToggleTaskForm } from './ToggleTaskForm';

export const TaskByDayCard = (props: Task) => {
    const { id, title, description } = props;
    return (
        <div className="flex items-center gap-4 rounded-lg py-1 border-[1px] border-gray-100 px-2">
            <ToggleTaskForm id={id} />
            <div className="flex flex-col">
                <span>{title}</span>
                <span className='text-sm text-gray-600'>{description}</span>
            </div>
        </div>
    );
};
