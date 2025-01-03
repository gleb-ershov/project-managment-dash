import { User2 } from "lucide-react";
import {
	BaseItem,
	BaseSearchableInput,
} from "../../shared/base-searchable-input";
import { memo, useCallback, useState } from "react";
import { useSearchUsers } from "../../../hooks/user/use-search-users";
import { Badge } from "../../ui/badge";
import { UserViewModel } from "@/src/application/view-models/user.view-model";
import { Label } from "../../ui/label";

interface MemberSearchInputProps {
	id?: string;
	name?: string;
	onMembersChange?: (membersIds: string[]) => void;
	defaultMembers?: UserViewModel[];
	disabled?: boolean;
	className?: string;
}

type SearchableUser = UserViewModel & BaseItem;

export const MemberSearchInput = memo(
	({
		id = "members_search_input",
		name,
		onMembersChange,
		defaultMembers = [],
		disabled,
		className,
	}: MemberSearchInputProps) => {
		const [searchQuery, setSearchQuery] = useState("");
		const { users, isLoading, error } = useSearchUsers(searchQuery);
		const [selectedMembers, setSelectedMembers] =
			useState<UserViewModel[]>(defaultMembers);

		const handleMemberSelect = useCallback(
			(member: UserViewModel) => {
				setSelectedMembers((prev) => {
					const updated = [...prev, member];
					onMembersChange?.(updated.map((m) => m.id));
					return updated;
				});
			},
			[onMembersChange]
		);

		const handleMemberRemove = useCallback(
			(memberId: string) => {
				setSelectedMembers((prev) => {
					const updated = prev.filter((m) => m.id !== memberId);
					onMembersChange?.(updated.map((m) => m.id));
					return updated;
				});
			},
			[onMembersChange]
		);

		return (
			<div className="flex flex-col gap-2">
				<Label htmlFor={id}>Add members</Label>
				<BaseSearchableInput<SearchableUser>
					id={id}
					name={name}
					onInputChangeHandler={setSearchQuery}
					inputValue={searchQuery}
					items={users}
					selectedItems={selectedMembers}
					onItemSelect={handleMemberSelect}
					onItemRemove={handleMemberRemove}
					isLoading={isLoading}
					error={error}
					disabled={disabled}
					className={className}
					placeholder="Search members..."
					renderItem={(member) => (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<User2 className="h-4 w-4" aria-hidden="true" />
								<span>
									{member.name} {member.surname}
								</span>
								<span className="text-sm text-muted-foreground">
									({member.email})
								</span>
							</div>
						</div>
					)}
					renderSelectedItem={(member) => (
						<Badge
							key={member.id}
							variant="secondary"
							className="flex items-center gap-1"
						>
							<User2 className="h-3 w-3" aria-hidden="true" />
							<span>
								{member.name} {member.surname}
							</span>
							<button
								type="button"
								onClick={() => handleMemberRemove(member.id)}
								className="ml-1 hover:text-destructive"
							>
								×
							</button>
						</Badge>
					)}
				/>
			</div>
		);
	}
);

MemberSearchInput.displayName = "MemberSearchInput";
