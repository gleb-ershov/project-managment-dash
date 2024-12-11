'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { handleSearch } from '@/utils/helpers/handleSearch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import { Project, User } from '@prisma/client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface ISelectProjectInput {
    value: string;
    handler: (payload: string) => void;
}

export const SelectProjectInput = (props: ISelectProjectInput) => {
    const { value, handler } = props;
    const { searchParams, pathname, replace } = useUrlParams();

    const inputHandler = useDebouncedCallback(
        (...args) => handleSearch(...args),
        300
    );

    const search = searchParams.get('search');
    const { data, isLoading } = useSWR(
        `/api/projects?search=${search}`,
        fetcher
    );

    const [selectOptions, setOptions] = useState<
        { label: string; value: string }[]
    >([]);

    useEffect(() => {
        if (data) {
            const newData = [...data.data].map((item: Project) => {
                return {
                    value: item.id,
                    label: `${item.title}`,
                };
            });
            setOptions(newData);
        }
    }, [data, search, isLoading]);

    return (
        <Select onValueChange={(val) => handler(val)} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={
                        <span className="flex items-center gap-2 text-sm">
                            Select project
                        </span>
                    }
                />
            </SelectTrigger>

            <SelectContent>
                <Input
                    className="mb-2"
                    placeholder="Search for project"
                    onChange={(e) =>
                        inputHandler(
                            searchParams,
                            pathname,
                            replace,
                            e.currentTarget.value
                        )
                    }
                />
                {selectOptions.map((item) => (
                    <SelectItem
                        value={item.value}
                        key={item.value}
                        className="cursor-pointer duration-300 py-2"
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
