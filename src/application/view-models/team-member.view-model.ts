import { TeamViewModel } from "./team.view-model";
import { UserViewModel } from "./user.view-model";

export interface TeamMemberViewModel {
	id: string;
	teamId: string;
	userId: string;
	role: string;
	joinedAt: string;

	user?: UserViewModel;
	team?: TeamViewModel;
}
