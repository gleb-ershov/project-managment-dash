import { memo } from "react";
import { ProjectStatus } from "@/src/domain/value-objects/project-status.value-object";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { capitalize } from "@/src/presentation/utils/capitalize";

interface ProjectStatusSelectProps {
	id?: string;
	name?: string;
	label?: string;
	defaultValue?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
}

const statusOptions = Object.values(ProjectStatus).map((status) => ({
	value: status,
	label: status.toLowerCase().replace("_", " "),
}));

export const ProjectStatusSelect = memo(
	({
		id = "project_status",
		name = "status",
		label = "Status",
		defaultValue = statusOptions[0].value,
		required = true,
		disabled = false,
		className = "",
		onChange,
	}: ProjectStatusSelectProps) => {
		return (
			<div className={`space-y-2 ${className}`}>
				<Label htmlFor={id}>{label}</Label>
				<Select
					required={required}
					name={name}
					defaultValue={defaultValue}
					onValueChange={onChange}
					disabled={disabled}
				>
					<SelectTrigger id={id}>
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						{statusOptions.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{capitalize(label)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	}
);

ProjectStatusSelect.displayName = "ProjectStatusSelect";
