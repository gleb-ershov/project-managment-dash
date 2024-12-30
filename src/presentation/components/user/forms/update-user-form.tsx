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

interface UpdateUserForm {
	user: UserViewModel;
}

export const UpdateUserForm = (props: UpdateUserForm) => {
	const { user } = props;
	const { inputsState, dispatch, action, isPending, BUTTON_LABEL } =
		useUpdateUserForm(user.id);

	return (
		<form action={action} className="flex flex-col gap-6">
			<Image
				src={user.imageUrl || "/avatar-placeholder.png"}
				alt=""
				width={72}
				height={72}
			/>

			<div className="flex items-center">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Label htmlFor="update-user-form__name-input">
							Name
						</Label>
						<Edit
							onClick={() => dispatch({ type: "name" })}
							size={18}
							strokeWidth={1}
							className="hover:cursor-pointer"
						/>
					</div>
					<Input
						name="name"
						id="update-user-form__name-input"
						defaultValue={user.name}
						className={cn(
							"shadow-none indent-0 px-0 border-transparent",
							{
								"pointer-events-none": inputsState?.name,
								"border-transparent": inputsState?.name,
							}
						)}
					/>
				</div>

				<div className="flex flex-col">
					<div className="flex items-center">
						<Label htmlFor="update-user-form__surname-input">
							Surname
						</Label>
						<Edit
							onClick={() => dispatch({ type: "surname" })}
							size={20}
						/>
					</div>
					<Input
						name="surname"
						id="update-user-form__surname-input"
						defaultValue={user.surname}
						className={cn("", {
							"pointer-events-none": inputsState?.surname,
						})}
					/>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center">
					<Label htmlFor="update-user-form__email-input">
						Set new email
					</Label>
					<Edit
						onClick={() => dispatch({ type: "email" })}
						size={20}
					/>
				</div>
				<Input
					name="email"
					type="email"
					defaultValue={user.email}
					id="update-user-form__email-input"
					className={cn("border-none", {
						"pointer-events-none": inputsState?.email,
					})}
				/>
			</div>

			<div className="flex flex-col">
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
			</div>

			<div className="flex flex-col">
				<div className="flex items-center">
					<Label htmlFor="update-user-form__description-input">
						Bio
					</Label>
					<Edit
						onClick={() => dispatch({ type: "description" })}
						size={20}
					/>
				</div>
				<Textarea
					defaultValue={user.description}
					name="description"
					id="update-user-form__description-input"
					className={cn("border-none", {
						"pointer-events-none": inputsState?.description,
					})}
				/>
			</div>
			<Button disabled={isPending}>{BUTTON_LABEL}</Button>
		</form>
	);
};
