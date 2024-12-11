import { AddProjectButton } from '@/components/common/AddProjectButton';
import { ReactNode } from 'react';

export const ProjectsListContainer = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <div className="mb-4 flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4 shadow-[0px_0px_20px_2px_#e3e2e4]">
            <AddProjectButton />
            {children}
        </div>
    );
};
