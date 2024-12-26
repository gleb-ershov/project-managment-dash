"use client";

import { useState, useCallback, useTransition } from "react";
import { X, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea"; // Changed to Textarea for better multi-line support
import { cn } from "@/src/presentation/utils/shared/cn";

interface UrlInputProps {
	name: string;
	value?: string[];
	onChange?: (links: string[]) => void;
	disabled?: boolean;
	className?: string;
	maxLinks?: number;
}

export const UrlInput = ({
	name,
	value = [],
	onChange,
	disabled = false,
	className,
	maxLinks = 10,
}: UrlInputProps) => {
	const [isPending, startTransition] = useTransition();
	const [newLinks, setNewLinks] = useState("");
	const [error, setError] = useState<string | null>(null);

	const validateUrl = (url: string) => {
		try {
			new URL(url.trim());
			return true;
		} catch {
			return false;
		}
	};

	// Parse multiple URLs from input
	const parseUrls = (input: string): string[] => {
		// Split by common separators (newlines, commas, spaces)
		return input
			.split(/[\n,\s]+/)
			.map((url) => url.trim())
			.filter((url) => url.length > 0);
	};

	const handleAddLinks = useCallback(() => {
		if (!newLinks) {
			setError("Please enter at least one URL");
			return;
		}

		const urls = parseUrls(newLinks);
		const validUrls: string[] = [];
		const invalidUrls: string[] = [];

		// Validate each URL
		urls.forEach((url) => {
			if (validateUrl(url)) {
				if (!value.includes(url)) {
					validUrls.push(url);
				}
			} else {
				invalidUrls.push(url);
			}
		});

		// Check if adding new URLs would exceed the limit
		if (value.length + validUrls.length > maxLinks) {
			setError(`Cannot add more than ${maxLinks} links`);
			return;
		}

		// Show errors if any URLs are invalid
		if (invalidUrls.length > 0) {
			setError(
				`Invalid URLs found: ${invalidUrls.slice(0, 3).join(", ")}${
					invalidUrls.length > 3 ? "..." : ""
				}`
			);
			return;
		}

		if (validUrls.length === 0) {
			setError(
				"No new valid URLs found (URLs might be duplicates or invalid)"
			);
			return;
		}

		startTransition(() => {
			onChange?.([...value, ...validUrls]);
		});

		setNewLinks("");
		setError(null);
	}, [newLinks, value, onChange, maxLinks]);

	const handleRemoveLink = useCallback(
		(linkToRemove: string) => {
			startTransition(() => {
				onChange?.(value.filter((link) => link !== linkToRemove));
			});
		},
		[value, onChange]
	);

	const handlePaste = useCallback((e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData("text");
		setNewLinks((prev) => (prev ? `${prev}\n${pastedText}` : pastedText));
	}, []);

	return (
		<div className={cn("space-y-4", className)}>
			<div className="space-y-2">
				<div className="flex gap-2">
					<Textarea
						name={name}
						value={newLinks}
						onChange={(e) => {
							setNewLinks(e.target.value);
							setError(null);
						}}
						onPaste={handlePaste}
						placeholder={`Enter URLs (one per line or comma-separated)
Example:
https://example1.com
https://example2.com
or: https://example1.com, https://example2.com`}
						disabled={
							disabled || isPending || value.length >= maxLinks
						}
						className="flex-1 min-h-[100px]"
					/>
					<Button
						type="button"
						onClick={handleAddLinks}
						disabled={
							disabled || isPending || value.length >= maxLinks
						}
						variant="secondary"
					>
						Add URLs
					</Button>
				</div>

				{error && <p className="text-sm text-destructive">{error}</p>}

				{value.length > 0 && (
					<p className="text-sm text-muted-foreground">
						{value.length} of {maxLinks} URLs added
					</p>
				)}
			</div>

			{value.length > 0 && (
				<div className="space-y-2">
					{value.map((link, index) => (
						<div
							key={`${link}-${index}`}
							className="flex items-center gap-2 rounded-md border p-2 text-sm"
						>
							<LinkIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 truncate hover:underline"
							>
								{link}
							</a>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => handleRemoveLink(link)}
								disabled={disabled || isPending}
								className="h-auto p-1 hover:bg-destructive/10"
							>
								<X className="h-4 w-4 text-destructive" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
