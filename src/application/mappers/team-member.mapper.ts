import { UserMapper } from "./user.mapper";
import { format } from "date-fns";
import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { TeamMemberViewModel } from "../view-models/team-member.view-model";
import { TeamMapper } from "./team.mapper";

export class TeamMemberMapper {
	static toViewModel(entity: TeamMemberEntity): TeamMemberViewModel {
		return {
			id: entity.id,
			role: entity.role,
			teamId: entity.teamId,
			userId: entity.userId,
			joinedAt: format(entity.joinedAt, "PPP"),
			// Map related entities if they exist

			user: entity.user ? UserMapper.toViewModel(entity.user) : undefined,

			team: entity.team ? TeamMapper.toViewModel(entity.team) : undefined,
		};
	}

	static toViewModels(entities: TeamMemberEntity[]): TeamMemberViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
