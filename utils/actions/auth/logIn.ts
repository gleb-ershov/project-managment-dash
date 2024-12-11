'use server'

import { db } from '@/prisma/db'
import { createError } from '@/utils/helpers/createError'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logInAction = async (
    previousState: unknown,
    postData: FormData
) => {
    const email = postData.get('email') as string
    const password = postData.get('password') as string

    try {
        const response = await db.user.findMany({
            where: { email },
        })

        if (response.length === 0) {
            return createError(401, 'User does not exist', undefined, true)
        }

        const userData = response[0]
        const isPasswordMatch = await bcrypt.compare(
            password,
            userData.password
        )

        if (!isPasswordMatch) {
            return createError(400, 'Passwords do not match', undefined, true)
        }

        const tokenData = {
            email,
            password,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
            expiresIn: '30d',
        })

        const logInResponse = {
            message: 'Successfully logged in',
            ok: true,
            status: 200,
        }

        const cookiesStore = await cookies()
        cookiesStore.set('token', token, { httpOnly: true })
        return logInResponse
    } catch (error) {
        return createError(500, 'Internal Error', error, undefined)
    } finally {
        const cookiesStore = await cookies()
        const token = cookiesStore.get('token')
        if (token) {
            redirect('/')
        }
    }
}
