import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { TaskViewModel } from "@/src/application/view-models/task.view-model";
import { TeamViewModel } from "@/src/application/view-models/team.view-model";
import Link from "next/link";

interface SharedEntityListCardProps {
	entity: ProjectViewModel | TaskViewModel | TeamViewModel;
	type: "project" | "task" | "team";
}

export const SharedEntityListCardSkeleton = () => {
	return (
		<span
			className="hover:text-white duration-300 text-sm
					py-2 px-4 text-center text-gray-200 rounded-lg dark:bg-[#2b2b31] w-[90%] mx-auto"
		>
			<span className="animate-pulse">Loading...</span>
		</span>
	);
};

export const SharedEntityListCard = (props: SharedEntityListCardProps) => {
	const { entity, type } = props;
	const CARD_TITLE = "name" in entity ? entity.name : entity.title;
	return (
		<Link
			key={entity.id}
			href={`/${type}s/${entity.id}`}
			className="hover:text-white duration-300 text-sm
					py-2 px-4 text-center text-gray-200 rounded-lg dark:bg-[#2b2b31] w-[90%] mx-auto"
		>
			{CARD_TITLE}
		</Link>
	);
};
