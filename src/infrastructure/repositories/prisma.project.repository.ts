"server-only";

import { DatabaseError } from "@/src/domain/errors/application.error";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import { ProjectEntity } from "@/src/domain/enitites/project.entity";
import {
	IProjectRepository,
	ProjectFiltersAndSort,
} from "@/src/domain/repositories/project.repository.interface";
import { PrismaProjectMapper } from "../mappers/prisma.project.mapper";

export class PrismaProjectRepository implements IProjectRepository {
	constructor(private prisma: PrismaClient) {}

	private readonly defaultIncludes = {
		members: true,
		createdBy: true,
		categories: true,
		tasks: {
			include: {
				createdBy: true,
				project: {
					include: {
						createdBy: true,
					},
				},
			},
		},
	};

	async findUsersSharedProjects(
		currentUserId: string,
		userId: string
	): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					OR: [
						{
							AND: [
								{ userId: currentUserId },
								{
									members: {
										some: {
											id: userId,
										},
									},
								},
							],
						},
						{
							AND: [
								{ userId },
								{
									members: {
										some: {
											id: currentUserId,
										},
									},
								},
							],
						},
					],
				},
				include: this.defaultIncludes,
			});

			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError("Failed to fetch projects:", error);
		}
	}

	async addMember(
		projectId: string,
		membersIds: string[]
	): Promise<ProjectEntity> {
		try {
			const project = await this.prisma.project.update({
				where: {
					id: projectId,
				},
				include: this.defaultIncludes,
				data: {
					members: {
						connect: membersIds.map((memberId) => ({
							id: memberId,
						})),
					},
				},
			});
			return PrismaProjectMapper.toDomain(project);
		} catch (error) {
			throw new DatabaseError("Failed to add member:", error);
		}
	}

	async findByQueryAndUser(
		query: string,
		userId: string
	): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					AND: [
						{
							title: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							OR: [
								{ userId: userId },
								{
									members: {
										some: {
											id: userId,
										},
									},
								},
							],
						},
						{ deletedAt: null },
					],
				},
				include: this.defaultIncludes,
			});
			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError("Failed to fetch projects:", error);
		}
	}

	async findWithFiltersAndSort({
		userId,
		searchQuery,
		status,
		sortBy,
	}: ProjectFiltersAndSort): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					AND: [
						{
							OR: [
								{ userId }, // User is creator
								{
									members: {
										some: {
											id: userId,
										},
									},
								},
							],
						},
						// Apply status filter if provided
						status && status !== ("all" as ProjectStatus)
							? { status }
							: {},
						// Apply search query filter if provided
						searchQuery
							? {
									title: {
										contains: searchQuery,
										mode: "insensitive",
									},
							  }
							: {},
						{ deletedAt: null }, // Exclude deleted projects
					],
				},
				include: this.defaultIncludes,
				orderBy: {
					createdAt: sortBy === "latest" ? "desc" : "asc",
				},
			});

			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError(
				"Failed to fetch projects with filters:",
				error
			);
		}
	}

	async findFinishedProjectsByUserId(
		userId: string
	): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					AND: [
						{
							OR: [
								{ userId: userId },
								{
									members: {
										some: {
											id: userId,
										},
									},
								},
							],
						},
						{ status: ProjectStatus.COMPLETED },
						{ deletedAt: null },
					],
				},
				include: this.defaultIncludes,
			});
			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError("Failed to fetch finished projects:", error);
		}
	}

	async findById(id: string): Promise<ProjectEntity | null> {
		try {
			const project = await this.prisma.project.findUnique({
				where: { id },
				include: this.defaultIncludes,
			});

			if (!project) return null;

			return PrismaProjectMapper.toDomain(project);
		} catch (error) {
			throw new DatabaseError("Failed to fetch project:", error);
		}
	}

	async findByUserId(userId: string): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					userId,
					deletedAt: null,
				},
				include: this.defaultIncludes,
			});

			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError("Failed to fetch projects by user:", error);
		}
	}

	async findByUserIdWithMembers(userId: string): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					userId,
					deletedAt: null,
				},
				include: this.defaultIncludes,
			});

			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError(
				"Failed to fetch projects with members:",
				error
			);
		}
	}

	async findAll(): Promise<ProjectEntity[]> {
		try {
			const projects = await this.prisma.project.findMany({
				where: {
					deletedAt: null,
				},
				include: this.defaultIncludes,
			});

			return projects.map((project) =>
				PrismaProjectMapper.toDomain(project)
			);
		} catch (error) {
			throw new DatabaseError("Failed to fetch all projects:", error);
		}
	}

	async create(payload: ProjectEntity): Promise<ProjectEntity> {
		try {
			const project = await this.prisma.project.create({
				data: {
					id: payload.id,
					title: payload.title,
					userId: payload.userId,
					dueDate: payload.dueDate,
					status: payload.status,
					description: payload.description,
					categories: {
						connect: payload.categoriesIds?.map((category) => ({
							id: category,
						})),
					},
					members: {
						connect: payload.membersIds?.map((member) => ({
							id: member,
						})),
					},
				},
				include: this.defaultIncludes,
			});
			return PrismaProjectMapper.toDomain(project);
		} catch (error) {
			throw new DatabaseError("Failed to create project:", error);
		}
	}

	async update(
		id: string,
		data: Partial<ProjectEntity>
	): Promise<ProjectEntity> {
		try {
			const project = await this.prisma.project.update({
				where: { id },
				data: {
					title: data.title,
					status: data.status,
					dueDate: data.dueDate,
					description: data.description,
					members: {
						connect: data.membersIds?.map((member) => ({
							id: member,
						})),
					},
				},
				include: this.defaultIncludes,
			});

			return PrismaProjectMapper.toDomain(project);
		} catch (error) {
			throw new DatabaseError("Failed to update project:", error);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.prisma.project.delete({
				where: { id },
			});
		} catch (error) {
			throw new DatabaseError("Failed to delete project:", error);
		}
	}

	async softDelete(id: string): Promise<void> {
		try {
			await this.prisma.project.update({
				where: { id },
				data: {
					deletedAt: new Date(),
				},
			});
		} catch (error) {
			throw new DatabaseError("Failed to soft delete project:", error);
		}
	}
}
