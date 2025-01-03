import { findTeamById } from "@/src/application/queries/team/find-team-by-id";
import { notFound } from "next/navigation";
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

export default async function EditTeamPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const CURRENT_TEAM = await findTeamById(id);

	if (!CURRENT_TEAM.data) {
		notFound();
	}
	return (
		<Suspense fallback={<ModalLoadingFallback />}>
			<Modal title="Update team">
				{CURRENT_TEAM.data && !CURRENT_TEAM.error ? (
					<CreateTeamForm
						mode="update"
						teamId={id}
						initialState={CURRENT_TEAM.data}
					/>
				) : (
					<div>
						<span>{CURRENT_TEAM.error?.name}</span>
						<span>{CURRENT_TEAM.error?.message}</span>
					</div>
				)}
			</Modal>
		</Suspense>
	);
}
