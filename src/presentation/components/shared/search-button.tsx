"use client";

import { Search } from "lucide-react";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { cn } from "@/src/presentation/utils/shared/cn";

interface SearchButtonProps {
	className?: string;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "outline" | "ghost";
	disabled?: boolean;
	onClick?: () => void;
	tooltipText?: string;
}

export const SearchButton = memo(
	({
		className,
		size = "md",
		variant = "outline",
		disabled = false,
		onClick,
		tooltipText = "Search",
	}: SearchButtonProps) => {
		const router = useRouter();

		const sizeConfig = {
			sm: {
				button: "h-[36px] w-[36px]",
				icon: 20,
			},
			md: {
				button: "h-[48px] w-[48px]",
				icon: 26,
			},
			lg: {
				button: "h-[60px] w-[60px]",
				icon: 32,
			},
		};

		const variantConfig = {
			default:
				"bg-[#664BDD] text-white hover:bg-[#5538c8] border-transparent",
			outline:
				"border-[#EAEAEA] text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800",
			ghost: "border-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
		};

		const handleClick = () => {
			if (disabled) return;

			if (onClick) {
				onClick();
			} else {
				router.push("/search");
			}
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleClick();
			}
		};

		const buttonContent = (
			<button
				className={cn(
					"rounded-xl border-2 flex items-center justify-center",
					"transition-colors duration-300",
					"focus-visible:outline-none focus-visible:ring-2",
					"focus-visible:ring-[#664BDD] focus-visible:ring-offset-2",
					disabled && "opacity-50 cursor-not-allowed",
					sizeConfig[size].button,
					variantConfig[variant],
					className
				)}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				aria-label="Search"
				tabIndex={0}
			>
				<Search
					size={sizeConfig[size].icon}
					strokeWidth={1.5}
					className={cn(
						"transition-transform duration-300",
						"group-hover:scale-110"
					)}
				/>
			</button>
		);

		return tooltipText ? (
			<Tooltip>
				<TooltipContent>{tooltipText}</TooltipContent>
				<TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
			</Tooltip>
		) : (
			buttonContent
		);
	}
);

SearchButton.displayName = "SearchButton";

if (typeof window !== "undefined") {
	window.addEventListener("keydown", (e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			document
				.querySelector<HTMLButtonElement>('[aria-label="Search"]')
				?.click();
		}
	});
}
