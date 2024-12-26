import { TeamEntity } from "../enitites/team.entity";

export interface ITeamRepository {
	findById(id: string): Promise<TeamEntity | null>;
	findByUserId(userId: string, limit?: number): Promise<TeamEntity[]>;
	create(team: TeamEntity, tx?: any): Promise<TeamEntity>;
	update(team: TeamEntity): Promise<TeamEntity>;
	delete(id: string): Promise<void>;
	addMember(teamId: string, userId: string): Promise<TeamEntity>;
	removeMember(teamId: string, userId: string): Promise<TeamEntity>;
	countTeamsByUserId(userId: string): Promise<number>;
}
