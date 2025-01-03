import { ModalLoadingFallback } from "@/src/presentation/components/shared/modal-loading-fallback";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const CreateTeamForm = dynamic(() =>
	import("@/src/presentation/components/team/forms/create-team-form").then(
		(component) => component.CreateTeamForm
	)
);

export default function CreateTeamPage() {
	return (
		<Suspense fallback={<ModalLoadingFallback />}>
		<Modal title="Create New Team">
			<CreateTeamForm />
		</Modal>
		</Suspense>
	);
}
