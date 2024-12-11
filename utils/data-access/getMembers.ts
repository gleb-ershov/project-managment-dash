'server-only';

import { db } from '@/prisma/db';
import { checkAuth } from '../actions/auth/checkAuth';
import { createError } from '../helpers/createError';

export const getMembers = async (searchQuery: string) => {
    if (searchQuery === '') {
        return {
            data: [],
        };
    }

    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }

    try {
        const response = await db.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        surname: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            select: {
                name: true,
                id: true,
                surname: true,
                imageUrl: true,
            },
        });

        return {
            ok: true,
            status: 200,
            data: response,
        };
    } catch (error) {
        return createError(500, 'An unexpected error occured', undefined, true);
    }
};
