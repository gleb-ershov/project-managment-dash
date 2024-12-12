'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUrlParams } from '@/hooks/useUrlParams';
import { ArrowDownUp } from 'lucide-react';

export const SortProjectsSelect = () => {
    const { searchParams, pathname, replace } = useUrlParams();

    const handleSortSelect = (newSortQuery: string) => {
        const newURLparams = new URLSearchParams(searchParams);
        newURLparams.set('sortBy', newSortQuery);
        replace(`${pathname}?${newURLparams.toString()}`);
    };

    return (
        <Select onValueChange={(e) => handleSortSelect(e)}>
            <SelectTrigger className="w-[150px]">
                <SelectValue
                    placeholder={
                        <span className="flex items-center gap-2 text-sm">
                            <ArrowDownUp size={16} />
                            <span>Sort by</span>
                        </span>
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">
                    <span className="flex items-center gap-2">Newest</span>
                </SelectItem>
                <SelectItem value="latest">
                    <span className="flex items-center gap-2">Latest</span>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};
