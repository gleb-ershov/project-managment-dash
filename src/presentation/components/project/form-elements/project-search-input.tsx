import { Folder } from "lucide-react";
import {
	BaseItem,
	BaseSearchableInput,
} from "../../shared/base-searchable-input";
import { memo, useCallback, useState } from "react";
import { Badge } from "../../ui/badge";
import { useSearchProjects } from "@/src/presentation/hooks/projects/use-search-projects";
import { useAuth } from "@/src/presentation/hooks/auth/use-auth";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { Label } from "../../ui/label";

interface Project {
	id: string;
	title: string;
}

interface ProjectSearchInputProps {
	id?: string;
	name?: string;
	onProjectChange?: (project: Project | null) => void; // Changed to single project
	defaultProject?: ProjectViewModel; // Changed to single project
	fallbackData?: ProjectViewModel[];
	disabled?: boolean;
	className?: string;
}

type SearchableProject = Project & BaseItem;

export const ProjectSearchInput = memo(
	({
		id = "project_search_input",
		name,
		onProjectChange,
		defaultProject,
		fallbackData = [],
		disabled,
		className,
	}: ProjectSearchInputProps) => {
		const [searchQuery, setSearchQuery] = useState("");
		const [selectedProject, setSelectedProject] = useState<Project | null>(
			defaultProject || null
		);
		const { user } = useAuth();

		const { projects, isLoading } = useSearchProjects(
			searchQuery,
			user?.id || "",
			{
				fallbackData,
			}
		);

		const handleProjectSelect = useCallback(
			(project: Project) => {
				setSelectedProject(project);
				onProjectChange?.(project);
				setSearchQuery(""); // Clear search after selection
			},
			[onProjectChange]
		);

		const handleProjectRemove = useCallback(() => {
			setSelectedProject(null);
			onProjectChange?.(null);
		}, [onProjectChange]);

		return (
			<div className="flex flex-col gap-2">
				<Label htmlFor={id}>Add to the project</Label>
				<BaseSearchableInput<SearchableProject>
					id={id}
					onInputChangeHandler={setSearchQuery}
					inputValue={searchQuery}
					name={name}
					items={projects}
					selectedItems={selectedProject ? [selectedProject] : []}
					onItemSelect={handleProjectSelect}
					onItemRemove={() => handleProjectRemove()}
					isLoading={isLoading}
					disabled={disabled}
					className={className}
					placeholder="Search projects..."
					renderItem={(project) => (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Folder
									className="h-4 w-4"
									aria-hidden="true"
								/>
								<span>{project.title}</span>
							</div>
						</div>
					)}
					renderSelectedItem={(project) => (
						<Badge
							key={project.id}
							variant="secondary"
							className="flex items-center gap-1"
						>
							<Folder className="h-3 w-3" aria-hidden="true" />
							<span>{project.title}</span>
							<button
								type="button"
								onClick={() => handleProjectRemove()}
								className="ml-1 hover:text-destructive"
							>
								×
							</button>
						</Badge>
					)}
				/>
			</div>
		);
	}
);

ProjectSearchInput.displayName = "ProjectSearchInput";
