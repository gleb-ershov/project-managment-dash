"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

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
	return (
		<Dialog open>
			<DialogContent
				className={cn(className)}
				onClick={() => router.back()}
			>
				<DialogHeader className="flex justify-between flex-row pt-0">
					{title && (
						<DialogTitle className="text-lg font-semibold">
							{title}
						</DialogTitle>
					)}
					<button
						className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
						onClick={() => router.back()}
					>
						<X size={20} />
					</button>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
};
