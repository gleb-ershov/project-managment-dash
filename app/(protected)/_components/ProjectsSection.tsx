import { Suspense } from 'react';
import { ProjectsList } from './ProjectsList';
import { ProjectsListSkeleton } from './ProjectsListSkeleton';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FilterProjectsSelect } from './FilterProjectsSelect';
import { SortProjectsSelect } from './SortProjectsSelect';

export const ProjectsSection = () => {
    return (
        <section className="mx-auto mt-8 flex w-[90%] flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-2xl font-semibold">All projects</h2>
                <Link href="/projects" className="text-sm text-[#A3A2A4]">
                    View all
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <Input placeholder="Search" className="w-1/5" />
                <div className="flex items-center gap-4">
                    <FilterProjectsSelect />
                    <SortProjectsSelect />
                </div>
            </div>
            <Suspense fallback={<ProjectsListSkeleton />}>
                <ProjectsList />
            </Suspense>
        </section>
    );
};
