import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUrlParams = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, } = useRouter();

    return { searchParams, pathname, replace };
};
