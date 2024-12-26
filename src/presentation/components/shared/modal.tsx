"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ReactNode } from "react";

interface RouteModalProps {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
	redirectPath?: string;
}

export const Modal = ({
	children,
	title,
	className,
	redirectPath,
}: RouteModalProps) => {
	const router = useRouter();

	const onModalClose = () => {
		if (redirectPath) {
			router.push(redirectPath);
		} else {
			router.back();
		}
	};

	return (
		<Dialog open onOpenChange={() => onModalClose()}>
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
