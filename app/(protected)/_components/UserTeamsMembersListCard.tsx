import { User } from '@prisma/client';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const UserTeamsMembersListCard = (props: User) => {
    const { imageUrl, name, surname, email, id } = props;
    return (
        <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        width={40}
                        height={40}
                        className="rounded-lg"
                        alt={`${name}'s profile picture`}
                    />
                ) : (
                    <div className="h-[40px] w-[40px] rounded-lg bg-[#6A4AF3]">
                        {name[0]}
                        {surname[0]}
                    </div>
                )}
                <div className="h-[40px] w-[40px] rounded-lg bg-[#FAFAFA]" />
                <div className="flex w-[calc(100%-50px)] flex-col gap-2">
                    <Link
                        href={`/users/${id}/profile`}
                    >{`${name} ${surname}`}</Link>
                    <span className="">{email}</span>
                </div>
            </div>
            <Mail />
        </div>
    );
};
