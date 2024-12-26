import { TaskEntity } from "@/src/domain/enitites/task.enitity";
import { TaskViewModel } from "../view-models/task.view-model";
import { UserMapper } from "./user.mapper";
import { format } from "date-fns";
import { ProjectMapper } from "./project.mapper";
import { TaskCommentMapper } from "./task-comment.mapper";

export class TaskMapper {
    static toViewModel(entity: TaskEntity): TaskViewModel {
        return {
            id: entity.id,
            title: entity.title,
            userId: entity.userId,
            projectId: entity.projectId,
            priority: entity.priority,
            status: entity.status,
            dueDate: format(entity.dueDate, "PPP"),
            externalLinks: entity.externalLinks,
            tags: entity.tags,
            description: entity.description as string | undefined,
            createdAt: format(entity.createdAt, "PPP"),
            updatedAt: format(entity.updatedAt, "PPP"),
            
            // Map related entities if they exist
            members: entity.members ?  
                 UserMapper.toViewModels(entity.members)
                : undefined,
            
            project: entity.project 
                ? ProjectMapper.toViewModel(entity.project)
                : undefined,
            
            comments: entity.comments 
                ? entity.comments.map(comment => TaskCommentMapper.toViewModel(comment))
                : undefined,
                
            createdBy: entity.createdBy 
                ? UserMapper.toViewModel(entity.createdBy)
                : undefined
        };
    }

    static toViewModels(entities: TaskEntity[]): TaskViewModel[] {
        return entities.map((entity) => this.toViewModel(entity));
    }
}
