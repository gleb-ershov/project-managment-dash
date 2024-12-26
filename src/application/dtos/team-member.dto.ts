import { UserRole } from "@prisma/client";

export interface CreateTeamMemberDTO {
	userId: string;
	role: UserRole;
}

export interface UpdateTeamMemberDTO {
	role: UserRole;
}
