import { Ellipsis } from "lucide-react";
import {
	ICON_WRAPPER_STYLES,
	STAT_CARD_BASE_STYLES,
	STAT_LABEL_STYLES,
	STAT_VALUE_STYLES,
} from "../../consts/stat-card-styles";

interface StatCardProps {
	icon: React.ReactNode;
	value: string;
	label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => (
	<div className={STAT_CARD_BASE_STYLES}>
		<div className="flex w-full justify-between">
			<span className={ICON_WRAPPER_STYLES}>{icon}</span>
			<Ellipsis size={22} color="#8A8A8E" />
		</div>
		<span className={STAT_VALUE_STYLES}>{value}</span>
		<span className={STAT_LABEL_STYLES}>{label}</span>
	</div>
);
