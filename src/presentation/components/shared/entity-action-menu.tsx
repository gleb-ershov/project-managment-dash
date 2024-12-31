import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

interface EntityActionsMenuProps {
	entity: "project" | "task";
	entityId: string;
}

const MENU_LABELS = {
	project: "Project",
	task: "Task",
};

export const EntityActionsMenu = (props: EntityActionsMenuProps) => {
	const { entity, entityId } = props;
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link href={`/${entity}/${entityId}/edit`}>
						<PencilIcon className="h-4 w-4 mr-2" />
						{`Edit ${MENU_LABELS[entity]}`}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild className="text-red-600">
					<Link href={`/${entity}/${entityId}/delete`}>
						<TrashIcon className="h-4 w-4 mr-2" />
						{`Delete ${MENU_LABELS[entity]}`}
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
