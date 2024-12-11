'use client'

import { PanelLeft } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'

export const ToggleSidebarButton = () => {
    const { toggleSidebar } = useSidebar()
    return (
        <button onClick={() => toggleSidebar()}>
            <PanelLeft />
        </button>
    )
}
