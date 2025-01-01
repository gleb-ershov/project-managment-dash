import { prisma } from "@/prisma/db";
import { PrismaTeamRepository } from "../repositories/prisma.team.repository";
import { CreateTeamWithMembersUseCase } from "@/src/application/use-cases/team/create-team-with-members";
import { PrismaTeamMemberRepository } from "../repositories/prisma.team-member.repository";
import { TeamMemberService } from "@/src/application/services/team-member.service";

const teamRepository = new PrismaTeamRepository(prisma);
const teamMemberRepository = new PrismaTeamMemberRepository(prisma);

const createTeamWithMembersUseCase = new CreateTeamWithMembersUseCase(
	prisma,
	teamRepository,
	teamMemberRepository
);

export function createTeamMemberService(): TeamMemberService {
	return new TeamMemberService(createTeamWithMembersUseCase);
}
