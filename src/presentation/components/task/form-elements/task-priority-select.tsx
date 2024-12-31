import { memo } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { TaskPriority } from "@prisma/client";

interface TaskPrioritySelectProps {
	id?: string;
	name?: string;
	label?: string;
	defaultValue?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	noValueAllowed?: boolean;
	onChange?: (value: string) => void;
	onBlur?: () => void;
}

const priorityOptions = Object.values(TaskPriority).map((status) => ({
	value: status,
	label: status.toLowerCase().replace("_", " "),
}));

export const TaskPrioritySelect = memo(
	({
		id = "task_priority",
		name = "priority",
		label = "Priority",
		defaultValue = priorityOptions[0].value,
		required = true,
		disabled = false,
		noValueAllowed = false,
		className = "",
		onChange,
	}: TaskPrioritySelectProps) => {
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
					{noValueAllowed ? (
							<SelectItem value="all">All</SelectItem>
						) : null}
						{priorityOptions.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	}
);

TaskPrioritySelect.displayName = "TaskStatusSelect";
