import { getProjectById } from "@/src/application/queries/project/get-project-by-id";
import { Modal } from "@/src/presentation/components/shared/modal";
import { CreateTeamForm } from "@/src/presentation/components/team/forms/create-team-form";
import { notFound } from "next/navigation";

export default async function EditTeamPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	//TODO
	const currentTeam = await getTeamById(id);

	if (!currentTeam) {
		notFound();
	}
	return (
		<Modal title="Update team">
			<CreateTeamForm
				mode="update"
				teamId={id}
				initialState={currentTeam}
			/>
		</Modal>
	);
}
