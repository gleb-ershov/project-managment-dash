import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { ProjectsListContainer } from './ProjectsListContainer';

export const ProjectsListSkeleton = () => {
    return (
        <ProjectsListContainer>
            <ProjectCardSkeleton />
        </ProjectsListContainer>
    );
};
