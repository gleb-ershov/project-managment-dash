import { Share2 } from 'lucide-react';

export const ShareButton = () => {
    return (
        <button className="rounded-xl border-2 flex items-center justify-center border-[#EAEAEA] h-[48px] w-[48px]">
            <Share2 size={26} strokeWidth={1.5} />
        </button>
    );
};
