import { memo } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { TaskStatus } from "@prisma/client";
import { boolean } from "zod";

interface TaskStatusSelectProps {
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

const statusOptions = Object.values(TaskStatus).map((status) => ({
	value: status,
	label: status.toLowerCase().replace("_", " "),
}));

export const TaskStatusSelect = memo(
	({
		id = "task_status",
		name = "status",
		label = "Status",
		defaultValue = statusOptions[0].value,
		required = true,
		disabled = false,
		className = "",
		noValueAllowed = false,
		onChange,
	}: TaskStatusSelectProps) => {
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
						{statusOptions.map(({ value, label }) => (
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

TaskStatusSelect.displayName = "TaskStatusSelect";
