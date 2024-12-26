export const parseMultipleValues = (input: string | null): string[] => {
	if (!input) return [];

	// Split by commas and/or whitespace
	return input
		.split(/[\s,]+/)
		.map((item) => item.trim())
		.filter((item) => item.length > 0);
};
