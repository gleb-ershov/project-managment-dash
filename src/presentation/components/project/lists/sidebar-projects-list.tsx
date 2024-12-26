import { getProjectsWithMembers } from "@/src/application/queries/project/get-projects";
import { SidebarMenuSubItem } from "../../ui/sidebar";
import { SidebarProjectsListCard } from "../cards/sidebar-projects-list-card";
import { AddEntityButton } from "../../shared/add-entity-button";
import { memo } from "react";

export const SidebarProjectsList = memo(async () => {
	const projects = await getProjectsWithMembers();

	return (
		<>
			{projects?.length ? (
				projects.map(({ id, title }) => (
					<SidebarProjectsListCard key={id} id={id} title={title} />
				))
			) : (
				<SidebarMenuSubItem className="px-3 py-1 text-center text-sm font-light text-gray-600 dark:text-gray-200">
					No projects yet
				</SidebarMenuSubItem>
			)}

			<SidebarMenuSubItem>
				<AddEntityButton
					path="/projects/create"
					label="Create new project"
					className="px-2 h-[32px]"
				/>
			</SidebarMenuSubItem>
		</>
	);
});

SidebarProjectsList.displayName = "SidebarProjectsList";
