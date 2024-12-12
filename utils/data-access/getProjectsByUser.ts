'server-only';

import { db } from '@/prisma/db';
import { createError } from '../helpers/createError';
import { getCurrentUser } from './getCurrentUser';
import { checkAuth } from '../actions/auth/checkAuth';

interface IGetProjectsByUserArgs {
    searchQuery: string;
    filterBy: string;
    sortBy: string;
}

export const getProjectsByUser = async (args: IGetProjectsByUserArgs) => {
    const { searchQuery, filterBy, sortBy } = args;
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }

    const requestOptions = {
        id: true,
        name: false,
        surname: false,
        email: false,
        imageUrl: false,
    };

    const currentUser = await getCurrentUser(requestOptions);
    if (!currentUser.ok) {
        return createError(401, 'Please authorize', undefined, true);
    }

    if ('data' in currentUser) {
        const currentUserId = currentUser.data.id;

        try {
            const response = await db.project.findMany({
                where: {
                    OR: [
                        { userId: currentUserId },
                        {
                            members: {
                                every: {
                                    id: currentUserId,
                                },
                            },
                        },
                    ],
                    title: {
                        contains: searchQuery,
                    },
                    ...(filterBy !== 'all' &&
                        filterBy.length && { status: filterBy }),
                },
                include: {
                    members: {
                        select: {
                            imageUrl: true,
                            name: true,
                            surname: true,
                            id: true,
                        },
                        take: 3,
                    },
                    createdBy: true,
                },
                orderBy: {
                    createdAt: sortBy === 'newest' ? 'desc' : 'asc',
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
    } else {
        return createError(500, 'An unexpected error occured', undefined, true);
    }
};
