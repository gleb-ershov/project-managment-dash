"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ReactNode } from "react";

interface RouteModalProps {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
}

export const Modal = ({ children, title, className }: RouteModalProps) => {
	const router = useRouter();

	return (
		<Dialog
			open
			onOpenChange={() => {
				router.back();
			}}
		>
			<DialogContent className={className}>
				<DialogHeader className="flex items-center justify-between">
					{title && (
						<DialogTitle className="text-lg font-semibold">
							{title}
						</DialogTitle>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
