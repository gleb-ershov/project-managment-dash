"use client";

import { cn } from "@/src/presentation/utils/cn";
import { Share2 } from "lucide-react";
import { memo } from "react";

interface ShareButtonProps {
	className?: string;
	url?: string;
	title?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "outline" | "ghost";
}

export const ShareButton = memo(
	({
		className,
		url = window.location.href || "",
		title = "Check this out!",
		disabled = false,
		size = "md",
		variant = "outline",
	}: ShareButtonProps) => {
		const handleShare = async () => {
			try {
				if (navigator.share) {
					await navigator.share({
						title,
						url,
					});
				} else {
					await navigator.clipboard.writeText(url);
				}
			} catch (error) {
				console.error("Error sharing:", error);
			}
		};

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

		return (
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
				disabled={disabled}
				aria-label="Share"
				title="Share"
			>
				<Share2
					onClick={handleShare}
					size={sizeConfig[size].icon}
					strokeWidth={1.5}
					className="transition-transform duration-300 group-hover:rotate-12"
				/>
			</button>
		);
	}
);

ShareButton.displayName = "ShareButton";
