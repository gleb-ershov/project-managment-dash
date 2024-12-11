'use client'

import { Inter } from 'next/font/google'
import { createContext, PropsWithChildren, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

interface IThemeContextProps {
    currentTheme: string
    setCurrentTheme: (theme: string) => void
}

interface IThemeProviderProps extends PropsWithChildren {
    cookiesValue: string
    updateCookies: (val: string) => void
}

export const ColorThemeContext = createContext<IThemeContextProps>({
    currentTheme: 'light',
} as IThemeContextProps)

const ThemeProvider = (props: IThemeProviderProps) => {
    const { children, cookiesValue, updateCookies } = props
    const [currentTheme, setCurrentTheme] = useState<string>(cookiesValue)

    const toggleColorTheme = (theme: string) => {
        setCurrentTheme(theme)
        updateCookies(theme)
    }

    return (
        <ColorThemeContext.Provider
            value={{ currentTheme, setCurrentTheme: toggleColorTheme }}
        >
            <body className={`${inter.className} ${currentTheme}`}>
                {children}
            </body>
        </ColorThemeContext.Provider>
    )
}

export default ThemeProvider
