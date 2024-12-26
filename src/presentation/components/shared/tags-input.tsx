"use client";

import { useState, useCallback, useTransition, KeyboardEvent } from "react";
import { X, Tag as TagIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { cn } from "@/src/presentation/utils/shared/cn";

interface TagsInputProps {
	name: string;
	value?: string[];
	onChange?: (tags: string[]) => void;
	disabled?: boolean;
	className?: string;
	maxTags?: number;
	maxLength?: number;
	placeholder?: string;
	allowDuplicates?: boolean;
	validateTag?: (tag: string) => boolean | string;
}

export const TagsInput = ({
	name,
	value = [],
	onChange,
	disabled = false,
	className,
	maxTags = 10,
	maxLength = 20,
	placeholder = "Add a tag...",
	allowDuplicates = false,
	validateTag,
}: TagsInputProps) => {
	const [isPending, startTransition] = useTransition();
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleAddTag = useCallback(() => {
		const tag = inputValue.trim();

		if (!tag) {
			return;
		}

		// Custom validation
		if (validateTag) {
			const validationResult = validateTag(tag);
			if (typeof validationResult === "string") {
				setError(validationResult);
				return;
			}
			if (!validationResult) {
				setError("Invalid tag");
				return;
			}
		}

		// Length validation
		if (tag.length > maxLength) {
			setError(`Tag must be ${maxLength} characters or less`);
			return;
		}

		// Duplicate validation
		if (!allowDuplicates && value.includes(tag)) {
			setError("This tag already exists");
			return;
		}

		// Max tags validation
		if (value.length >= maxTags) {
			setError(`Maximum ${maxTags} tags allowed`);
			return;
		}

		startTransition(() => {
			onChange?.([...value, tag]);
		});

		setInputValue("");
		setError(null);
	}, [
		inputValue,
		value,
		onChange,
		maxTags,
		maxLength,
		allowDuplicates,
		validateTag,
	]);

	const handleRemoveTag = useCallback(
		(tagToRemove: string) => {
			startTransition(() => {
				onChange?.(value.filter((tag) => tag !== tagToRemove));
			});
		},
		[value, onChange]
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				handleAddTag();
			} else if (
				e.key === "Backspace" &&
				!inputValue &&
				value.length > 0
			) {
				// Remove last tag when backspace is pressed on empty input
				handleRemoveTag(value[value.length - 1]);
			} else if (e.key === "," || e.key === " ") {
				// Add tag on comma or space
				e.preventDefault();
				handleAddTag();
			}
		},
		[handleAddTag, handleRemoveTag, inputValue, value]
	);

	const handlePaste = useCallback(
		(e: React.ClipboardEvent) => {
			e.preventDefault();
			const pastedText = e.clipboardData.getData("text");
			const tags = pastedText
				.split(/[,\s]+/)
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);

			const newTags = tags.slice(0, maxTags - value.length);

			if (newTags.length > 0) {
				startTransition(() => {
					const validTags = allowDuplicates
						? newTags
						: newTags.filter((tag) => !value.includes(tag));
					onChange?.([...value, ...validTags]);
				});
			}
		},
		[value, onChange, maxTags, allowDuplicates]
	);

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex flex-wrap gap-2">
				{value.map((tag, index) => (
					<Badge
						key={`${tag}-${index}`}
						variant="secondary"
						className="flex items-center gap-1 px-3 py-1"
					>
						<TagIcon className="h-3 w-3" />
						<span>{tag}</span>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => handleRemoveTag(tag)}
							disabled={disabled || isPending}
							className="h-auto p-0 hover:bg-transparent"
						>
							<X className="h-3 w-3" />
							<span className="sr-only">Remove {tag} tag</span>
						</Button>
					</Badge>
				))}
			</div>

			<div className="flex gap-2">
				<Input
					name={name}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						setError(null);
					}}
					onKeyDown={handleKeyDown}
					onPaste={handlePaste}
					placeholder={
						value.length >= maxTags
							? `Maximum ${maxTags} tags reached`
							: placeholder
					}
					disabled={disabled || isPending || value.length >= maxTags}
					className="flex-1"
				/>
				<Button
					type="button"
					onClick={handleAddTag}
					disabled={
						disabled ||
						isPending ||
						!inputValue ||
						value.length >= maxTags
					}
					variant="secondary"
					size="icon"
				>
					<Plus className="h-4 w-4" />
					<span className="sr-only">Add tag</span>
				</Button>
			</div>

			{error && <p className="text-sm text-destructive">{error}</p>}

			{value.length > 0 && (
				<p className="text-sm text-muted-foreground">
					{value.length} of {maxTags} tags added
				</p>
			)}
		</div>
	);
};
