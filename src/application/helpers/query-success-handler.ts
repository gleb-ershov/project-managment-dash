export const querySuccessHandler = (data: any) => {
	return {
		data,
		success: true,
		error: null,
	};
};
