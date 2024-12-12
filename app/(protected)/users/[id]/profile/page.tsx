import { getCurrentUser } from '@/utils/data-access/getCurrentUser';
import { getUser } from '@/utils/data-access/getUser';
import Image from 'next/image';

export default async function UserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId = (await params).id;
    const user = await getUser(userId);
    const currentUser = await getCurrentUser({
        id: true,
        name: false,
        surname: false,
        email: false,
        imageUrl: false,
        plan: false,
    });
    console.log(currentUser);

    if ('data' in user) {
        const {
            id,
            imageUrl,
            name,
            surname,
            email,
            description,
            plan,
            _count: { teams },
        } = user.data[0];

        return (
            <main className="flex h-screen w-full flex-col">
                <div className="relative h-[340px] w-full">
                    <Image
                        src="/user-page-background.jpg"
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized={true}
                    />
                    <Image
                        width={240}
                        height={240}
                        alt={`${name} profile picture`}
                        src={imageUrl}
                        priority={true}
                        className="absolute left-[50%] top-[210px] ml-[calc(-120px)] rounded-full"
                    />
                </div>
                <div className="w-full flex-1">
                    <div className="mt-[120px] flex w-full flex-col items-center justify-center">
                        <span className="text-[44px] font-medium">{`${name} ${surname}`}</span>
                        <span className="text-gray-700">{email}</span>
                    </div>
                    <div className="mx-auto mt-4 flex w-[60%] flex-col gap-4 rounded-xl border-[1px] p-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-700">Plan</span>
                            <span className="rounded-lg bg-gray-50 p-2 font-semibold text-gray-700">{`${plan.slice(0, 1).toUpperCase()}${plan.slice(1)}`}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>About:</span>
                            <p className="rounded-lg bg-gray-50 p-2 text-sm text-gray-700">
                                {description ? description : 'Nothing here.'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>Total teams:</span>
                            <p className="rounded-lg bg-gray-50 p-2 text-sm text-gray-700">
                                {teams}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
