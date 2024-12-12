'server-only';

import { db } from '@/prisma/db';
import { checkAuth } from '../actions/auth/checkAuth';
import { createError } from '../helpers/createError';
import { getCurrentUser } from './getCurrentUser';

export const getUserRelatedTeamsCount = async () => {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }

    const currentUser = await getCurrentUser({
        id: true,
        name: false,
        surname: false,
        email: false,
        imageUrl: false,
        plan: false,
    });

    if (!currentUser.ok) {
        return createError(401, 'Please authorize', undefined, true);
    }
    if ('data' in currentUser) {
        const currentUserId = currentUser.data.id;
        try {
            const response = await db.team.count({
                where: {
                    users: {
                        some: {
                            id: currentUserId,
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
    } else {
        return createError(500, 'An unexpected error occured', undefined, true);
    }
};
