import { LoginDTO } from "@/src/application/dtos/auth/login.dto";
import { AuthResponseDTO } from "@/src/application/dtos/auth/auth-response.dto";
import { RegisterDTO } from "@/src/application/dtos/auth/register.dto";

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
