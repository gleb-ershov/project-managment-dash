'use client'

import { useColorMode } from '@/hooks/useColorMode'
import { Switch } from '../ui/switch'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { ComponentPropsWithoutRef } from 'react'

export const ToggleColorModeSwitch = ({
    className,
    props,
}: {
    className?: string
    props?: ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
}) => {
    const { currentTheme, setCurrentTheme } = useColorMode()
    return (
        <Switch
            checked={currentTheme === 'dark'}
            className={`data-[state=checked]:bg-textGrayDark data-[state=unchecked]:bg-textGrayRegular ${className}`}
            {...props}
            onClick={() =>
                setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
            }
        />
    )
}
