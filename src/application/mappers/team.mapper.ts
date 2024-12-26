import { format } from "date-fns";
import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { TeamViewModel } from "../view-models/team.view-model";
import { TeamMemberMapper } from "./team-member.mapper";

export class TeamMapper {
	static toViewModel(entity: TeamEntity): TeamViewModel {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description as string | undefined,
			createdAt: format(entity.createdAt, "PPP"),
			updatedAt: format(entity.updatedAt, "PPP"),
			
            // Map related entities if they exist
			teamMembers: entity.teamMembers
				? TeamMemberMapper.toViewModels(entity.teamMembers)
				: undefined,
		};
	}

	static toViewModels(entities: TeamEntity[]): TeamViewModel[] {
		return entities.map((entity) => this.toViewModel(entity));
	}
}
