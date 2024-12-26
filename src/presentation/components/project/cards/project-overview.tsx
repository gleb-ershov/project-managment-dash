import { BarChart3, CheckCircle2, Clock, Users } from "lucide-react";
import { getProjectStats } from "@/src/application/queries/project/get-project-stats";
import { Card, CardContent } from "../../ui/card";
import { ProjectViewModel } from "@/src/application/view-models/project.view-model";

export const ProjectOverview = (props: ProjectViewModel) => {
	const stats = getProjectStats(props);

	return (
		<div className="grid gap-6">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title="Total Tasks"
					value={stats.totalTasks}
					icon={<BarChart3 className="h-4 w-4" />}
				/>
				<StatCard
					title="Completed Tasks"
					value={stats.completedTasks}
					icon={<CheckCircle2 className="h-4 w-4" />}
				/>
				<StatCard
					title="Team Members"
					value={stats.teamMembers}
					icon={<Users className="h-4 w-4" />}
				/>
				<StatCard
					title="Days Remaining"
					value={stats.daysRemaining}
					icon={<Clock className="h-4 w-4" />}
				/>
			</div>

			{/* Recent Activity */}
			{/* <Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{project.activities?.slice(0, 5).map((activity) => (
							<div
								key={activity.id}
								className="flex items-start gap-4"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage
										src={
											activity.user.imageUrl || undefined
										}
									/>
									<AvatarFallback>
										{activity.user.name?.charAt(0) ||
											activity.user.email.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm">
										<span className="font-medium">
											{activity.user.name}
										</span>{" "}
										{activity.description}
									</p>
									<p className="text-xs text-gray-500">
										{format(
											new Date(activity.createdAt),
											"MMM d, h:mm a"
										)}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card> */}
		</div>
	);
};

const StatCard = ({
	title,
	value,
	icon,
}: {
	title: string;
	value: number | string;
	icon: React.ReactNode;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-gray-500">{title}</p>
				{icon}
			</div>
			<p className="text-2xl font-bold mt-2">{value}</p>
		</CardContent>
	</Card>
);
