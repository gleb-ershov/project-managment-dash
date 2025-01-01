import { TeamEntity } from "@/src/domain/enitites/team.entity";
import { ITeamRepository } from "@/src/domain/repositories/team.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaTeamMapper } from "../mappers/prisma.team.mapper";
import { DatabaseError } from "@/src/domain/errors/application.error";

export class PrismaTeamRepository implements ITeamRepository {
	constructor(private prisma: PrismaClient) {}

	async findUsersSharedTeams(
		currentUserId: string,
		userId: string
	): Promise<TeamEntity[]> {
		try {
			const teams = await this.prisma.team.findMany({
				where: {
					AND: [
						{
							members: {
								some: {
									userId,
								},
							},
						},
						{
							members: {
								some: {
									userId: currentUserId,
								},
							},
						},
					],
				},
			});

			return teams.map((team) => PrismaTeamMapper.toDomain(team));
		} catch (error) {
			throw new DatabaseError("Failed to fetch teams:", error);
		}
	}

	async findById(id: string): Promise<TeamEntity | null> {
		try {
			const team = await this.prisma.team.findUnique({
				where: { id },
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			if (!team) return null;
			return PrismaTeamMapper.toDomain(team);
		} catch (error) {
			throw new DatabaseError("Failed to fetch tea by id:", error);
		}
	}

	async findByUserId(userId: string, limit?: number): Promise<TeamEntity[]> {
		try {
			const teams = await this.prisma.team.findMany({
				where: { members: { some: { userId } } },
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
				take: limit,
			});

			return teams.map((team) => PrismaTeamMapper.toDomain(team));
		} catch (error) {
			throw new DatabaseError("Failed to fetch tea by user:", error);
		}
	}

	async findAll(): Promise<TeamEntity[]> {
		try {
			const teams = await this.prisma.team.findMany({
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			return teams.map((team) => PrismaTeamMapper.toDomain(team));
		} catch (error) {
			throw new DatabaseError("Failed to fetch teams:", error);
		}
	}

	async create(team: TeamEntity, tx?: any): Promise<TeamEntity> {
		try {
			const prisma = tx || this.prisma;
			const created = await prisma.team.create({
				data: {
					id: team.id,
					name: team.name,
					description: team.description,
					createdAt: team.createdAt,
					updatedAt: team.updatedAt,
				},
			});
			return PrismaTeamMapper.toDomain(created);
		} catch (error) {
			throw new DatabaseError("Failed to create new team:", error);
		}
	}

	async update(team: TeamEntity): Promise<TeamEntity> {
		try {
			const updated = await this.prisma.team.update({
				where: { id: team.id },
				data: {
					name: team.name,
					description: team.description,
				},
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			return PrismaTeamMapper.toDomain(updated);
		} catch (error) {
			throw new DatabaseError("Failed to update team:", error);
		}
	}

	async delete(id: string): Promise<void> {
		await this.prisma.team.delete({
			where: { id },
		});
	}
	async addMember(teamId: string, membersIds: string[]): Promise<TeamEntity> {
		try {
			const updated = await this.prisma.team.update({
				where: { id: teamId },
				data: {
					members: {
						connect: membersIds.map((memberId) => ({
							id: memberId,
						})),
					},
				},
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			return PrismaTeamMapper.toDomain(updated);
		} catch (error) {
			throw new DatabaseError("Failed to add member to the team:", error);
		}
	}

	async removeMember(teamId: string, userId: string): Promise<TeamEntity> {
		try {
			const updated = await this.prisma.team.update({
				where: { id: teamId },
				data: {
					members: {
						disconnect: { id: userId },
					},
				},
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			return PrismaTeamMapper.toDomain(updated);
		} catch (error) {
			throw new DatabaseError(
				"Failed to remove member from the team:",
				error
			);
		}
	}

	async countTeamsByUserId(userId: string): Promise<number> {
		try {
			const count = await this.prisma.team.count({
				where: {
					members: {
						some: {
							userId: userId,
						},
					},
				},
			});

			return count;
		} catch (error) {
			throw new DatabaseError("Failed to get user teams count:", error);
		}
	}
}
