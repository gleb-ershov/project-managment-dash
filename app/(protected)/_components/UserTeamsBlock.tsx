'use client';

import { SquareArrowOutUpRight } from 'lucide-react';
import { cloneElement, ReactElement, useState } from 'react';

export const UserTeamsBlock = ({
    children,
}: {
    children: ReactElement<any>;
}) => {
    // const [searchQuery, setSearchQuery] = useState<string>('');
    return (
        <section className="mx-auto flex w-[90%] flex-col gap-2 rounded-xl p-4 shadow-md">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-medium">Teams Members</h5>
                    <div className="h-fit w-fit rounded-full bg-[#C2DD4B] p-3">
                        <SquareArrowOutUpRight size={16} />
                    </div>
                </div>
                <span className="text-sm text-[#7C7C7F]">
                    Collaborative Space
                </span>
            </div>
            {children}
        </section>
    );
};
