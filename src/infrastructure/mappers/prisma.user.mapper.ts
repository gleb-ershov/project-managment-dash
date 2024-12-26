import { UserEntity } from "@/src/domain/enitites/user.entity";
import { PrismaTaskCommentMapper } from "./prisma.task-comment.mapper";
import { PrismaUserWithRelations } from "./mapper.types";
import { PrismaTeamMemberMapper } from "./prisma.team-member.mapper";
import { PrismaProjectMapper } from "./prisma.project.mapper";
import { PrismaTaskMapper } from "./prisma.task.mapper";
import { User } from "@prisma/client";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUserWithRelations): UserEntity {
		return UserEntity.reconstitute({
			id: raw.id,
			email: raw.email,
			password: raw.password,
			name: raw.name,
			surname: raw.surname,
			imageUrl: raw.imageUrl,
			plan: raw.plan,
			description: raw.description,
			deletedAt: raw.deletedAt,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
			tasks:
				raw.tasks?.map((task) => PrismaTaskMapper.toDomain(task)) ?? [],
			projects:
				raw.projects?.map((project) =>
					PrismaProjectMapper.toDomain(project)
				) ?? [],
			taskComments:
				raw.taskComments?.map((comment) =>
					PrismaTaskCommentMapper.toDomain(comment)
				) ?? [],
			teamMembers:
				raw.teamMembers?.map((member) =>
					PrismaTeamMemberMapper.toDomain(member)
				) ?? [],
		});
	}

	static toDomainList(raw: PrismaUserWithRelations[]): UserEntity[] {
		return raw.map((entity) => this.toDomain(entity));
	}

	static toPrisma(entity: UserEntity): Omit<User, "password"> {
		return {
			id: entity.id,
			email: entity.email.getValue(),
			name: entity.name,
			surname: entity.surname,
			imageUrl: entity.imageUrl,
			plan: entity.plan,
			description: entity.description ?? null,
			deletedAt: entity.deletedAt as Date,
			createdAt: entity.createdAt as Date,
			updatedAt: entity.updatedAt as Date,
		};
	}
}
