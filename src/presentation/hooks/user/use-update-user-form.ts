import { updateUserAction } from "@/app/actions/user/update-user.action";
import { useActionState, useMemo, useReducer } from "react";

interface UserUpdateFormInputsState {
	name: boolean;
	surname: boolean;
	password: boolean;
	description: boolean;
	email: boolean;
}

interface UserUpdateFormInputsAction {
	type: string;
}

function reducer(
	state: UserUpdateFormInputsState,
	action: UserUpdateFormInputsAction
) {
	switch (action.type) {
		case "name": {
			return {
				...state,
				name: !state.name,
			};
		}
		case "surname": {
			return {
				...state,
				surname: !state.surname,
			};
		}
		case "email": {
			return {
				...state,
				email: !state.email,
			};
		}
		case "password": {
			return {
				...state,
				password: !state.password,
			};
		}
		case "description": {
			return {
				...state,
				description: !state.description,
			};
		}
	}
	throw Error("Unknown action: " + action.type);
}

export const useUpdateUserForm = (userId: string) => {
	const [inputsState, dispatch] = useReducer(reducer, {
		name: true,
		surname: true,
		email: true,
		password: true,
		description: true,
	});

	const boundedAction = useMemo(
		() => updateUserAction.bind(null, userId),
		[userId]
	);

	const [updateFormState, action, isPending] = useActionState(
		boundedAction,
		undefined
	);

	const BUTTON_LABEL = isPending ? "Saving..." : "Save";

	return {
		inputsState,
		dispatch,
		updateFormState,
		action,
		isPending,
		BUTTON_LABEL,
	};
};
