import { Modal } from "@/src/presentation/components/shared/modal";
import { CreateTeamForm } from "@/src/presentation/components/team/forms/create-team-form";

export default function CreateTeamPage() {
	return (
		<Modal title="Create New Team">
			<CreateTeamForm />
		</Modal>
	);
}
