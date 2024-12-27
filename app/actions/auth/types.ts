import {
	LoginDTO,
	AuthResponseDTO,
	RegisterDTO,
} from "@/src/application/dtos/auth.dto";

export type ActionResponse<T> = {
	data: T | null;
	error: string | null;
	success: boolean;
	statusCode: number;
};

export type LoginAction = (
	data: LoginDTO
) => Promise<ActionResponse<AuthResponseDTO>>;

export type RegisterAction = (
	data: RegisterDTO
) => Promise<ActionResponse<AuthResponseDTO>>;
