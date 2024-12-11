'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createError } from '@/utils/helpers/createError'

export const logOutAction = async () => {
    const cookiesStore = await cookies()
    try {
        cookiesStore.delete('token')
        return {
            ok: true,
            status: 200,
            message: 'Successfully log out',
        }
    } catch {
        return createError(
            500,
            'An error occured while logging out',
            undefined,
            true
        )
    } finally {
        const token = cookiesStore.get('token')
        if (!token?.value.length) {
            redirect('/sign-in')
        }
    }
}
