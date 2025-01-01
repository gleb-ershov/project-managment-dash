import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const CreateTeamForm = dynamic(
	() =>
		import(
			"@/src/presentation/components/team/forms/create-team-form"
		).then((component) => component.CreateTeamForm),
	{
		, // Отключаем серверный рендеринг для модального окна
	}
);

export default function CreateTeamPage() {
	return (
		<Modal title="Create New Team">
			<CreateTeamForm />
		</Modal>
	);
}
