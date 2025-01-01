import { findTeamById } from "@/src/application/queries/team/find-team-by-id";
import { notFound } from "next/navigation";

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
);


export default async function EditTeamPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_TEAM = await findTeamById(id);

	if (!CURRENT_TEAM) {
		notFound();
	}
	return (
		<Modal title="Update team">
			<CreateTeamForm
				mode="update"
				teamId={id}
				initialState={CURRENT_TEAM}
			/>
		</Modal>
	);
}
