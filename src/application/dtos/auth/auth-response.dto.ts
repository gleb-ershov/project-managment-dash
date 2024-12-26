export interface AuthResponseDTO {
	user: {
		id: string;
		email: string;
		name: string;
		surname: string;
	};
	accessToken: string;
	refreshToken: string;
}
