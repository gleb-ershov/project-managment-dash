'server-only';

import { db } from '@/prisma/db';
import { checkAuth } from '../actions/auth/checkAuth';
import { createError } from '../helpers/createError';

export const getProjects = async (searchQuery: string) => {
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
        const response = await db.project.findMany({
            where: {
                title: {
                    contains: searchQuery,
                    mode: 'insensitive',
                },
            },
            select: {
                title: true,
                id: true,
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
