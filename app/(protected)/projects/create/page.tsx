import { CreateProjectForm } from './_components/CreateProjectForm';

export default function CreateProjectPage() {
    return (
        <div className="mx-auto mt-8 flex flex-col">
            <h2 className="text-center text-2xl font-semibold">
                Create new project
            </h2>
            <CreateProjectForm />
        </div>
    );
}
