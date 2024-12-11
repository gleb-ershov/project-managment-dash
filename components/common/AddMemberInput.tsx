'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { handleSearch } from '@/utils/helpers/handleSearch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import { MultiSelect } from '../ui/multi-select';
import { User } from '@prisma/client';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface IAddMembersInputProps {
    value: string[];
    handler: (payload: string[]) => void;
}

export const AddMembersInput = (props: IAddMembersInputProps) => {
    const { value, handler } = props;
    const { searchParams, pathname, replace } = useUrlParams();

    const inputHandler = useDebouncedCallback(
        (...args) => handleSearch(...args),
        300
    );

    const search = searchParams.get('search');
    const { data, isLoading } = useSWR(
        `/api/members?search=${search}`,
        fetcher
    );

    const [selectOptions, setOptions] = useState<
        { label: string; value: string }[]
    >([]);

    useEffect(() => {
        if (data) {
            const newData = [...data.data].map((item: User) => {
                return {
                    value: item.id,
                    label: `${item.name} ${item.surname}`,
                };
            });
            setOptions(newData);
        }
    }, [data, search, isLoading]);

    return (
        <MultiSelect
            options={selectOptions}
            onValueChange={handler}
            defaultValue={[]}
            value={value}
            placeholder="Select members"
            variant="inverted"
            maxCount={3}
            onInputValueChange={(val) =>
                inputHandler(searchParams, pathname, replace, val)
            }
        />
    );
};
