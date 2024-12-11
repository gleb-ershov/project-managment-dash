'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUrlParams } from '@/hooks/useUrlParams';
import { ArrowDownUp, Check, ListX, SlidersHorizontal } from 'lucide-react';

export const SortProjectsSelect = () => {
    const { searchParams, pathname, replace } = useUrlParams();

    const handleSortSelect = (newSortQuery: string) => {
        const newURLparams = new URLSearchParams(searchParams);
        const currentSortValue = newURLparams.get('sortBy');

        if (currentSortValue === newSortQuery) {
            const currentOrder = newURLparams.get('order');
            newURLparams.set('order', currentOrder === 'desc' ? 'asc' : 'desc');
            replace(`${pathname}?${newURLparams.toString()}`);
        }

        if (newSortQuery === 'relevance') {
            newURLparams.delete('sortBy');
            replace(`${pathname}?${newURLparams.toString()}`);
        }

        newURLparams.set('sortBy', newSortQuery);
        newURLparams.set('order', 'desc');

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
                <SelectItem value="relevance">Relevance</SelectItem>
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
