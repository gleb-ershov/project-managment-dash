import { cn } from '@/utils/helpers/cn';
import { PlusSquare } from 'lucide-react';
import Link from 'next/link';

interface IAddProjectButton {
    iconSize?: number;
    className?: string;
}

export const AddProjectButton = (props: IAddProjectButton) => {
    return (
        <Link
            href={`/projects/create`}
            className={cn(
                'flex items-center justify-center gap-4 rounded-lg border-2 border-dotted border-gray-200 border-opacity-50 bg-[#F9F8FE] px-3 py-3 text-center text-sm text-[#806AE3] duration-300 active:scale-x-95',
                props.className
            )}
        >
            Create new project
            <PlusSquare strokeWidth={1} size={props.iconSize || 20} />
        </Link>
    );
};
