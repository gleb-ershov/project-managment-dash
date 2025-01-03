"use client";

import { memo, useCallback, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format, isValid, parse, parseISO } from "date-fns";
import { cn } from "@/src/presentation/utils/cn";
import { createInputErrorStyles } from "../../utils/createInputErrorStyles";

interface EntityDueDateInputProps {
	id?: string;
	name?: string;
	label?: string;
	defaultValue?: string;
	required?: boolean;
	disabled?: boolean;
	error?: string;
	className?: string;
	minDate?: Date | string;
	maxDate?: Date | string;
	dateFormat?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	isInvalid?: boolean;
}

const formatDate = (date: Date | string): string => {
	if (!date) return "";

	try {
		const parsedDate = typeof date === "string" ? parseISO(date) : date;
		return isValid(parsedDate) ? format(parsedDate, "yyyy-MM-dd") : "";
	} catch {
		return "";
	}
};

export const EntityDueDateInput = memo(
	({
		id = "entity_due_date",
		name = "dueDate",
		label = "Due Date",
		defaultValue = "",
		required = false,
		disabled = false,
		error,
		className = "",
		minDate = new Date(),
		maxDate,
		onChange,
		onBlur,
		isInvalid = false,
	}: EntityDueDateInputProps) => {
		const formattedMinDate = formatDate(minDate);
		const formattedMaxDate = maxDate ? formatDate(maxDate) : undefined;
		const [inputValue, setValue] = useState<string>(
			defaultValue
				? format(parse(defaultValue, "PPP", new Date()), "yyyy-MM-dd")
				: new Date().toISOString()
		);

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value;
				setValue(value);
				onChange?.(value);
			},
			[onChange]
		);

		const INPUT_ERROR_STYLES = createInputErrorStyles(
			isInvalid,
			inputValue
		);

		return (
			<div className={cn("space-y-2", className)}>
				<div className="flex items-center justify-between">
					<Label htmlFor={id}>
						{label}
						{required && (
							<span className="text-destructive ml-1">*</span>
						)}
					</Label>
				</div>
				<div className="relative">
					<Input
						type="date"
						id={id}
						name={name}
						value={inputValue}
						required={required}
						disabled={disabled}
						min={formattedMinDate}
						max={formattedMaxDate}
						onChange={handleChange}
						placeholder="Choose a Date"
						onBlur={onBlur}
						className={cn("w-full", INPUT_ERROR_STYLES)}
						aria-describedby={error ? `${id}-error` : undefined}
					/>
				</div>
			</div>
		);
	}
);

EntityDueDateInput.displayName = "EntityDueDateInput";
