import { Container } from "@/src/infrastructure/container/container";
import { TeamViewModel } from "../../view-models/team.view-model";

export const findTeamById = async (
	id: string
): Promise<TeamViewModel | null> => {
	try {
		const teamService = Container.getInstance().resolve("TeamService");
		const team = await teamService.findTeamById(id);
		return team;
	} catch (error) {
		throw new Error("Error fetching team by id");
	}
};
