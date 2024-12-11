'use server';

import { createError } from '@/utils/helpers/createError';
import { checkAuth } from '../auth/checkAuth';
import { db } from '@/prisma/db';
import { redirect } from 'next/navigation';

export const createNewProjectAction = async (
    userId: string,
    membersIds: string[],
    deadlineDate: Date,
    currentState: unknown,
    formState: FormData
) => {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated.ok) {
        return createError(401, 'Not Authorized', undefined, true);
    }
    const connections: { id: string }[] = membersIds.map((item) => {
        return { id: item };
    });

    let result;

    try {
        result = await db.project.create({
            data: {
                title: formState.get('title') as string,
                description: formState.get('description') as string,
                members: {
                    connect: connections,
                },
                deadline: deadlineDate,
                userId,
            },
        });

        return {
            ok: true,
            status: 200,
            data: result,
        };
    } catch (error) {
        return createError(500, 'Internal Error', error, undefined);
    } finally {
        if (result) {
            redirect('/');
        }
    }
};
