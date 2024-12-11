import { Search } from 'lucide-react';

export const SearchButton = () => {
    return (
        <button className="flex h-[48px] w-[48px] items-center justify-center rounded-xl border-2 border-[#EAEAEA]">
            <Search size={26} strokeWidth={1.5} />
        </button>
    );
};
