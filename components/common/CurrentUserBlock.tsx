'use client'

import { LogOut, Mail, Share2 } from 'lucide-react'
import { useCurrentUser } from '../providers/AuthProvider'
import Image from 'next/image'
import { logOutAction } from '@/utils/actions/auth/logOut'

export const CurrentUserBlock = () => {
    const { currentUser } = useCurrentUser()
    return (
        <div className="mx-auto mb-4 mt-4 w-[90%] rounded-lg bg-[#0C0A25] py-3 shadow-sm">
            <div className="mx-auto flex w-[85%] items-center gap-1.5">
                <Image
                    className="rounded-full"
                    width={34}
                    height={34}
                    src={currentUser.imageUrl}
                    alt=""
                />
                <div className="flex flex-col justify-center">
                    <span className="text-[13px] text-white">
                        {currentUser.name}
                    </span>
                    <span className="text-[11px] text-[#9691A9]">
                        {currentUser.email}
                    </span>
                </div>
            </div>
            <div className="mt-4 flex w-[90%] items-center gap-2">
                <button className="ml-4 rounded-lg bg-[#30294F] p-1.5">
                    <Mail size={14} color="white" />
                </button>
                <button className="rounded-lg bg-[#30294F] p-1.5">
                    <Share2 size={14} color="white" />
                </button>
                <button
                    className="ml-auto rounded-lg bg-white p-1.5 duration-300 hover:bg-gray-200 active:scale-95"
                    onClick={() => logOutAction()}
                >
                    <LogOut size={14} color="black" />
                </button>
            </div>
        </div>
    )
}
