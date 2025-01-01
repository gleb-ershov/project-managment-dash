"use client";

import Image from "next/image";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Edit } from "lucide-react";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { cn } from "@/src/presentation/utils/shared/cn";
import { useUpdateUserForm } from "@/src/presentation/hooks/user/use-update-user-form";
import { Button } from "../../ui/button";
import { useEffect } from "react";

interface UpdateUserForm {
	user: UserViewModel;
}

export const UpdateUserForm = (props: UpdateUserForm) => {
	const { user } = props;
	const {
		inputsState,
		dispatch,
		action,
		isPending,
		BUTTON_LABEL,
		updateFormState,
	} = useUpdateUserForm(user.id);

	useEffect(() => console.log(updateFormState), [updateFormState]);

	return (
		<form action={action} className="flex flex-col gap-6">
			<Image
				src={user.imageUrl || "/avatar-placeholder.png"}
				alt=""
				width={72}
				height={72}
				className="rounded-full"
			/>

			<div className="flex items-center justify-between gap-8">
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<Label htmlFor="update-user-form__name-input">
							Name
						</Label>
						<span
							onClick={() => dispatch({ type: "name" })}
							className="text-[10px] text-muted-foreground ml-auto hover:text-gray-800 dark:hover:text-gray-100 duration-300 cursor-pointer"
						>
							{inputsState.name ? "Change" : "Cancel"}
						</span>
					</div>
					<Input
						name="name"
						onBlur={() => dispatch({ type: "name" })}
						id="update-user-form__name-input"
						defaultValue={user.name}
						className={cn("shadow-none indent-0 px-0 border-none", {
							"pointer-events-none": inputsState?.name,
							"border-none": inputsState?.name,
						})}
					/>
				</div>

				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<Label htmlFor="update-user-form__surname-input">
							Surname
						</Label>
						<span
							onClick={() => dispatch({ type: "surname" })}
							className="text-[10px] text-muted-foreground ml-auto hover:text-gray-800 dark:hover:text-gray-100 duration-300 cursor-pointer"
						>
							{inputsState.surname ? "Change" : "Cancel"}
						</span>
					</div>
					<Input
						onBlur={() => dispatch({ type: "surname" })}
						name="surname"
						id="update-user-form__surname-input"
						defaultValue={user.surname}
						className={cn("shadow-none indent-0 px-0 border-none", {
							"pointer-events-none": inputsState?.surname,
						})}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Label htmlFor="update-user-form__email-input">Email</Label>
					<span
						onClick={() => dispatch({ type: "email" })}
						className="text-[10px] text-muted-foreground ml-auto hover:text-gray-800 dark:hover:text-gray-100 duration-300 cursor-pointer"
					>
						{inputsState.email ? "Change" : "Cancel"}
					</span>
				</div>
				<Input
					name="email"
					type="email"
					onBlur={() => dispatch({ type: "email" })}
					defaultValue={user.email}
					id="update-user-form__email-input"
					className={cn("shadow-none indent-0 px-0 border-none", {
						"pointer-events-none": inputsState?.email,
					})}
				/>
			</div>

			{/* <div className="flex flex-col">
				<div className="flex items-center">
					<Label htmlFor="update-user-form__password-input">
						Set new password
					</Label>
					<Edit
						onClick={() => dispatch({ type: "password" })}
						size={20}
					/>
				</div>
				<Input
					name="password"
					id="update-user-form__password-input"
					className={cn("border-none", {
						"pointer-events-none": inputsState?.password,
					})}
				/>
			</div> */}

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Label htmlFor="update-user-form__description-input">
						Bio
					</Label>
					<span
						onClick={() => dispatch({ type: "description" })}
						className="text-[10px] text-muted-foreground ml-auto hover:text-gray-800 dark:hover:text-gray-100 duration-300 cursor-pointer"
					>
						{inputsState.description ? "Change" : "Cancel"}
					</span>
				</div>
				<Textarea
					onBlur={() => dispatch({ type: "description" })}
					defaultValue={user.description}
					name="description"
					id="update-user-form__description-input"
					className={cn("shadow-none indent-0 px-0 border-none", {
						"pointer-events-none": inputsState?.description,
					})}
				/>
			</div>
			<Button disabled={isPending}>{BUTTON_LABEL}</Button>
		</form>
	);
};
