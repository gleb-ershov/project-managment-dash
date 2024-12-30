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
		<Card>
			<CardHeader>
				{label}
				{icon}
			</CardHeader>
			<CardContent>{amount}</CardContent>
			<CardContent>{content}</CardContent>
		</Card>
	);
};
