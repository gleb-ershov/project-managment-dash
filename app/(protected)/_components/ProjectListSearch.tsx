'use client';

import { Input } from '@/components/ui/input';
import { useUrlParams } from '@/hooks/useUrlParams';
import { handleSearch } from '@/utils/helpers/handleSearch';
import { useDebouncedCallback } from 'use-debounce';

export const ProjectListSearch = () => {
    const { searchParams, pathname, replace } = useUrlParams();

    const inputHandler = useDebouncedCallback(
        (...args) => handleSearch('project', ...args),
        300
    );

    return (
        <Input
            placeholder="Search"
            className="w-1/5"
            onChange={(e) =>
                inputHandler(
                    searchParams,
                    pathname,
                    replace,
                    e.currentTarget.value
                )
            }
        />
    );
};
