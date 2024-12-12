'use server';
import { createError } from '@/utils/helpers/createError';
import { checkAuth } from '../auth/checkAuth';
import { db } from '@/prisma/db';

export const changeUserPlanAction = async (plan: string, userId: string) => {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }

    try {
        const response = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                plan,
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
