import { TeamMemberEntity } from "./team-member.entity";

export class TeamEntity {
	private _teamMembers?: TeamMemberEntity[];
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string | null,
		public readonly createdAt: Date = new Date(),
		public readonly updatedAt: Date = new Date(),
		teamMembers?: TeamMemberEntity[]
	) {
		this._teamMembers = teamMembers;
	}

	get teamMembers(): TeamMemberEntity[] | undefined {
		return this._teamMembers;
	}

	static create(props: { name: string; description?: string }): TeamEntity {
		return new TeamEntity(
			crypto.randomUUID(),
			props.name,
			props.description || null,
			new Date(),
			new Date()
		);
	}

	static reconstitute(props: {
		id: string;
		name: string;
		description?: string | null;
		createdAt?: Date;
		updatedAt?: Date;
		deletedAt?: Date | null;
		teamMembers?: TeamMemberEntity[];
	}): TeamEntity {
		return new TeamEntity(
			props.id,
			props.name,
			props.description || null,
			props.createdAt || new Date(),
			props.updatedAt || new Date(),
			props.teamMembers
		);
	}
}
