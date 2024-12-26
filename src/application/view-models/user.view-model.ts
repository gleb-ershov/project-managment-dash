import { ProjectViewModel } from "./project.view-model";
import { TaskCommentViewModel } from "./task-comment.view-model";
import { TaskViewModel } from "./task.view-model";
import { TeamMemberViewModel } from "./team-member.view-model";

export interface UserViewModel {
	id: string;
	name: string;
	surname: string;
	email: string;
	imageUrl: string;
	plan: string;
	description?: string;
    
	tasks?: TaskViewModel[];
	projects?: ProjectViewModel[];
	taskComments?: TaskCommentViewModel[];
	teamMembers?: TeamMemberViewModel[];
}
