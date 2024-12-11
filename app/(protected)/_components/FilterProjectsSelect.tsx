'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUrlParams } from '@/hooks/useUrlParams';
import { Check, ListX, SlidersHorizontal } from 'lucide-react';

export const FilterProjectsSelect = () => {
    const { searchParams, pathname, replace } = useUrlParams();

    const handleFilter = (newSortQuery: string) => {
        const newURLparams = new URLSearchParams(searchParams);
        if (newSortQuery === 'all') {
            newURLparams.delete('filterBy');
            replace(`${pathname}?${newURLparams.toString()}`);
        }
        newURLparams.set('filterBy', newSortQuery);
        replace(`${pathname}?${newURLparams.toString()}`);
    };

    return (
        <Select onValueChange={(e) => handleFilter(e)}>
            <SelectTrigger className="w-[150px]">
                <SelectValue
                    placeholder={
                        <span className="flex items-center gap-2 text-sm">
                            <SlidersHorizontal size={16} />
                            <span>Filter</span>
                        </span>
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">
                    <span className="flex items-center gap-2">
                        <Check size={16} />
                        Completed
                    </span>
                </SelectItem>
                <SelectItem value="in progress">
                    <span className="flex items-center gap-2">
                        <ListX size={16} />
                        In Progress
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};
