import { CreateTaskForm } from './_components/CreateTaskForm';

export default function CreateProjectPage() {
    return (
        <div className="mx-auto mt-8 flex flex-col">
            <h2 className="text-center text-2xl font-semibold">
                Create new tasks
            </h2>
            <CreateTaskForm />
        </div>
    );
}
