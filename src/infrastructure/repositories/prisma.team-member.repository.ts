import { TeamMemberEntity } from "@/src/domain/enitites/team-member.entity";
import { ITeamMemberRepository } from "@/src/domain/repositories/team-member.repository.interface";
import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaTeamMemberMapper } from "../mappers/prisma.team-member.mapper";
import { DatabaseError } from "@/src/domain/errors/application.error";

export class PrismaTeamMemberRepository implements ITeamMemberRepository {
	constructor(private prisma: PrismaClient) {}

	async findByTeamId(teamId: string): Promise<TeamMemberEntity[]> {
		try {
			const members = await this.prisma.teamMember.findMany({
				where: { teamId },
				include: { user: true },
			});

			return members.map((member) =>
				PrismaTeamMemberMapper.toDomain(member)
			);
		} catch (error) {
			throw new DatabaseError(
				"Failed to fetch team members by team:",
				error
			);
		}
	}

	async findByUserId(userId: string): Promise<TeamMemberEntity[]> {
		try {
			const members = await this.prisma.teamMember.findMany({
				where: { userId },
				include: { user: true },
			});

			return members.map((member) =>
				PrismaTeamMemberMapper.toDomain(member)
			);
		} catch (error) {
			throw new DatabaseError(
				"Failed to find team members by user:",
				error
			);
		}
	}

	async create(teamMember: TeamMemberEntity, tx?: any) {
		try {
			const prisma = tx || this.prisma;
			const created = await prisma.teamMember.create({
				data: PrismaTeamMemberMapper.toPrisma(teamMember),
			});
			console.log("CREATED TEAM MEMBER IN DB", created);
			return PrismaTeamMemberMapper.toDomain(created);
		} catch (error) {
			console.log("ERROR IN TM CREATE", error);
			throw new DatabaseError("Failed to create team member:", error);
		}
	}

	async delete(teamId: string, userId: string): Promise<void> {
		try {
			await this.prisma.teamMember.delete({
				where: {
					teamId_userId: {
						teamId,
						userId,
					},
				},
			});
		} catch (error) {
			throw new DatabaseError("Failed to delete team member:", error);
		}
	}

	async updateRole(
		teamId: string,
		userId: string,
		role: UserRole
	): Promise<TeamMemberEntity> {
		try {
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
		} catch (error) {
			throw new DatabaseError(
				"Failed to update team member role:",
				error
			);
		}
	}
}
