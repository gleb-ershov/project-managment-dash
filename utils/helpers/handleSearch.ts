import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const handleSearch = (
    queryName: string = 'search',
    searchParams: ReadonlyURLSearchParams,
    pathname: string,
    replace: (href: string, options?: NavigateOptions) => void,
    term: string
) => {
    const newURLparams = new URLSearchParams(searchParams);
    newURLparams.set(queryName, term);
    replace(`${pathname}?${newURLparams.toString()}`);
};
