import { getProjectsByUser } from '@/utils/data-access/getProjectsByUser';
import { ProjectsListContainer } from './ProjectsListContainer';
import { ProjectCard } from './ProjectCard';

export const ProjectsList = async () => {
    const projectsData = await getProjectsByUser();
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
