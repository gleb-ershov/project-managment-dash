import { ProjectEntity } from "./project.entity";

export class ProjectCategoryEntity {
	private _projects?: ProjectEntity[];
	constructor(
		public readonly id: string,
		public readonly name: string,
		projects?: ProjectEntity[]
	) {
		this._projects = projects;
	}

	get projects(): ProjectEntity[] | undefined {
		return this._projects;
	}

	static create(props: {
		name: string;
		projects?: ProjectEntity[];
	}): ProjectCategoryEntity {
		return new ProjectCategoryEntity(
			crypto.randomUUID(),
			props.name,
			props.projects || []
		);
	}

	static reconstitute(props: {
		id: string;
		name: string;
		projects?: ProjectEntity[];
	}): ProjectCategoryEntity {
		return new ProjectCategoryEntity(props.id, props.name);
	}
}
