import { ColorThemeContext } from '@/components/providers/ThemeProvider'
import { useContext } from 'react'

export const useColorMode = () => useContext(ColorThemeContext)
