import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaTeamMemberMapper } from "../mappers/prisma.team-member.mapper";

export class PrismaTeamMemberRepository implements ITeamMemberRepository {
	constructor(private prisma: PrismaClient) {}

	async findByTeamId(teamId: string): Promise<TeamMemberEntity[]> {
		const members = await this.prisma.teamMember.findMany({
			where: { teamId },
			include: { user: true },
		});

		return members.map((member) => PrismaTeamMemberMapper.toDomain(member));
	}

	async findByUserId(userId: string): Promise<TeamMemberEntity[]> {
		const members = await this.prisma.teamMember.findMany({
			where: { userId },
			include: { user: true },
		});

		return members.map((member) => PrismaTeamMemberMapper.toDomain(member));
	}

	async create(teamMember: TeamMemberEntity, tx?: any) {
		const prisma = tx || this.prisma;
		const created = await prisma.teamMember.create({
			data: PrismaTeamMemberMapper.toPrisma(teamMember),
		});

		return PrismaTeamMemberMapper.toDomain(created);
	}

	async delete(teamId: string, userId: string): Promise<void> {
		await this.prisma.teamMember.delete({
			where: {
				teamId_userId: {
					teamId,
					userId,
				},
			},
		});
	}

	async updateRole(
		teamId: string,
		userId: string,
		role: UserRole
	): Promise<TeamMemberEntity> {
		const updated = await this.prisma.teamMember.update({
			where: {
				teamId_userId: {
					teamId,
					userId,
				},
			},
			data: { role },
			include: { user: true },
		});

		return PrismaTeamMemberMapper.toDomain(updated);
	}
}
