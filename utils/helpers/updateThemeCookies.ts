'use server'
import { cookies } from 'next/headers'

export async function updateThemeCookies(val: string) {
    const cookiesStore = await cookies()
    cookiesStore.set('color-theme', val)
}
