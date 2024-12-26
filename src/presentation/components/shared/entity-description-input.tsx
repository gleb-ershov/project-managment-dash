import { memo } from "react";
import { Label } from "../ui/label";
import { cn } from "@/src/presentation/utils/shared/cn";
import { Textarea } from "../ui/textarea";

interface EntityDescriptionProps {
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

export const EntityDescriptionInput = memo(
	({
		id = "entity_description",
		name = "description",
		label = "Description",
		defaultValue = "",
		placeholder = "Enter description...",
		required = true,
		disabled = false,
		containerCn = "",
		labelCn = "",
		inputCn = "",
		onChange,
		onBlur,
	}: EntityDescriptionProps) => {
		return (
			<div className={cn("space-y-2", containerCn)}>
				<Label htmlFor={id} className={cn("space-y-2", labelCn)}>
					{label}
				</Label>
				<Textarea
					id={id}
					name={name}
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

EntityDescriptionInput.displayName = "EntityDescriptionInput";
