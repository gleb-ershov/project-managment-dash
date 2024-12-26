"use client";

import { memo } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/presentation/utils/shared/cn";

interface AddTaskButtonProps {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	label?: string;
	iconSize?: number;
}

export const AddTaskButton = memo(
	({
		className,
		disabled = false,
		onClick,
		label = "New Task",
		iconSize = 18,
	}: AddTaskButtonProps) => {
		const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
			if (disabled) {
				return (
					<span
						className={cn(
							"cursor-not-allowed opacity-50",
							className
						)}
					>
						{children}
					</span>
				);
			}

			return (
				<Link
					href="/tasks/create"
					onClick={onClick}
					className={cn(
						"flex items-center gap-2 rounded-xl bg-[#664BDD] px-4 py-3 text-white shadow-sm",
						className
					)}
				>
					{children}
				</Link>
			);
		};

		return (
			<ButtonWrapper>
				<Plus
					size={iconSize}
					className={cn(
						"transition-transform",
						"group-hover:rotate-90"
					)}
					aria-hidden="true"
				/>
				<span className="select-none">{label}</span>
			</ButtonWrapper>
		);
	}
);

AddTaskButton.displayName = "AddTaskButton";
