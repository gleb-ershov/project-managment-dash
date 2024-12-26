import { UserRole } from "@prisma/client";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

export class TeamMemberEntity {
	private _user?: UserEntity;
	private _team?: TeamEntity;
	constructor(
		public readonly id: string,
		public readonly teamId: string,
		public readonly userId: string,
		public readonly role: UserRole = UserRole.MEMBER,
		public readonly joinedAt: Date = new Date(),
		user?: UserEntity,
		team?: TeamEntity
	) {
		this._team = team;
		this._user = user;
	}

	get team(): TeamEntity | undefined {
		return this._team;
	}

	get user(): UserEntity | undefined {
		return this._user;
	}

	static create(props: {
		teamId: string;
		userId: string;
		role: UserRole;
		user?: UserEntity;
		team?: TeamEntity;
	}): TeamMemberEntity {
		return new TeamMemberEntity(
			crypto.randomUUID(),
			props.teamId,
			props.userId,
			props.role,
			new Date(), // joinedAt
			props.user,
			props.team
		);
	}

	static reconstitute(props: {
		id: string;
		teamId: string;
		userId: string;
		role: UserRole;
		joinedAt: Date;
		user?: UserEntity;
		team?: TeamEntity;
	}): TeamMemberEntity {
		return new TeamMemberEntity(
			props.id,
			props.teamId,
			props.userId,
			props.role,
			props.joinedAt,
			props.user,
			props.team
		);
	}
}
