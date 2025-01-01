import { Card, CardContent, CardHeader } from "../../ui/card";

interface UserStatsCardProps {
	label: string;
	amount: number;
	icon?: React.ReactNode;
	content?: React.ReactNode;
}

export const UserStatsCard = (props: UserStatsCardProps) => {
	const { label, amount, icon, content } = props;
	return (
		<Card className="dark:bg-[#18181B] p-0 flex-1">
			<CardHeader className="flex flex-row gap-2">
				{icon}
				{label}
			</CardHeader>
			<CardContent className="font-bold text-2xl pb-0">{amount}</CardContent>
			<CardContent>{content}</CardContent>
		</Card>
	);
};
