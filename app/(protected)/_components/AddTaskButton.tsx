import { Plus } from 'lucide-react';
import Link from 'next/link';

export const AddTaskButton = () => {
    return (
        <Link
            className="flex items-center gap-2 rounded-xl bg-[#664BDD] px-4 py-3 text-white shadow-sm"
            href={`/tasks/create`}
        >
            <Plus size={18} />
            <span>New Task</span>
        </Link>
    );
};
