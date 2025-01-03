export const createInputErrorStyles = (
	isInvalid: boolean,
	inputValue: string | string[],
	errorStyles: string = "border-red-500"
) => {
	return isInvalid && inputValue.length === 0 ? errorStyles : "";
};
