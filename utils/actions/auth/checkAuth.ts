'use server'

import { createError } from '@/utils/helpers/createError'
import { cookies } from 'next/headers'

export const checkAuth = async () => {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value || ''
    if (token.length <= 0) {
        return createError(401, 'Not Authorized', undefined, true)
    }

    return {
        ok: true,
        status: 200,
        message: 'Authorized',
    }
}
