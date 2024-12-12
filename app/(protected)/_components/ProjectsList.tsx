import { getProjectsByUser } from '@/utils/data-access/getProjectsByUser';
import { ProjectsListContainer } from './ProjectsListContainer';
import { ProjectCard } from './ProjectCard';

interface IProjectListProps {
    searchQuery: string;
    filterBy: string;
    sortBy: string;
}

export const ProjectsList = async (props: IProjectListProps) => {
    const { searchQuery, filterBy, sortBy } = props;
    const projectsData = await getProjectsByUser({
        searchQuery,
        filterBy,
        sortBy,
    });
    
    if ('data' in projectsData) {
        return (
            <>
                {projectsData.data.length > 0 ? (
                    <ProjectsListContainer>
                        {projectsData.data.map((item) => (
                            <ProjectCard {...item} key={item.id} />
                        ))}
                    </ProjectsListContainer>
                ) : (
                    <ProjectsListContainer>
                        <span className="flex h-full w-full items-center justify-center text-[#BBBBBC]">
                            There is no projects
                        </span>
                    </ProjectsListContainer>
                )}
            </>
        );
    }
    return (
        <ProjectsListContainer>
            <span>Error</span>
        </ProjectsListContainer>
    );
};
