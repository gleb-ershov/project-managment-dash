import { memo } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/src/presentation/utils/shared/cn";

interface EntityTitleInputProps {
	id?: string;
	name?: string;
	label?: string;
	defaultValue?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	containerCn?: string;
	labelCn?: string;
	inputCn?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
}

export const EntityTitleInput = memo(
	({
		id = "entity_title",
		name = "title",
		label = "Title",
		defaultValue = "",
		placeholder = "Enter title...",
		required = true,
		disabled = false,
		containerCn = "",
		labelCn = "",
		inputCn = "",
		onChange,
		onBlur,
	}: EntityTitleInputProps) => {
		return (
			<div className={cn("space-y-2", containerCn)}>
				<Label htmlFor={id} className={cn("space-y-2", labelCn)}>
					{label}
				</Label>
				<Input
					id={id}
					name={name}
					type="text"
					defaultValue={defaultValue}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					onChange={(e) => onChange?.(e.target.value)}
					onBlur={onBlur}
					className={cn("w-full", inputCn)}
				/>
			</div>
		);
	}
);

EntityTitleInput.displayName = "EntityTitleInput";