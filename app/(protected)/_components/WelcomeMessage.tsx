'use client';

import { useCurrentUser } from '@/components/providers/AuthProvider';

export const WelcomeMessageBlock = () => {
    const {
        currentUser: { name },
    } = useCurrentUser();
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extralight text-[#505052]">
                Hello, <span className="font-medium text-black">{name}</span>
            </h1>
            <span className="text-[18px] font-normal text-[#878789] dark:text-[#cacad1]">
                Let&apos;s get things done!
            </span>
        </div>
    );
};
