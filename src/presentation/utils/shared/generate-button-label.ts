import { BUTTON_LABELS } from "../../consts/forms-consts";

export const generateButtonLabel = (
	isPending: boolean,
	mode: "update" | "create"
) => {
	const buttonContent =
		mode === "update" ? BUTTON_LABELS.UPDATE : BUTTON_LABELS.CREATE;
	return isPending
		? `${buttonContent.slice(0, buttonContent.length - 1)}ing...`
		: buttonContent;
};
