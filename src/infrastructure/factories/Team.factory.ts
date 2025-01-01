import { prisma } from "@/prisma/db";
import { TeamService } from "@/src/application/services/team.service";
import { PrismaTeamRepository } from "../repositories/prisma.team.repository";
import { DeleteTeamUseCase } from "@/src/application/use-cases/team/delete-team.use-case";
import { UpdateTeamUseCase } from "@/src/application/use-cases/team/update-team.use-case";
import { FindTeamByIdUseCase } from "@/src/application/use-cases/team/find-team-by-id.use-case";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { GetUserTeamsUseCase } from "@/src/application/use-cases/team/get-user-teams-with-members.use-case";
import { GetUserTeamsCountUseCase } from "@/src/application/use-cases/team/get-user-teams-count.use-case";
import { PrismaTeamMemberRepository } from "../repositories/prisma.team-member.repository";
import { FindUsersSharedTeamsUseCase } from "@/src/application/use-cases/team/find-users-shared-teams.use-case";

const teamRepository = new PrismaTeamRepository(prisma);
const teamMemberRepository = new PrismaTeamMemberRepository(prisma);

const getUserTeamsCountUseCase = new GetUserTeamsCountUseCase(teamRepository);

const getUserTeamsUseCase = new GetUserTeamsUseCase(teamRepository);

const createTeamWithMembersUseCase = new CreateTeamWithMembersUseCase(
	prisma,
	teamRepository,
	teamMemberRepository
);

const findTeamByIdUseCase = new FindTeamByIdUseCase(teamRepository);

const updateTeamUseCase = new UpdateTeamUseCase(
	prisma,
	teamRepository,
	teamMemberRepository
);

const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository);
const findUsersSharedTeamsUseCase = new FindUsersSharedTeamsUseCase(
	teamRepository
);

export function createTeamService(): TeamService {
	return new TeamService(
		getUserTeamsCountUseCase,
		getUserTeamsUseCase,
		findTeamByIdUseCase,
		createTeamWithMembersUseCase,
		updateTeamUseCase,
		deleteTeamUseCase,
		findUsersSharedTeamsUseCase
	);
}
