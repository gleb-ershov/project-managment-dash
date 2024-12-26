import { UserEntity } from "@/src/domain/enitites/user.entity";
import { DatabaseError } from "@/src/domain/errors/application.error";
import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { PrismaClient } from "@prisma/client";
import { PrismaUserMapper as PrismaPrismaUserMapper } from "../mappers/prisma.user.mapper";

export class PrismaUserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async findAllByQuery(query: string): Promise<UserEntity[]> {
		try {
			const users = await this.prisma.user.findMany({
				where: {
					OR: [
						{
							email: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							name: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							surname: {
								contains: query,
								mode: "insensitive",
							},
						},
					],
				},
			});

			if (!users) return [];

			return PrismaPrismaUserMapper.toDomainList(users);
		} catch (error) {
			throw new DatabaseError("Failed to fetch users", error);
		}
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email },
			});

			if (!user) return null;

			return user ? PrismaPrismaUserMapper.toDomain(user) : null;
		} catch (error) {
			throw new DatabaseError("Failed to fetch user", error);
		}
	}

	async findById(id: string): Promise<UserEntity | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id },
			});

			if (!user) return null;

			return user ? PrismaPrismaUserMapper.toDomain(user) : null;
		} catch (error) {
			throw new DatabaseError("Failed to fetch user", error);
		}
	}

	async create(userEntity: UserEntity): Promise<UserEntity> {
		// Fix later
		if (!userEntity.password) {
			throw new DatabaseError("Password is required");
		}

		try {
			const user = await this.prisma.user.create({
				data: {
					id: userEntity.id,
					email: userEntity.email.getValue(),
					password: userEntity.password.getHash(),
					name: userEntity.name,
					surname: userEntity.surname,
					imageUrl: userEntity.imageUrl,
					plan: userEntity.plan,
					description: userEntity.description,
				},
			});

			return PrismaPrismaUserMapper.toDomain(user);
		} catch (error) {
			throw new DatabaseError("Failed to create user", error);
		}
	}

	async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
		try {
			const updateData: any = {};

			if (data.email) updateData.email = data.email.getValue();
			if (data.password) updateData.password = data.password.getHash();
			if (data.name) updateData.name = data.name;
			if (data.surname) updateData.surname = data.surname;
			if (data.imageUrl) updateData.imageUrl = data.imageUrl;
			if (data.plan) updateData.plan = data.plan;
			if (data.description !== undefined)
				updateData.description = data.description;

			const user = await this.prisma.user.update({
				where: { id },
				data: updateData,
			});

			return PrismaPrismaUserMapper.toDomain(user);
		} catch (error) {
			throw new DatabaseError("Failed to update user", error);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.prisma.user.delete({
				where: { id },
			});
		} catch (error) {
			throw new DatabaseError("Failed to delete user", error);
		}
	}
}
