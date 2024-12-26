import { SidebarMenuSubItem } from "../../ui/sidebar";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface SidebarProjectsListCardProps {
	id: string;
	title: string;
}

const ITEM_STYLES = [
	"my-2 flex h-[32px] w-full cursor-pointer items-center gap-2",
	"rounded-lg px-2 text-center text-[15px] font-normal",
	"bg-transparent text-gray-800",
	"hover:bg-gray-100 hover:text-gray-900",
	"dark:bg-transparent dark:text-gray-200",
	"dark:hover:bg-[#212125] dark:hover:text-white",
	"transition-colors duration-300",
].join(" ");

const LINK_STYLES = "flex items-center gap-2 w-full";

const ICON_WRAPPER_STYLES = [
	"w-fit rounded-md p-1",
	"bg-[#DD4A78]",
	"dark:bg-[#FF5B93]",
	"transition-colors duration-300",
].join(" ");

const TITLE_STYLES = [
	"truncate",
	"text-gray-700",
	"dark:text-gray-200",
	"transition-colors duration-300",
].join(" ");

export const SidebarProjectsListCard = memo(
	(props: SidebarProjectsListCardProps) => {
		const { id, title } = props;
		const projectUrl = `/projects/${id}`;

		return (
			<>
				<SidebarMenuSubItem className={ITEM_STYLES}>
					<Link
						href={projectUrl}
						className={LINK_STYLES}
						prefetch={true}
					>
						<span className={ICON_WRAPPER_STYLES}>
							<FolderKanban
								color="#DD4A78"
								fill="white"
								size={14}
								aria-hidden="true"
							/>
						</span>
						<span title={title} className={TITLE_STYLES}>
							{title}
						</span>
					</Link>
				</SidebarMenuSubItem>
			</>
		);
	}
);

SidebarProjectsListCard.displayName = "SidebarProjectsListCard";
