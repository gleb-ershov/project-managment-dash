import { findTeamById } from "@/src/application/queries/team/find-team-by-id";
import { Modal } from "@/src/presentation/components/shared/modal";
import { CreateTeamForm } from "@/src/presentation/components/team/forms/create-team-form";
import { notFound } from "next/navigation";

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
