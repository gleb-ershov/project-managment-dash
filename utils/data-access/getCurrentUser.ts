'server-only';

import * as jwt from 'jsonwebtoken';

import { cookies } from 'next/headers';
import { createError } from '../helpers/createError';
import { db } from '@/prisma/db';

interface IGetCurrentUserOptionalFields {
    id?: boolean;
    name?: boolean;
    surname?: boolean;
    email?: boolean;
    imageUrl?: boolean;
    plan?: boolean;
}

export const getCurrentUser = async (
    fields?: IGetCurrentUserOptionalFields
) => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value || '';
    const { email } = jwt.verify(token, process.env.JWT_SECRET as string) as {
        email: string;
        password: string;
    };

    const selectOptions = {
        ...fields,
        teams: true,
    };

    try {
        const response = await db.user.findMany({
            where: { email },
            ...(fields && { select: selectOptions }),
        });
        return { ok: true, status: 200, data: response[0] };
    } catch (error) {
        return createError(500, 'An unexpected error occured', error);
    }
};
