import { AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";
import { memo } from "react";

interface InputErrorMessageProps {
	withIcon?: boolean;
	message: string | undefined;
	containerClassName?: string;
	iconClassName?: string;
	messageClassName?: string;
}

export const InputErrorMessage = memo((props: InputErrorMessageProps) => {
	const {
		withIcon = true,
		message,
		messageClassName,
		iconClassName,
		containerClassName,
	} = props;
	return (
		<>
			{message ? (
				<div
					className={cn(
						"text-sm text-red-600 py-1 animate-in w-full flex-wrap flex items-center gap-1",
						containerClassName
					)}
				>
					{withIcon ? (
						<AlertTriangle
							size={18}
							color="rgb(220, 38, 38)"
							className={cn(iconClassName)}
						/>
					) : null}
					<span
						className={(cn("w-fullbreak-words"), messageClassName)}
					>
						{message}
					</span>
				</div>
			) : null}
		</>
	);
});

InputErrorMessage.displayName = "InputErrorMessage";
