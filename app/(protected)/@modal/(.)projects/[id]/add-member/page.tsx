import dynamic from "next/dynamic";

const Modal = dynamic(() =>
	import("@/src/presentation/components/shared/modal").then(
		(mod) => mod.Modal
	)
);

const AddMembersForm = dynamic(() =>
	import("@/src/presentation/components/shared/add-members-form").then(
		(component) => component.AddMembersForm
	)
);

export default async function AddProjectMemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const PROJECT_ID = (await params).id;

	return (
		<Modal title="Add members">
			<AddMembersForm entity="project" entityId={PROJECT_ID} />
		</Modal>
	);
}
