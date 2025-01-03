import { Tag } from "lucide-react";
import {
	BaseItem,
	BaseSearchableInput,
} from "../../shared/base-searchable-input";
import { memo, useCallback, useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { useSearchCategories } from "@/src/presentation/hooks/project-categories/use-search-categories";
import { ProjectCategoryViewModel } from "@/src/application/view-models/project-category.view-model";
import { Label } from "../../ui/label";

interface ProjectCategorySearchInputProps {
	id?: string;
	name?: string;
	onCategoriesChange?: (categoriesIds: string[]) => void;
	fallbackData?: ProjectCategoryViewModel[];
	defaultCategories?: ProjectCategoryViewModel[];
	disabled?: boolean;
	className?: string;
}

type SearchableCategory = ProjectCategoryViewModel & BaseItem;

export const ProjectCategorySearchInput = memo(
	({
		id = "categories_search_input",
		name,
		onCategoriesChange,
		fallbackData = [],
		defaultCategories = [],
		disabled,
		className,
	}: ProjectCategorySearchInputProps) => {
		const [searchQuery, setSearchQuery] = useState("");
		const [selectedCategories, setSelectedCategories] =
			useState<ProjectCategoryViewModel[]>(defaultCategories);

		const { categories, isLoading, error } = useSearchCategories(
			searchQuery,
			{
				fallbackData,
			}
		);

		const handleCategorySelect = useCallback(
			(category: ProjectCategoryViewModel) => {
				setSelectedCategories((prev) => {
					const updated = [...prev, category];
					onCategoriesChange?.(updated.map((c) => c.id));
					return updated;
				});
			},
			[onCategoriesChange]
		);

		const handleCategoryRemove = useCallback(
			(categoryId: string) => {
				setSelectedCategories((prev) => {
					const updated = prev.filter((c) => c.id !== categoryId);
					onCategoriesChange?.(updated.map((c) => c.id));
					return updated;
				});
			},
			[onCategoriesChange]
		);

		return (
			<div className="flex flex-col gap-2">
				<Label htmlFor={id}>Add category</Label>
				<BaseSearchableInput<SearchableCategory>
					id={id}
					name={name}
					onInputChangeHandler={setSearchQuery}
					inputValue={searchQuery}
					items={categories}
					selectedItems={selectedCategories}
					onItemSelect={handleCategorySelect}
					onItemRemove={handleCategoryRemove}
					isLoading={isLoading}
					error={error}
					disabled={disabled}
					className={className}
					placeholder="Search categories..."
					renderItem={(category) => (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Tag className="h-4 w-4" aria-hidden="true" />
								<span>{category.name}</span>
							</div>
						</div>
					)}
					renderSelectedItem={(category) => (
						<Badge
							key={category.id}
							variant="secondary"
							className="flex items-center gap-1"
						>
							<Tag className="h-3 w-3" aria-hidden="true" />
							<span>{category.name}</span>
							<button
								type="button"
								onClick={() =>
									handleCategoryRemove(category.id)
								}
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

ProjectCategorySearchInput.displayName = "ProjectCategorySearchInput";
