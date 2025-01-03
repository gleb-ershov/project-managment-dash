"use client";
import { ZodError } from "zod";

interface FormValidationErrorNotificationProps {
	error: unknown;
}
export const FormValidationErrorNotification = (
	props: FormValidationErrorNotificationProps
) => {
	const { error } = props;
	return (
		<>
			{error ? (
				<div className="bg-[#FCE9E5] dark:bg-[#a0473b]  p-4 flex flex-col gap-4 text-[#E21E00] border-[#F1A495] shadow-none border-[2px]">
					{/* <div className="flex flex-col gap-1">
						<span className="font-semibold">{error?.message}</span>
					</div>
					<div>
						{error?.data?.map((err) => (
							<span>{err}</span>
						))}
					</div> */}
				</div>
			) : null}
		</>
	);
};
