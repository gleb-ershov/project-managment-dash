export interface CreateTeamDTO {
	name: string;
	description?: string;
	memberIds?: string[];
}

export interface UpdateTeamDTO {
	name?: string;
	description?: string;
	memberIds?: string[];
}
