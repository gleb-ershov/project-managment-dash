export interface ICreateTaskFormValues {
    title: string;
    description: string;
    deadline: Date;
    members: string[];
    project: string;
    links: string[];
    tags: string[];
}

export interface IProjectListProps {
    searchQuery: string;
    filterBy: string;
    sortBy: string;
}
