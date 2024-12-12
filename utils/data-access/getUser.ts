'server-only';

import { db } from '@/prisma/db';
import { checkAuth } from '../actions/auth/checkAuth';
import { createError } from '../helpers/createError';

export const getUser = async (userId: string) => {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }

    try {
        const response = await db.user.findMany({
            where: {
                id: userId,
            },
            include: {
                _count: {
                    select: {
                        teams: true,
                    },
                },
            },
        });

        return {
            ok: true,
            status: 200,
            data: response,
        };
    } catch (error) {
        return createError(500, 'An unexpected error occured', error);
    }
};
