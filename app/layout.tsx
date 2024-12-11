import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { cookies } from 'next/headers'
import { updateThemeCookies } from '@/utils/helpers/updateThemeCookies'


export const metadata: Metadata = {
    title: 'Project Managment Dashboard',
    description: 'Created by Gleb Ershov',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const cookiesData = (await cookies()).get('color-theme')
    const cookiesTheme = cookiesData?.value || 'light'
    return (
        <html lang="en">
            <ThemeProvider
                cookiesValue={cookiesTheme}
                updateCookies={updateThemeCookies}
            >
                {children}
            </ThemeProvider>
        </html>
    )
}
