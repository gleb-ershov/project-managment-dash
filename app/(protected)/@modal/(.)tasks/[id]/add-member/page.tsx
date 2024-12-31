import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const AddMembersForm = dynamic(
	() =>
		import("@/src/presentation/components/shared/add-members-form").then(
			(component) => component.AddMembersForm
		),
	{
		ssr: false, // Отключаем серверный рендеринг для модального окна
	}
);

export default async function AddTaskMemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const TASK_ID = (await params).id;

	return (
		<Modal>
			<AddMembersForm entity="task" entityId={TASK_ID} />
		</Modal>
	);
}
