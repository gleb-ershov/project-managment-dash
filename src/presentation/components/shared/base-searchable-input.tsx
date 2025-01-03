"use client";
import {
	memo,
	useCallback,
	useState,
	useRef,
	useEffect,
	ReactNode,
} from "react";
import { Loader2 } from "lucide-react";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandEmpty,
	CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { cn } from "@/src/presentation/utils/cn";

export interface BaseItem {
	id: string;
	isSelected?: boolean;
}

interface BaseSearchableInputProps<T extends BaseItem> {
	id: string;
	name?: string;
	inputValue: string;
	onInputChangeHandler: (value: string) => void;
	onItemSelect: (item: T) => void;
	onItemRemove?: (itemId: string) => void;
	items: T[];
	selectedItems?: T[];
	isLoading?: boolean;
	error?: Error;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
	renderItem: (item: T) => ReactNode;
	renderSelectedItem?: (item: T) => ReactNode;
	searchFunction?: (items: T[], query: string) => T[];
	shouldShowAllItemsOnFocus?: boolean;
}

export const BaseSearchableInput = memo(function BaseSearchableInput<
	T extends BaseItem
>({
	id,
	name,
	inputValue,
	onInputChangeHandler,
	onItemSelect,
	items,
	selectedItems = [],
	isLoading,
	error,
	disabled,
	className,
	placeholder = "Search...",
	renderItem,
	renderSelectedItem,
	searchFunction,
	shouldShowAllItemsOnFocus = false,
}: BaseSearchableInputProps<T>) {
	const [open, setOpen] = useState(false);
	const commandRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredItems = searchFunction
		? searchFunction(items, inputValue)
		: items.filter(
				(item) =>
					!selectedItems.some((selected) => selected.id === item.id)
		  );

	const handleInputChange = useCallback((value: string) => {
		setOpen(true);
		onInputChangeHandler(value);
		if (value === "") {
			setOpen(false);
		}
	}, []);

	// Click outside handler
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				commandRef.current &&
				!commandRef.current.contains(event.target as Node) &&
				!inputRef.current?.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Escape key handler
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	const handleSelect = useCallback(
		(item: T) => {
			onItemSelect(item);
			setOpen(false);
		},
		[onItemSelect]
	);

	return (
		<div className={cn("flex flex-col gap-2 relative", className)}>
			<div className="relative">
				<Input
					id={id}
					ref={inputRef}
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => handleInputChange(e.target.value)}
					onFocus={() => shouldShowAllItemsOnFocus && setOpen(true)}
					disabled={disabled}
					className="w-full"
				/>
				{isLoading && (
					<Loader2
						className="absolute right-2 top-2.5 h-4 w-4 animate-spin"
						aria-hidden="true"
					/>
				)}
			</div>

			{/* Selected items */}
			{selectedItems.length > 0 && renderSelectedItem && (
				<div className="flex flex-wrap gap-2">
					{selectedItems.map((item) => renderSelectedItem(item))}
				</div>
			)}

			{/* Search results */}
			{(open || shouldShowAllItemsOnFocus) && (
				<div
					ref={commandRef}
					className="absolute top-[100%] w-full z-50 mt-1"
				>
					<Command className="rounded-lg border shadow-md bg-white">
						<CommandList>
							<CommandEmpty>
								{error ? (
									<p className="p-2 text-sm text-destructive">
										{error.message}
									</p>
								) : (
									<p className="p-2 text-sm text-muted-foreground">
										{isLoading
											? "Loading..."
											: "No items found"}
									</p>
								)}
							</CommandEmpty>
							<CommandGroup>
								{filteredItems.map((item) => (
									<CommandItem
										key={item.id}
										onSelect={() => handleSelect(item)}
									>
										{renderItem(item)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			)}
			<input
				type="hidden"
				name={name}
				value={selectedItems.map((i) => i.id)}
			/>
		</div>
	);
}) as <T extends BaseItem>(
	props: BaseSearchableInputProps<T>
) => React.ReactElement;
