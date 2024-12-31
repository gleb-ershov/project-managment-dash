export interface CreateTeamDTO {
	name: string;
	description?: string;
	membersIds?: string[];
}

export interface UpdateTeamDTO {
	name?: string;
	description?: string;
	membersIds?: string[];
}
