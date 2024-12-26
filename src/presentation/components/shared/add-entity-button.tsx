import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { cn } from "../../utils/shared/cn";

interface AddEntityButtonProps {
	path: string;
	label: string;
	iconSize?: number;
	className?: string;
}

const DEFAULT_ICON_SIZE = 20;

const baseStyles = [
	"flex items-center justify-center gap-4",
	"px-3 py-3",
	"rounded-lg",
	"border-2 border-dotted",
	"border-gray-200/50",
	"bg-[#F9F8FE]",
	"text-[#806AE3]",
	"dark:border-gray-700/50",
	"dark:bg-gray-800/50",
	"dark:text-purple-400",
	"hover:bg-[#F0EDF9]",
	"dark:hover:bg-gray-800",
	"active:scale-x-95",
	"transition-all duration-300",
	"text-sm font-medium",
] as const;

export const AddEntityButton = memo(
	({
		path,
		iconSize = DEFAULT_ICON_SIZE,
		className,
		label,
	}: AddEntityButtonProps) => {
		return (
			<Link
				href={path}
				className={cn(baseStyles.join(" "), className)}
				role="button"
				aria-label="Create new project"
				prefetch={true}
			>
				<span className="select-none">{label}</span>
				<PlusSquare
					strokeWidth={1}
					size={iconSize}
					aria-hidden="true"
					className="transition-transform group-hover:scale-105"
				/>
			</Link>
		);
	}
);

AddEntityButton.displayName = "AddEntityButton";
