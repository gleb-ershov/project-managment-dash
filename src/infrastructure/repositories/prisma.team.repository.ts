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
			throw new DatabaseError("Failed to fetch teams", error);
		}
	}

	async findById(id: string): Promise<TeamEntity | null> {
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
	}

	async findByUserId(userId: string, limit?: number): Promise<TeamEntity[]> {
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
	}

	async findAll(): Promise<TeamEntity[]> {
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
	}

	async create(team: TeamEntity, tx?: any): Promise<TeamEntity> {
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

		return new TeamEntity(
			created.id,
			created.name,
			created.description,
			created.createdAt,
			created.updatedAt
		);
	}

	async update(team: TeamEntity): Promise<TeamEntity> {
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
	}

	async delete(id: string): Promise<void> {
		await this.prisma.team.delete({
			where: { id },
		});
	}
	async addMember(teamId: string, membersIds: string[]): Promise<TeamEntity> {
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
	}

	async removeMember(teamId: string, userId: string): Promise<TeamEntity> {
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
	}

	async countTeamsByUserId(userId: string): Promise<number> {
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
	}
}
