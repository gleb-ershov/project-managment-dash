import { TeamMemberViewModel } from "./team-member.view-model";

export interface TeamViewModel {
	id: string;
	name: string;
	description?: string;
	createdAt: string;
	updatedAt: string;

	teamMembers?: TeamMemberViewModel[];
}
