import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";
import { AddEntityButton } from "../../shared/add-entity-button";

interface ProjectMembersProps {
	project: ProjectViewModel;
	currentUserId?: string;
}

export const ProjectMembers = ({
	project,
	currentUserId,
}: ProjectMembersProps) => {
	const isOwner = project.userId === currentUserId;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Team Members</h3>
				{isOwner && (
					<AddEntityButton
						path={`/projects/${project.id}/add-member`}
						label="Add member"
					/>
				)}
			</div>

			<div className="grid gap-4">
				{project.members?.map((member) => (
					<div
						key={member.id}
						className="flex items-center justify-between p-4 bg-white rounded-lg border"
					>
						<div className="flex items-center gap-4">
							<Avatar className="h-10 w-10">
								<AvatarImage
									src={member.imageUrl || undefined}
								/>
								<AvatarFallback>
									{member.name?.charAt(0) ||
										member.email.charAt(0)}
								</AvatarFallback>
							</Avatar>

							<div>
								<p className="font-medium">{member.name}</p>
								<p className="text-sm text-gray-500">
									{member.email}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Badge variant="outline">
								{member.id === project.userId
									? "Owner"
									: "Member"}
							</Badge>

							{isOwner && member.id !== currentUserId && (
								<Button variant="ghost" size="sm">
									Remove
								</Button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
